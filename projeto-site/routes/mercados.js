var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Mercado = require('../models').Mercado;
const cryptoRandomString = require('crypto-random-string');
let pass;
let id_guarda = 0;



/* Armazena  o id do mercado */
router.get('/consulta/:idMercado', function(req, res, next) {
	const idMercado = req.params.idMercado;
	res.send(idMercado);
	console.log(idMercado);
	id_guarda = idMercado;
  });


// Função que gera id aleatório
pass = cryptoRandomString({length: 10});


/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um mercado');
	
	Mercado.create({
        nome : req.body.nome,
        cnpj : req.body.cnpj,
        cep : req.body.cep,
        logradouro : req.body.logradouro,
        bairro : req.body.bairro,
        num_estabelecimento : req.body.num_estabelecimento,
        cidade : req.body.cidade,
        estado : req.body.estado,
        nome_representante : req.body.nome_representante,
        num_telefone : req.body.num_telefone,
        id_acesso: pass
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


/*  Select do mercado */
router.get('/consultar', function(req, res, next) {
	console.log('Recuperando mercados cadastrados');
	
	let instrucaoSql = `select cod_mercado, nome, cnpj, cep, bairro, logradouro, num_estabelecimento, cidade, estado, 
						nome_representante, num_telefone, id_acesso from tbMercado ORDER BY cod_mercado DESC`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Mercado
	}).then(resultado => {
    console.log(`Mercados: ${resultado.length}`);

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


/*  Recuperando os dados do mercado para edição */
router.get('/edicao', function(req, res, next) {
	console.log('Recuperando tipos de usuários cadastrados');
	
	let instrucaoSql = `select cod_mercado, nome, cnpj, cep, bairro, logradouro, num_estabelecimento, cidade, estado, 
	nome_representante, num_telefone, id_acesso from tbMercado where cod_mercado = ${id_guarda}`;
	console.log(instrucaoSql);
  
	sequelize.query(instrucaoSql, {
		model: Mercado
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
	let instrucaoSql = `update tbMercado SET nome='${req.body.nome}', 
						cnpj='${req.body.cnpj}', cep='${req.body.cep}', 
						bairro='${req.body.bairro}', 
						logradouro='${req.body.logradouro}', num_estabelecimento='${req.body.num_estabelecimento}', 
						cidade='${req.body.cidade}', estado='${req.body.estado}', 
						nome_representante='${req.body.nome_representante}', num_telefone='${req.body.num_telefone}' 
						where cod_mercado = ${id_guarda}`;

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
router.get('/deletar/:idMercado_d', function(req, res, next){
	var idMercado_d = req.params.idMercado_d;

	let instrucaoSql = `delete from tbMercado where cod_mercado = ${idMercado_d}`;

	sequelize.query(instrucaoSql).then(resultado => {
		console.log("TAMANHO: "+resultado.length);
		if(resultado.length == 2 ){
			res.send(resultado);
			console.log(`Mercados: ${resultado.length}`);
		}else{
			res.status(403).send('Erro');
		}
		
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	})
});

module.exports = router;
