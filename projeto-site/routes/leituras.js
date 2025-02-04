var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;

/* Recuperar as últimas N leituras */
router.get('/ultimas/:id', function(req, res, next) {
	const id = req.params.id;
	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;

	console.log(`Recuperando as últimas ${limite_linhas} leituras`);
	
	let instrucaoSql = `select `;

	let momento1 = new Date();

	for (let tempos=0; tempos<10; tempos++) {
		
		let momento2 = new Date(momento1-20000);

		console.log(`m1: ${momento1} - m2: ${momento2}`);
		
		const momento1Sql = `CONVERT(Datetime, '${momento1.toLocaleDateString()} ${momento1.toLocaleTimeString()}', 120)`;
		const momento2Sql = `CONVERT(Datetime, '${momento2.toLocaleDateString()} ${momento2.toLocaleTimeString()}', 120)`;		

		let instrucao = `
			'${momento1.getHours()}:${momento1.getMinutes()}' as horario_t${tempos+1},
			(select count(cod_eventos) from tbEventos_Sensor 
			inner join tbSensor on tbSensor.cod_sensor = tbEventos_Sensor.fk_sensor 
			inner join tbMercado on tbMercado.cod_mercado = tbSensor.fk_mercado
			inner join tbUsuario on tbUsuario.fk_mercado = tbMercado.cod_mercado 
			where cod_usuario = ${id} and
			data_hora_info BETWEEN ${momento2Sql} and ${momento1Sql}) 
			
			as clientes_t${tempos+1} 
		`
		if (tempos+1<10) {
			instrucao+=',';
		}
		instrucaoSql += instrucao

		momento1.setTime(momento1-20000)
	}

	instrucaoSql+=';'


	console.log(`consulta: ${instrucaoSql}`);
	console.log('id:' , id);
	


	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	  })
	  .then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
	  }).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
	  });
});

router.get('/ultimas/:id/:dias' , function (req , res , next) {
	const id = req.params.id;

	const dias = (24*60*60*1000) * req.params.dias;
	const now = new Date();
	now.setTime(now.getTime() - dias);
	const ano = now.getFullYear();
	const mes = now.getMonth() + 1;
	const dia = now.getDate();

	const momento = `${ano}-${mes}-${dia}`;

	const instrucaoSql = `select count(cod_eventos) as count from tbEventos_Sensor 
	inner join tbSensor on tbSensor.cod_sensor = tbEventos_Sensor.fk_sensor 
	inner join tbMercado on tbMercado.cod_mercado = tbSensor.fk_mercado
	inner join tbUsuario on tbUsuario.fk_mercado = tbMercado.cod_mercado 
	where cod_usuario = ${id} and data_hora_info > '${momento}';`;

	sequelize.query(instrucaoSql , {type: sequelize.QueryTypes.SELECT})
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		})

});

router.get('/heatmap/:dias/:id' , function (req , res ,next) {
	const id = req.params.id;

	const dias = (24*60*60*1000) * req.params.dias;
	const now = new Date();
	now.setTime(now.getTime() - dias);
	const ano = now.getFullYear();
	const mes = now.getMonth() + 1;
	const dia = now.getDate();

	const momento = `${ano}-${mes}-${dia}`;
	
	const instrucaoSql = `SELECT COUNT(cod_eventos) AS count , fk_sensor AS sensor , eixo_x as x , eixo_y as y , raio as raio , descricao as identificacao FROM tbEventos_Sensor 
	INNER JOIN tbSensor on tbSensor.cod_sensor = tbEventos_Sensor.fk_sensor 
	INNER JOIN tbMercado on tbMercado.cod_mercado = tbSensor.fk_mercado
	INNER JOIN tbUsuario on tbUsuario.fk_mercado = tbMercado.cod_mercado 
	WHERE cod_usuario = ${id} and data_hora_info >= '${momento}' GROUP BY fk_sensor , eixo_x , eixo_y , raio , descricao ;`;
	
	sequelize.query(instrucaoSql , {type: sequelize.QueryTypes.SELECT})
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		})
});

router.get('/semanal/:id' , function(req , res , next) {
	const id = req.params.id;

	console.log('Recuperando dados Semanais');
	let instrucaoSql = 'select';
	const mes = new Date().getMonth() + 1;
	const ano = new Date().getFullYear();
	console.log(mes , ano);
	
	const momentos = [
		{
			comeco: 1,
			fim: 7,
		},
		{
			comeco: 8,
			fim: 14,
		},
		{
			comeco: 15,
			fim: 21,
		},
		{
			comeco: 22,
			fim: 30,
		},
	]
	for(let i = 0 ; i < momentos.length ; i++) {
		
		const comeco = `${ano}-${mes}-${momentos[i].comeco}`;
		const fim = `${ano}-${mes}-${momentos[i].fim}`;
		console.log(comeco , fim);

		let instrucao = `(select count(cod_eventos) from tbEventos_Sensor 
		inner join tbSensor on tbSensor.cod_sensor = tbEventos_Sensor.fk_sensor 
		inner join tbMercado on tbMercado.cod_mercado = tbSensor.fk_mercado
		inner join tbUsuario on tbUsuario.fk_mercado = tbMercado.cod_mercado 
		where cod_usuario = ${id} and data_hora_info BETWEEN '${comeco}' and '${fim}' ) as semana${i + 1}`;

		if (i + 1 < momentos.length) {
			instrucao+=',';
		}
		instrucaoSql += instrucao;
	}
	instrucaoSql+=';'
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql , {type: sequelize.QueryTypes.SELECT})
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		})
});

