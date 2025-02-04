// Arquivo de configuração do grafico de fluxo mensal mês x mês

// Instânciando "Chart" e passando os paramêtros:
// 1° Params = A identificação(ID) da propriedade canvas
// 2° Params = O definições do gráfico
let month = new Chart(document.getElementById("grafico4"), {
    type: 'bar', //tipos de gráficos: line, pie
    data: {
        labels: ["Jan.", "Fev.", "Mar.", "Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."],
        datasets: [
            {
                label: 'Média',
                data: [1000, 2000, 3000, 7000, 4000, 6000, 5000, 4000, 1000, 3000, 6000, 2000],
                //Setando a cor da barra de acordo com o desempenho do fluxo
                backgroundColor: function (month) {
                    var index = month.dataIndex;
                    var value = month.dataset.data[index];
                    return value >= 5000 ? 'rgb(0, 141, 117)' :
                           value >= 3000 && value <= 4000 ? 'rgb(23 ,143, 200)' : 'rgb(253, 178, 54)'
                },
            },
        ]
    },
    options: {
        title: {
            text: 'Fluxo de 2020',
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
    }
});

