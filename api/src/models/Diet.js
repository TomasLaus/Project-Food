const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// [ ] Tipo de dieta con las siguientes propiedades:
// ID
// Nombre

module.exports = (sequelize) => {
    sequelize.define('diet', {

        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      }, {timestamps: false});
};

