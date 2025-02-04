window.onload = function () {
    obterDadosGrafico();
    obterDadosGrafico2();
    obterDadosGrafico3();
    obterDadosgrafico5();
}
// window.onload = obterDadosGrafico2;
verificar_autenticacao();

// neste JSON tem que ser 'labels', 'datasets' etc, 
// porque é o padrão do Chart.js
var dados = {
    labels: [],
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


// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGrafico() {

    fetch('/leituras/tempo-real', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                
                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro.horario_t1);
                dados.labels.push(novoRegistro.horario_t2);
                dados.labels.push(novoRegistro.horario_t3);
                dados.labels.push(novoRegistro.horario_t4);
                dados.labels.push(novoRegistro.horario_t5);
                dados.labels.push(novoRegistro.horario_t6);
                dados.labels.push(novoRegistro.horario_t7);
                dados.labels.push(novoRegistro.horario_t8);
                dados.labels.push(novoRegistro.horario_t9);
                dados.labels.push(novoRegistro.horario_t10); // incluir um novo momento
                dados.datasets[0].data.shift();  // apagar o primeiro de temperatura
                
                dados.datasets[0].data.push(novoRegistro.clientes_t1); // incluir uma nova leitura de temperatura
                dados.datasets[0].data.push(novoRegistro.clientes_t2);
                dados.datasets[0].data.push(novoRegistro.clientes_t3);
                dados.datasets[0].data.push(novoRegistro.clientes_t4);
                dados.datasets[0].data.push(novoRegistro.clientes_t5);
                dados.datasets[0].data.push(novoRegistro.clientes_t6);
                dados.datasets[0].data.push(novoRegistro.clientes_t7);
                dados.datasets[0].data.push(novoRegistro.clientes_t8);
                dados.datasets[0].data.push(novoRegistro.clientes_t9);
                dados.datasets[0].data.push(novoRegistro.clientes_t10);
                window.grafico_linha.update();
                
                setTimeout(atualizarGrafico, 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            setTimeout(atualizarGrafico, 5000);
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
    
}

// altere aqui as configurações do gráfico
// (tamanhos, cores, textos, etc)
function configurarGrafico() {
    var configuracoes = {
        type: 'line',
        title: {
                display: true,
                text: 'Fluxo por hora',
                
            },
            
            legend: {
                display: false
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: false,
                        drawBorder: true,
                        drawOnChartArea: true,
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: true,
                        drawOnChartArea: true,
                    }
                }],
            },
    };

    return configuracoes;
}

// altere aqui como os dados serão exibidos
// e como são recuperados do BackEnd
function obterDadosGrafico() {

    const id = sessionStorage.id;

    fetch(`/leituras/ultimas/${id}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (registro) {

                console.log(`Dados recebidos: ${JSON.stringify(registro)}`);
                dados.datasets[0].data = [];
                dados.labels = [];

                // resposta.reverse();

               dados.labels.push(registro[0].horario_t10);
                dados.labels.push(registro[0].horario_t9);
                dados.labels.push(registro[0].horario_t8);
                dados.labels.push(registro[0].horario_t7);
                dados.labels.push(registro[0].horario_t6);
                dados.labels.push(registro[0].horario_t5);
                dados.labels.push(registro[0].horario_t4);
                dados.labels.push(registro[0].horario_t3);
                dados.labels.push(registro[0].horario_t2);
                dados.labels.push(registro[0].horario_t1);
                
                dados.datasets[0].data.push(registro[0].clientes_t10);
                dados.datasets[0].data.push(registro[0].clientes_t9);
                dados.datasets[0].data.push(registro[0].clientes_t8);
                dados.datasets[0].data.push(registro[0].clientes_t7);
                dados.datasets[0].data.push(registro[0].clientes_t6);
                dados.datasets[0].data.push(registro[0].clientes_t5);
                dados.datasets[0].data.push(registro[0].clientes_t4);
                dados.datasets[0].data.push(registro[0].clientes_t3);
                dados.datasets[0].data.push(registro[0].clientes_t2);
                dados.datasets[0].data.push(registro[0].clientes_t1);

                // console.log(JSON.stringify(dados));

                div_aguarde.style.display = 'none';

                plotarGrafico(dados);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

// só altere aqui se souber o que está fazendo!
function plotarGrafico(dados) {
    console.log('iniciando plotagem do gráfico...');

    var ctx = canvas_grafico.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dados,
        options: configurarGrafico()
    });

    setTimeout(obterDadosGrafico, 5000);
}