let dia = 0;
dia = new Date().getDate();
var now = new Date();
var dias = [];
for (let i = 0; i < 7; i++) {
    let aux = new Date();
    aux.setDate(now.getDate() - i);
    dias.push(aux.getDate());
}

console.log(dias , 'DIASSS');

var dados4 = {
    labels: [`Dia ${dias[6]}` , `Dia ${dias[5]}` ,`Dia ${dias[4]}` ,`Dia ${dias[3]}`,`Dia ${dias[2]}`, `Dia ${dias[1]}`, `Dia ${dias[0]}`],
        datasets: [{
            data: [],
            backgroundColor: [
                '#1ea88c8f',
            ],
            borderColor: [
                '#1EA88C',
                
                
                
            ],
            borderWidth: 2,
            pointBackgroundColor: '#1EA88C',
            pointBorderWidth: 5,
            
        }]
};


function configurargrafico5() {
    var configuracoes = {
        title: {
            text: 'Fluxo por dia da semana',
            display: true,
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
						display: false,
						
					},
                }
            ]
        },
    };

    return configuracoes;
}

function obterDadosgrafico5() {

    const id = sessionStorage.id;

    fetch(`/leituras/diario/${id}` , { cache: 'no-store' }).then(function (response) {
        if(response.ok){
            response.json().then(function (registro) {
                console.log(`Dados recebidos: ${JSON.stringify(registro)}`);
                dados4.datasets[0].data = [];

                dados4.datasets[0].data.push(registro.dias1);
                dados4.datasets[0].data.push(registro.dias2);
                dados4.datasets[0].data.push(registro.dias3);
                dados4.datasets[0].data.push(registro.dias4);
                dados4.datasets[0].data.push(registro.dias5);
                dados4.datasets[0].data.push(registro.dias6);
                dados4.datasets[0].data.push(registro.dias7);

                plotargrafico5(dados4);
            })
            
        }else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    })
}

function plotargrafico5(dados) {
    console.log('iniciando plotagem do gráfico...');

    var ctx = grafico2.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dados4,
        options: configurargrafico5()
    });

    // setTimeout(obterDadosGrafico, 5000);
}