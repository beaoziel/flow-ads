var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var TipoUsuario = require('../models').TipoUsuario;
let id_guarda = 0;

/* Armazena id do tipo usuário */
router.get('/consulta/:idTipoUsuario', function(req, res, next) {
  const idTipoUsuario = req.params.idTipoUsuario;
  res.send(idTipoUsuario);
  console.log(idTipoUsuario);
  id_guarda = idTipoUsuario;
});

/* Cadastrar tipo usuário */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um tipo de usuário');
	
	TipoUsuario.create({
		descricao : req.body.desc
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Select de todos os tipos de usuário*/
router.get('/consultar', function(req, res, next) {
	console.log('Recuperando tipos de usuários cadastrados');
	
	let instrucaoSql = `select cod_tipo_usuario, descricao from tbTipo_Usuario ORDER BY cod_tipo_usuario DESC`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: TipoUsuario
	}).then(resultado => {
    console.log(`Tipos de usuários: ${resultado.length}`);

		if(resultado.length > 0) {
			res.json(resultado);
		} else if (resultado.length == 0) {
			res.status(403).send('Nenhum adm encontrado');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Recuperar os dados dos tipos de usuários para a edição */
router.get('/edicao', function(req, res, next) {
	console.log('Recuperando tipos de usuários cadastrados');
	
	let instrucaoSql = `select cod_tipo_usuario, descricao from tbTipo_Usuario where cod_tipo_usuario = ${id_guarda}`;
	console.log(instrucaoSql);
  
	sequelize.query(instrucaoSql, {
		model: TipoUsuario
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

	
	let instrucaoSql = `update tbTipo_Usuario SET descricao='${req.body.edita_desc}' where cod_tipo_usuario = ${id_guarda}`;
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
router.get('/deletar/:idTipo', function(req, res, next){
	var idTipo = req.params.idTipo;

	let instrucaoSql = `delete from tbTipo_Usuario where cod_tipo_usuario = ${idTipo}`;

	sequelize.query(instrucaoSql).then(resultado => {
		res.send(resultado);
		console.log(`Tipos de usuários: ${resultado.length}`);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	})
});

module.exports = router;
