var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Sensor = require('../models').Sensor;
let id_guarda = 0;

/* Armazena o ID do usuário */
router.get('/consulta/:idSensor', function(req, res, next) {
  const idSensor = req.params.idSensor;
  res.send(idSensor);
  console.log(idSensor);
  id_guarda = idSensor;
});

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
  console.log('Criando um sensor');
  console.log("No cadastro "+id_guarda);
	Sensor.create({
        descricao : req.body.desc,
        eixo_x : req.body.eixo_x,
        eixo_y : req.body.eixo_y,
        raio : req.body.raio,
        fk_mercado: id_guarda
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
  	});
});


/* Recuperar usuário por login e senha */
router.get('/consultar', function(req, res, next) {
	console.log('Recuperando sensores cadastrados');
	
	let instrucaoSql = `select cod_sensor, descricao, nome from tbSensor INNER JOIN tbMercado on tbMercado.cod_mercado = tbSensor.fk_mercado where fk_mercado = ${id_guarda} ORDER BY cod_sensor DESC`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Sensor
	}).then(resultado => {
    console.log(`Sensores: ${resultado.length}`);

		if(resultado.length > 0) {
			res.json(resultado);
		} else if (resultado.length == 0) {
			res.status(403).send('Nenhum mercado encontrado');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Recuperar os dados dos sensores para a edição */
router.get('/edicao', function(req, res, next) {

	let instrucaoSql = `select cod_sensor, descricao, eixo_x, eixo_y, raio from tbSensor where cod_sensor = ${id_guarda}`;
	console.log(instrucaoSql);
  
	sequelize.query(instrucaoSql, {
		model: Sensor
	}).then(resultado => {
	console.log(`Tipos de usuários: ${resultado.length}`);
  
		if(resultado.length > 0) {
			res.json(resultado);
		} else if (resultado.length == 0) {
			res.status(403).send('Nenhum tipo de usuário encontrado');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


//Realizando o update com os dados que vieram do formulário
router.post('/edita', function(req, res, next) {
	console.log('Recuperando tipos de usuários cadastrados');

	
	let instrucaoSql = `update tbSensor SET descricao='${req.body.desc}', eixo_x='${req.body.eixo_x}', eixo_y='${req.body.eixo_y}', raio='${req.body.raio}' 
						where cod_sensor = ${id_guarda}`;
	console.log(instrucaoSql);
  
	sequelize.query(instrucaoSql).then(resultado => {
		res.send(resultado);
		console.log(`Tipos de usuários: ${resultado.length}`);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


//Excluindo registro
router.get('/deletar/:idSensor_d', function(req, res, next){
	var idSensor_d = req.params.idSensor_d;

	let instrucaoSql = `delete from tbSensor where cod_sensor = ${idSensor_d}`;

	sequelize.query(instrucaoSql).then(resultado => {
		res.send(resultado);
		console.log(`Sensores: ${resultado.length}`);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	})
});


module.exports = router;
