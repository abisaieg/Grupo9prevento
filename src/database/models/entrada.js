
function entradaData(sequelize, Datatypes){
    // nombre de la tabla, igual al nombre de la tabla en la base de datos
    let a = 'Entrada';
  
    // todos las columnas que va a tener esa tabla, debemos indicar el tipo de dato de cada tabla que 
    // debe tener, debemos ver que tipo de de dato de sequalize corresponde con el tipo de dato de lbd, ver la doc de
    // sequalize
    let c = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      Evento_id: { type: Datatypes.INTEGER},
      Sector_id: { type: Datatypes.INTEGER},
      precio : { type: Datatypes.FLOAT},
    }
    // esto lo dejamos asi por defecto, son congif de sequalize
    let cg = {camelCase: false, timestamps: false}; 
  
    // aca declaro una variable, con el metodo sequalize.define le paso las 3 variables y el resultdo lo guardo
    // en la variable peliculas 
    const entrada = sequelize.define(a,c,cg)

    // relaciones de la tabla
    entrada.associate = function (modelos){}
  
    // retorno la variable peliculas
    return entrada;
  }
  
  // aca exportamos todo
  module.exports = entradaData;