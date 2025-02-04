
// Arquivo de configuração do grafico de fluxo mensal semana x semana
// API de desenvolvimento CharJS

//Pegar o mes atual
var now = new Date();
var mounth = now.getMonth();

//Passar o mes Para String
var mes = mounth == 0 ? 'Janeiro' : mounth == 1 ? 'Fevereiro' : mounth == 2 ? 'Março' : mounth == 3 ? 'Abril' : mounth == 4 ? 'Maio' : mounth == 5 ? 'Junho' : mounth == 6 ? 'Julho' : mounth == 7 ? 'Agosto' : mounth == 8 ? 'Setembro' : mounth == 9 ? 'Outubro' :  mounth == 10 ? 'Novembro' : 'Dezembro';


var ctx = document.getElementById('grafico2').getContext('2d');
var myChart = new Chart(ctx , {
    type: 'line',
    data: {
        //Primeira Semana
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta' , 'Sexta' , 'Sabado' , 'Domingo'],
        datasets: [{
            label: 'Primeira Semana',
            data: [526, 216, 988, 412, 206, 750, 611],
            backgroundColor: [
                'rgba(255, 99, 132, 0)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointHoverRadius: 5,
            
        },
        {
        //Segunda Semanada
            label: 'Segunda Semana',
            data: [319, 314, 615, 477, 623, 891,490],
            backgroundColor: [
                'rgba(54, 162, 235, 0)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointHoverRadius: 5,
        },
        {
        //Terceira Semana
            label: 'Terceiro Semana',
            data: [763, 690, 301, 494, 160, 245,486],
            backgroundColor: [
                'rgba(255, 206, 86, 0)',
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
            ],
            pointBackgroundColor: 'rgba(255, 206, 86, 1)',
            pointHoverRadius: 5,
            
        },
        {
        //Quarta Semana
            label: 'Quarta Semana',
            data: [658, 454, 369, 790, 535, 360,884],
            backgroundColor: [
                'rgba(75, 192, 192, 0)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
            ],
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointHoverRadius: 5,
        },
        
        ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: `Fluxo ${mes} Semana X Semana`
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true,
            pointBorderWidth: 10
        },
        scales: {
            yAxes: [{
                display: true,
                type: 'logarithmic',
                ticks: {
                    beginAtZero: true
                },
                
            }]
        },
    }
    
    
    
},
)