router.get('/mensal/:id' , function (req , res , next) {
	const id = req.params.id;

	let instrucaoSql = 'select';
	const ano = new Date().getFullYear();
	const meses = [
		{
			nome: 'janeiro',
			mes: 1
		},
		{
			nome: 'fevereiro',
			mes: 2
		},{
			nome: 'março',
			mes: 3
		},{
			nome: 'abril',
			mes: 4
		},{
			nome: 'maio',
			mes: 5
		},{
			nome: 'junho',
			mes: 6
		},{
			nome: 'julho',
			mes: 7
		},{
			nome: 'agosto',
			mes: 8
		},{
			nome: 'setembro',
			mes: 9
		},{
			nome: 'outubro',
			mes: 10
		},{
			nome: 'novembro',
			mes: 11
		},{
			nome: 'dezembro',
			mes: 12
		},

	];

	for(let i = 0 ; i < meses.length ; i++){
		const comeco = `${ano}-${meses[i].mes}-01`;
		let fim = 0

		if(meses[i].mes == 2){
			 fim = `${ano}-${meses[i].mes}-29`;
		}else{
			 fim = `${ano}-${meses[i].mes}-30`;
		}
		
		


		const momento1Sql = `CONVERT(DATETIME,'${comeco}',120)`;
		const momento2Sql = `CONVERT(DATETIME,'${fim}',120)`;
	

		let instrucao = ` (select count(cod_eventos) from tbEventos_Sensor 
		inner join tbSensor on tbSensor.cod_sensor = tbEventos_Sensor.fk_sensor 
		inner join tbMercado on tbMercado.cod_mercado = tbSensor.fk_mercado
		inner join tbUsuario on tbUsuario.fk_mercado = tbMercado.cod_mercado 
		where cod_usuario = ${id} and data_hora_info BETWEEN  ${momento1Sql} and ${momento2Sql}) as '${meses[i].nome}'`;

		if (i + 1 < meses.length) {
			instrucao+=',';
		}
		instrucaoSql += instrucao;
	}
	instrucaoSql+=';'
	console.log(instrucaoSql , 'SQL QUERY');
	sequelize.query(instrucaoSql , {type: sequelize.QueryTypes.SELECT})
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		})
	
	
});



router.get('/diario/:id' , function (req , res , next) {
	const id = req.params.id;

	console.log(`Gráfico diário`);
	let instrucaoSql = 'select';
	const mes = new Date().getMonth() + 1;
	const ano = new Date().getFullYear();
	let now = new Date();
	const dias = [
		{
			fim_dia:  new Date().setDate(now.getDate() - 7)
		},
		{
			fim_dia: new Date().setDate(now.getDate() - 6)
		},
		{
			fim_dia: new Date().setDate(now.getDate() - 5)
		},
		{
			fim_dia: new Date().setDate(now.getDate() - 4)
		},
		{
			fim_dia: new Date().setDate(now.getDate() - 3)
		},
		{
			fim_dia: new Date().setDate(now.getDate() - 2)
		},
		{
			fim_dia: new Date().setDate(now.getDate() - 1)
		}
	];

	for(let i = 0 ; i < dias.length; i++){
		let aux = new Date(dias[i].fim_dia)
		const comeco = `${ano}-${aux.getMonth() + 1}-${aux.getDate()}`;
		aux.setDate(aux.getDate() + 1)
		const fim = `${ano}-${aux.getMonth() + 1}-${aux.getDate()}`;
	

		let instrucao = ` (select count(cod_eventos) from tbEventos_Sensor inner join tbSensor on tbSensor.cod_sensor = tbEventos_Sensor.fk_sensor inner join tbMercado on tbMercado.cod_mercado = tbSensor.fk_mercado inner join tbUsuario on tbUsuario.fk_mercado = tbMercado.cod_mercado where cod_usuario = ${id} and data_hora_info BETWEEN  CONVERT(DATETIME,'${comeco} 23:59:59',120) AND CONVERT(DATETIME,'${fim} 23:59:59',120)) as 'dias${i + 1}'`;

		if (i + 1 < dias.length) {
			instrucao+=',';
		}
		instrucaoSql += instrucao;
	}
	instrucaoSql+=';'
	console.log(instrucaoSql , 'SQL QUERY');
	sequelize.query(instrucaoSql , {type: sequelize.QueryTypes.SELECT})
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		})
	
	
});


// tempo real (último valor de cada leitura)
router.get('/tempo-real', function (req, res, next) {
	
	console.log(`Recuperando a última leitura`);

	const instrucaoSql = `select top 1 fk_sensor, data_hora_info, FORMAT(data_hora_info,'HH:mm:ss') as momento_grafico  
						from tbEventos_Sensor order by cod_eventos desc`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});


// tempo real (último valor de cada leitura)
router.get('/tempo-real', function (req, res, next) {
	
	console.log(`Recuperando a última leitura`);

	const instrucaoSql = `select top 1 fk_sensor, data_hora_info, FORMAT(data_hora_info,'HH:mm:ss') as momento_grafico  
						from tbEventos_Sensor order by cod_eventos desc`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});




// estatísticas (max, min, média, mediana, quartis etc)
router.get('/estatisticas', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select 
							max(temperatura) as temp_maxima, 
							min(temperatura) as temp_minima, 
							avg(temperatura) as temp_media,
							max(umidade) as umidade_maxima, 
							min(umidade) as umidade_minima, 
							avg(umidade) as umidade_media 
						from leitura`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});


module.exports = router;
