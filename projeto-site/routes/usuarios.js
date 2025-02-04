var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;
var Mercado = require('../models').Mercado;
let id_guarda = 0;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	
	
	let instrucaoSql = `select * from tbUsuario where email='${login}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.email);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

router.get('/getMercado/:id' , function (req , res , next) {
	const id = req.params.id;

	const instrucaoSql = `SELECT nome from tbMercado 
	INNER JOIN tbUsuario on tbUsuario.fk_mercado = tbMercado.cod_mercado
	WHERE cod_usuario = ${id};`

	sequelize.query(instrucaoSql , {
		model: Usuario
	}).then(resultado => {
		console.log('Encotrados' , resultado.length);
		console.log(resultado);
		res.send(resultado)
		
	}).catch(erro => {
		console.error(erro);
	})
})

/* Verificação de usuário */
router.get('/sessao/:login', function(req, res, next) {
	let login = req.params.login;
	console.log(`Verificando se o usuário ${login} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == login) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
	
});


/* Logoff de usuário */
router.get('/sair/:login', function(req, res, next) {
	let login = req.params.login;
	console.log(`Finalizando a sessão do usuário ${login}`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


/* Cadastrar cliente*/
router.post('/cadastrar', function(req, res, next) {
	var id_acesso = req.body.token;
	let instrucaoSql = `select cod_mercado from tbMercado where id_acesso = '${id_acesso}'`;
	sequelize.query(instrucaoSql, {
		model: Mercado
	}).then(resultado => {
			if (resultado.length == 1) {
				let id_mercado = resultado[0].cod_mercado;
				Usuario.create({
					email : req.body.email,
					senha : req.body.senha,
					fk_tipo_usuario : 2,
					fk_mercado : id_mercado,
				}).then(resultado => {
					console.log(`Registro criado: ${resultado}`)
					res.send(resultado);
				}).catch(erro => {
					console.error(erro);
					res.status(500).send(erro.message);
				});
		}else{
			res.status(403).send('Mercado não encontrado');
		} 
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
	
});

/* Cadastrar usuário Adm*/
router.post('/cadastrar_adm', function(req, res, next) {
	console.log('Criando um usuário');
	
	Usuario.create({
		email : req.body.email,
		senha: req.body.senha,
		fk_tipo_usuario: 1
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


/* Recuperar usuário clientes(fk_tipo_usuario = 1) */
router.get('/consultar', function(req, res, next) {
	console.log('Recuperando administradores cadastrados');
	
	let instrucaoSql = `select cod_usuario, email from tbUsuario where fk_tipo_usuario = 1 ORDER BY cod_usuario DESC`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
    console.log(`Adm's: ${resultado.length}`);

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


/* Armazena id do usuário */
router.get('/consulta/:idUsuario', function(req, res, next) {
	const idUsuario = req.params.idUsuario;
	res.send(idUsuario);
	console.log(idUsuario);
	id_guarda = idUsuario;
  });
  

/* Recuperar os dados do usuário para a edição */
router.get('/edicao', function(req, res, next) {
	console.log('Recuperando usuários cadastrados');
	
	let instrucaoSql = `select cod_usuario, email, senha from tbUsuario where cod_usuario = ${id_guarda}`;
	console.log(instrucaoSql);
  
	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
	console.log(`Usuários: ${resultado.length}`);
  
		if(resultado.length > 0) {
			res.json(resultado);
		} else if (resultado.length == 0) {
			res.status(403).send('Nenhum usuário encontrado');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


//Realizando o update com os dados que vieram do formulário
router.post('/edita', function(req, res, next) {
	console.log('Recuperando usuários cadastrados');

	let instrucaoSql = `update tbUsuario SET email='${req.body.email}', senha='${req.body.senha}' where cod_usuario = ${id_guarda}`;
	console.log(instrucaoSql);
  
	sequelize.query(instrucaoSql).then(resultado => {
		res.send(resultado);
		console.log(`Usuários: ${resultado.length}`);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

// Excluindo usuário
router.get('/deletar/:idUsuario_d', function(req, res, next){
	var idUsuario_d = req.params.idUsuario_d;

	let instrucaoSql = `delete from tbUsuario where cod_usuario = ${idUsuario_d}`;

	sequelize.query(instrucaoSql).then(resultado => {
		if(resultado.length == 2){
			res.send(resultado);
			console.log(`Usuários: ${resultado.length}`);
		}else{
			res.status(403).send('Erro');
		}
	
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	})
});


module.exports = router;
