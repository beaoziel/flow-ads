'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Sensor = sequelize.define('Sensor',{
		cod_sensor: {
			field: 'cod_sensor',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		descricao: {
			field: 'descricao',
			type: DataTypes.STRING,
			allowNull: false
        },
        	
        eixo_x: {
			field: 'eixo_x',
			type: DataTypes.STRING,
			allowNull: false
        },
        eixo_y: {
			field: 'eixo_y',
			type: DataTypes.STRING,
			allowNull: false
        },
        raio: {
			field: 'raio',
			type: DataTypes.STRING,
			allowNull: false
        },
        fk_mercado: {
			field: 'fk_mercado',
			type: DataTypes.STRING,
			allowNull: true
		}
	}, 
	{
		tableName: 'tbSensor', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Sensor;
};
