const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// [ ] Receta con las siguientes propiedades:
// ID: *
// Nombre *
// Resumen del plato *
// Puntuación
// Nivel de "comida saludable"
// Paso a paso


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    score: {
      type: DataTypes.FLOAT,
    },

    healthyScore: {
      type: DataTypes.FLOAT,
    },

    image: {
      type: DataTypes.STRING,
    },

    steps: {
      type: DataTypes.TEXT,
    },


  }, {timestamps: false});


};
