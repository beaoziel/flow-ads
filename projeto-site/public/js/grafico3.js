// window.onload = obterDadosGrafico3;

var dados3 = {
    labels: ['Janeiro' , 'Fevereiro' , 'Março' , 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
        {
            labels: 'Número de clientes',
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

function configurarGrafico3() {
    var configuracoes = {
        title: {
            text: 'Fluxo mensal',
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

function obterDadosGrafico3() {
    const id = sessionStorage.id;
    fetch(`/leituras/mensal/${id}` , { cache: 'no-store' }).then(function (response) {
        if(response.ok){
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                dados3.datasets[0].data = [];

                dados3.datasets[0].data.push(novoRegistro.janeiro);
                dados3.datasets[0].data.push(novoRegistro.fevereiro);
                dados3.datasets[0].data.push(novoRegistro.março);
                dados3.datasets[0].data.push(novoRegistro.abril);
                dados3.datasets[0].data.push(novoRegistro.maio);
                dados3.datasets[0].data.push(novoRegistro.junho);
                dados3.datasets[0].data.push(novoRegistro.julho);
                dados3.datasets[0].data.push(novoRegistro.agosto);
                dados3.datasets[0].data.push(novoRegistro.setembro);
                dados3.datasets[0].data.push(novoRegistro.outubro);
                dados3.datasets[0].data.push(novoRegistro.novembro);
                dados3.datasets[0].data.push(novoRegistro.dezembro);

                let max = 0;
                let mes;
                if(novoRegistro.janeiro > max) {
                    max = novoRegistro.janeiro;
                    mes = 'Janeiro';
                }

                if(novoRegistro.fevereiro > max) {
                    max = novoRegistro.fevereiro;
                    mes = 'Fevereiro';
                }

                if(novoRegistro.março > max) {
                    max = novoRegistro.março;
                    mes = 'Março';
                }

                if(novoRegistro.abril > max) {
                    max = novoRegistro.abril;
                    mes = 'Abril';
                }

                if(novoRegistro.maio > max) {
                    max = novoRegistro.maio;
                    mes = 'Maio';
                }

                if(novoRegistro.junho > max) {
                    max = novoRegistro.junho;
                    mes = 'Junho';
                }

                if(novoRegistro.julho > max) {
                    max = novoRegistro.julho;
                    mes = 'Julho';
                }

                if(novoRegistro.agosto > max) {
                    max = novoRegistro.agosto;
                    mes = 'Agosto';
                }

                if(novoRegistro.setembro > max) {
                    max = novoRegistro.setembro;
                    mes = 'Setembro';
                }

                if(novoRegistro.outubro > max) {
                    max = novoRegistro.outubro;
                    mes = 'Outubro';
                }

                if(novoRegistro.novembro > max) {
                    max = novoRegistro.novembro;
                    mes = 'Novembro';
                }

                if(novoRegistro.dezembro > max) {
                    max = novoRegistro.dezembro;
                    mes = 'Dezembro';
                }

                // console.log(max , mes);
                melhorMes.innerHTML = `${mes}: ${max}`;

                plotarGrafico3(dados3);
            })
            
        }else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    })
}

function plotarGrafico3(dados) {
    console.log('iniciando plotagem do gráfico...');

    var ctx = grafico3.getContext('2d');
    window.grafico_linha = Chart.Bar(ctx, {
        data: dados3,
        options: configurarGrafico3()
    });

    // setTimeout(obterDadosGrafico, 5000);
}