// window.onload = obterDadosGrafico2;

var dados2 = {
    labels: ['Semana 1' , 'Semana 2' , 'Semana 3' , 'Semana 4'],
    datasets: [
        {
            labels: 'Numero de cliente',
            data : [],
            backgroundColor: function (dados) {
                var index = dados.dataIndex;
                var value = dados.dataset.data[index];
                return value <= 250 ? '#A6BDE2' :
                       value > 250 && value <= 500 ? '#3C5DAA' : value > 500 && value <= 750 ? '#FFD966' : value > 750 && value <= 1000 ? '#EE9012' : '#A51F1F'
            },
        }
    ]
}

function configurarGrafico2() {
    var configuracoes = {
        title: {
            text: 'Fluxo por semana',
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

function obterDadosGrafico2() {
    const id = sessionStorage.id;

    fetch(`/leituras/semanal/${id}` , { cache: 'no-store' }).then(function (response) {
        if(response.ok){
            response.json().then(function (registro) {
                console.log(`Dados recebidos: ${JSON.stringify(registro)}`);
                dados2.datasets[0].data = [];

                dados2.datasets[0].data.push(registro.semana1);
                dados2.datasets[0].data.push(registro.semana2);
                dados2.datasets[0].data.push(registro.semana3);
                dados2.datasets[0].data.push(registro.semana4);

                plotarGrafico2(dados2);
            })
            
        }else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    })
}

function plotarGrafico2(dados) {
    console.log('iniciando plotagem do gráfico...');

    var ctx = grafico4.getContext('2d');
    window.grafico_linha = Chart.Bar(ctx, {
        data: dados2,
        options: configurarGrafico2()
    });

    // setTimeout(obterDadosGrafico, 5000);
}