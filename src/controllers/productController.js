const path = require('path');
const fs = require('fs');

const pathProductDb = path.join(__dirname, '../data/eventos.json');
const eventos = JSON.parse(fs.readFileSync(pathProductDb, 'utf-8'));


const controller = {
	vistaListadoProd: (req, res) => {
		const eventos = JSON.parse(fs.readFileSync(pathProductDb, 'utf-8'));
		res.render('products/home',{evento: eventos})
	},
	vistaCrearProd: (req, res) => {
		res.render('products/crear')
	},
	// aca le pasamos un evento a la vista descripcion producto
	vistaDetalleProd: (req, res) => {
		let idURL = req.params.id;
		let productoEncontrado;

		for (let p of eventos){
			if (p.id==idURL){
				productoEncontrado=p;
				break;
			}
		}

		res.render('products/descripcionproducto',{productoDetalle: productoEncontrado});
	},
	vistaEditarProd: (req, res) => {
		let id = req.params.id;
		let productoEncontrado;

		for (let s of eventos){
			if (id==s.id){
				productoEncontrado=s;
			}
		}

		res.render('products/editar',{ProductoaEditar: productoEncontrado});
	},

	// accion guardar objeto nuevo en array
	accionGuardar: (req, res) => {
		idNuevo=0;

		for (let s of eventos){
			if (idNuevo<s.id){
				idNuevo=s.id;
			}
		}

		idNuevo++;

		// aca lo que hace el req.file.filename es traerme el nombre de la imagen
		// y guardarl oen una variable, cuando guardamos el producto es el nombre que guarda
		let nombreImagen = req.file.filename;

		let productoNuevo =  {
			id: idNuevo,
			nombre: req.body.name ,
			precio: req.body.price,
			fecha: req.body.date, 
			categoria: req.body.category,
			descipcion: req.body.description,
			// aca guarda la variable asignada arriba
			imagen: nombreImagen
		};

		eventos.push(productoNuevo);

		fs.writeFileSync(pathProductDb, JSON.stringify(eventos,null,' '));

		res.redirect('/');
	},


	accionEditar: (req, res) => {
		
		console.log(req.file);

		let id = req.params.id;

		let nombreImagen = req.file.filename;

		for (let s of eventos){
			if (id==s.id){
				s.nombre= req.body.name;
				s.precio= req.body.price;
				s.fecha= req.body.date;
				s.categoria= req.body.category;
				s.descripcion= req.body.description;
				s.imagen = nombreImagen;
				break;
			}
		}

		fs.writeFileSync(pathProductDb, JSON.stringify(eventos,null,' '));

		res.redirect('/');
	},

	accionEliminar: (req, res) => {

		let id = req.params.id;
		let ProductoEncontrado;

		let Nproducts = eventos.filter(function(e){
			return id!=e.id;
		})

		for (let producto of eventos){
			if (producto.id == id){
			    ProductoEncontrado=producto;
			}
		}

		// en el metodo delte usamos una nueva linea para borrar que es la siguiente
		// fs.unlinkSync(path.join(__dirname, '../../public/images/products/', ProductoEncontrado.image));
		// aca le pasamos la direccion de la imagen que deseamos borrar
		// borra el archivo
		fs.unlinkSync(path.join(__dirname, '../../public/images/uploads/', ProductoEncontrado.imagen));

		fs.writeFileSync(pathProductDb, JSON.stringify(Nproducts,null,' '));

		res.redirect('/');
	},
}
module.exports = controller;