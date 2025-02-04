var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;


/* Select de todos os dados cadastrados no banco*/
router.get('/consultar', function(req, res, next) {
	console.log('Recuperando dados gerais');
	
	let instrucaoSql = `select(select count(cod_mercado) from tbMercado) as 'mercados' , (select count(cod_usuario) from tbUsuario where fk_tipo_usuario = 1) as 'adms',
    (select count(cod_usuario) from tbUsuario where fk_tipo_usuario = 2) as 'clientes', (select count(cod_sensor) from tbSensor) as 'sensores'`;

	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {type: sequelize.QueryTypes.SELECT}).then(resultado => {

		if(resultado.length >= 0) {
			console.log(`Dados: ${resultado.length}`);
			res.json(resultado);
		} else{
			res.status(403).send('Ocorreu algum erro');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;