// Arquivo de configuração do grafico de fluxo diário dia x dia
let week = new Chart(document.getElementById("grafico3"), {
    type: 'line',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [
            {
                label: 'Fluxo por dia da semana',
                data: [200, 400, 600, 700, 300, 500, 100, 250],
                
                backgroundColor: [
                    'rgb(253, 178, 54, 0)',
                ],
                borderColor:'rgb(253, 178, 54)',
                pointBackgroundColor:'rgb(253, 178, 54)',
                pointHoverRadius: 6,
            }
        ]
    },
    options: {
        
        title: {
            display: true,
            text: 'Fluxo por dia da semana'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        elements: {
            line: {
            	tension: 0.000001
            }
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
                }
            ],
        }
    }
});