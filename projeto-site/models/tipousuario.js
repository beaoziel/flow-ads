'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let TipoUsuario = sequelize.define('TipoUsuario',{
		cod_tipo_usuario: {
			field: 'cod_tipo_usuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		descricao: {
			field: 'descricao',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'tbTipo_Usuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return TipoUsuario;
};
