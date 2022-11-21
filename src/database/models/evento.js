
function eventoData(sequelize, Datatypes){
    // nombre de la tabla, igual al nombre de la tabla en la base de datos
    let a = 'Evento';
  
    // todos las columnas que va a tener esa tabla, debemos indicar el tipo de dato de cada tabla que 
    // debe tener, debemos ver que tipo de de dato de sequalize corresponde con el tipo de dato de lbd, ver la doc de
    // sequalize
    let c = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(30)},
      fecha_creacion: {type: Datatypes.DATE},
      fecha_baja: {type: Datatypes.DATE},
      fecha_evento: {type: Datatypes.DATE},
      imagen: {type: Datatypes.STRING(30)},
      direccion: {type: Datatypes.STRING(30)},
      descripcion:{type: Datatypes.TEXT}, //VER QUE TIPO DE DATO CORRESPONDE A TEXT
      admin_id: { type: Datatypes.INTEGER},
      tipo_evento_id: { type: Datatypes.INTEGER},
      ciudad_id: { type: Datatypes.INTEGER},
    }
    // esto lo dejamos asi por defecto, son congif de sequalize
    let cg = {camelCase: false, timestamps: false}; 
  
    // aca declaro una variable, con el metodo sequalize.define le paso las 3 variables y el resultdo lo guardo
    // en la variable peliculas 
    const evento = sequelize.define(a,c,cg)

    // RELACION TIPO EVENTO
    evento.associate = function (modelos){
      // aca va tabla que conecta
      evento.belongsTo(modelos.tipoEvento, {   
        // alias que yo quiera, le pegue el mismo nombre que la tavle
        as: "Tipo_evento",
        // clave foranea, pero tengo que poner el alias de la tabla contraria, ver en el archivo contrartio
        foreignKey: "tipo_evento_id"
      });

      // RELACION CIUDAD
      evento.belongsTo(modelos.ciudad, {   
        // alias que yo quiera, le pegue el mismo nombre que la tavle
        as: "Ciudad",
        // clave foranea, pero tengo que poner el alias de la tabla contraria, ver en el archivo contrartio
        foreignKey: "ciudad_id"
      });

      // RELACION USUARIO
      evento.belongsTo(modelos.usuario, {   
        // alias que yo quiera, le pegue el mismo nombre que la tavle
        as: "Usuario",
        // clave foranea, pero tengo que poner el alias de la tabla contraria, ver en el archivo contrartio
        foreignKey: "admin_id"
      });

      // RELACION ENTRADA
      evento.hasMany(modelos.entrada, {   
        // alias que yo quiera, le pegue el mismo nombre que la tavle
        as: "Entrada",
        // clave foranea, pero tengo que poner el alias de la tabla contraria, ver en el archivo contrartio
        foreignKey: "evento_id"
      });



    }
  
    // retorno la variable peliculas
    return evento;
  }
  
  // aca exportamos todo
  module.exports = eventoData;