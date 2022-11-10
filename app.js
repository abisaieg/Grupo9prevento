// arrancar el proyecto
// 1-npm install
// 2-npm install multer (MULTER)
// 3 instalar npm install bcryptjs(HASHING, encriptar claves)
// 4 npm install express-validator (express validator)
// ARRANCAR CON npm start

// preguntar el jueves a los profes
// 1 la validacion funciona, si es correcta entra pero si no es correcta se queda pensando, ver como puedo
// enviar un mensaje de contraseña incorrecta al login, tengo que usar un while que englobe todo?

// 2 ver como elimianr el router de users ya que arme todo la funcionalidad de usuarios en el main router y main
// controller, ver de quitar el userRouter y userController sin que pinche las vistas de usuarios

// 3 ver como hacer para que la vista de perfil de usuario quede mostrando el perfil ingresado correctamente



const express = require("express")
const path = require("path")
const app = express()
const methodOverride = require('method-override')

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));

//Pongo publica la carpeta public
app.use(express.static(path.join(__dirname, "/public")))

//Trabajar con POST
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Trabajar con PUT y DELETE
app.use(methodOverride('_method'))

//Poner en servidor localhost:3000
app.listen(process.env.PORT || 3000,function(){
    console.log("Servidor subido a la escaloneta")
})

//RUTAS
const productRouter = require('./src/routes/productRouter'); // Rutas /products
const mainRouter = require('./src/routes/mainRouter')
const userRouter = require('./src/routes/userRouter')
const cartRouter = require('./src/routes/cartRouter');

app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter)
app.use('/user',userRouter)

app.use((req,res,next)=>{
    res.status(404).render('notfound')
})


module.exports = app;
