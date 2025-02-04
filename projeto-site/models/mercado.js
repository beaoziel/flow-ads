'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/
module.exports = (sequelize, DataTypes) => {
    let Mercado = sequelize.define('Mercado',{
		cod_mercado: {
			field: 'cod_mercado',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		cnpj: {
			field: 'cnpj',
			type: DataTypes.STRING,
			allowNull: false
		},
		cep: {
			field: 'cep',
			type: DataTypes.STRING,
			allowNull: false
        },
        logradouro: {
			field: 'logradouro',
			type: DataTypes.STRING,
			allowNull: false
        },
        bairro: {
			field: 'bairro',
			type: DataTypes.STRING,
			allowNull: false
        },
        num_estabelecimento: {
			field: 'num_estabelecimento',
			type: DataTypes.STRING,
			allowNull: false
        },
        cidade: {
			field: 'cidade',
			type: DataTypes.STRING,
			allowNull: false
        },
        estado: {
			field: 'estado',
			type: DataTypes.STRING,
			allowNull: false
        },
        nome_representante: {
			field: 'nome_representante',
			type: DataTypes.STRING,
			allowNull: false
        },
        num_telefone: {
			field: 'num_telefone',
			type: DataTypes.STRING,
			allowNull: false
        },
        id_acesso: {
			field: 'id_acesso',
			type: DataTypes.STRING,
			allowNull: true
        },
        data_cadastro: {
			field: 'data_cadastro',
			type: DataTypes.DATE,
			allowNull: true
		},
	}, 
	{
		tableName: 'tbMercado', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Mercado;
};
