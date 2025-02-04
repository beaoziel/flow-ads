'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		id: {
			field: 'id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		fk_tipo_usuario: {
			field: 'fk_tipo_usuario',
			type: DataTypes.STRING,
			allowNull: true
		},
		fk_mercado: {
			field: 'fk_mercado',
			type: DataTypes.STRING,
			allowNull: true
		},
		data_cadastro: {
			field: 'fk_mercado',
			type: DataTypes.STRING,
			allowNull: true
		}

	}, 
	{
		tableName: 'tbusuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};
