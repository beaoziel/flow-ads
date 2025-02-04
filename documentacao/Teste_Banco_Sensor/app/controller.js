const express = require('express');
const { ArduinoDataTemp } = require('./newserial')
const { ArduinoDataHumidity } = require('./serialHumidity')
const { ArduinoDataSwitch } = require('./serialSwitch')
const { ArduinoDataLuminosity} = require('./serialLuminosidity')
const db = require('./database')
const router = express.Router();

var sort_setor = 0;
var sort_sensor = 0;

var vetor_setor = 0;
var vetor_sensor = 0;

var randomizando_setor  = 0;
var randomizando_vetor = 0;


router.get('/', (request, response, next) => {

    let sum = ArduinoDataTemp.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataTemp.List.length).toFixed(2);
	let sumHour = ArduinoDataTemp.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataTemp.ListHour.length).toFixed(2);
    
    response.json({
        data: ArduinoDataTemp.List,
        total: ArduinoDataTemp.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataTemp.ListHour,
		totalHour: ArduinoDataTemp.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.get('/humidity', (request, response, next) => {

    let sum = ArduinoDataHumidity.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataHumidity.List.length).toFixed(2);
	let sumHour = ArduinoDataHumidity.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataHumidity.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataHumidity.List,
        total: ArduinoDataHumidity.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataHumidity.ListHour,
		totalHour: ArduinoDataHumidity.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

// ================================================================================================================
// Fazendo o select na tabela 'tbSetor' para recuperar os códigos dos setores
// - O código do mercado pode ser alterado
db.query("select cod_setor from tbSetor where cod_mercado = 3", function(err,result,fields) {
    if (err) throw err;
    for (var i in result) {
        //console.log(result[i].cod_setor);
    };
    
    vetor_setor = result;
});
// ================================================================================================================

router.get('/switch', (request, response, next) => {

    let sum = ArduinoDataSwitch.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataSwitch.List.length).toFixed(2);
	let sumHour = ArduinoDataSwitch.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataSwitch.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataSwitch.List,
        total: ArduinoDataSwitch.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataSwitch.ListHour,
		totalHour: ArduinoDataSwitch.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });
        //=============================================================================================================
        // Randomizando o índice do vetor que armazena os códigos dos setores
        sort_setor = parseInt(Math.random()*(vetor_setor.length-0)+0);

        
         // Variável que recebe o dado na posição em que o índice estiver
         randomizando_setor  = vetor_setor[sort_setor].cod_setor;
        console.log("============================");
        console.log("Setor:  "+randomizando_setor);
    
        // Criando um novo select, dessa vez para recuperamos o código de um sensor que pertence a tal setor
        db.query(`select (cod_sensor) as cod_sensor from tbSensor where cod_setor = ${randomizando_setor}`, function(err, result,fields) {
            if (err) throw err;
            for (var i in result) {
                //console.log("Sensores "+result[i].cod_sensor);
            };
            vetor_sensor = result;
        });
        //=============================================================================================================
});

router.get('/luminosity', (request, response, next) => {

    let sum = ArduinoDataLuminosity.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataLuminosity.List.length).toFixed(2);
	let sumHour = ArduinoDataLuminosity.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataLuminosity.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataLuminosity.List,
        total: ArduinoDataLuminosity.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataLuminosity.ListHour,
		totalHour: ArduinoDataLuminosity.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.post('/sendData', (request, response) => {
    //=============================================================================================================
    passagem = ArduinoDataSwitch.List[ArduinoDataSwitch.List.length -1];

    //Randomizando o intervalo do min ao máx do sensor
    sort_sensor = parseInt(Math.random()*(vetor_sensor.length-0)+0);

     //Variável que recebe o dado na posição em que o índice(sort_sensor) estiver
    randomizando_vetor  = vetor_sensor[sort_sensor].cod_sensor;
    
    console.log("Sensor:  "+randomizando_vetor);
    //=============================================================================================================

    //Se o evento do sensor for igual a 1, então o insert será realizado
    if(passagem ==  1){
        var sql = `insert into tbEventos_Sensor (info_sensor, cod_sensor) values (?, ?)`;

        db.query(sql,[passagem,randomizando_vetor], function(err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    }
      
    response.sendStatus(200);
});

module.exports = router;