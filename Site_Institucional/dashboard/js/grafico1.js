
// Arquivo de configuração do grafico de fluxo por hora 
// API de desenvolvimento CharJS

    var config = {
        type: 'line',
        data: {
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
        },
        options: {
            title: {
                display: true,
                text: 'Fluxo Hora'
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
						drawBorder: false,
						drawOnChartArea: false,
					}
                }]
			},
			elements: {
				
			},
        }
    };
    
   

    function sortear() {
		var limiteMax = 700;

		return (Math.random() * limiteMax).toFixed(0);
	}

	function recuperarDadosIniciais() {

		// esse "registros" será recuperado do backend futuramente
		var registros = [
			{
				momento: '00:03:42',
				leitura: sortear()
			},
			{
				momento: '00:03:52',
				leitura: sortear()
			},
			{
				momento: '00:04:02',
				leitura: sortear()
			},
			{
				momento: '00:04:12',
				leitura: sortear()
			},
			{
				momento: '00:04:22',
				leitura: sortear()
			},
			{
				momento: '00:04:32',
				leitura: sortear()
			},
			{
				momento: '00:04:42',
				leitura: sortear()
			}
		];

		var contador = 0;

		// registros.length é a quantidade de itens em "registros"
		while (contador < registros.length) {

			config.data.labels.push(registros[contador].momento);  // incluir um novo momento
			config.data.datasets[0].data.push(registros[contador].leitura);  // incluir uma nova leitura

			contador++;
		}

	}

	function receberNovasLeituras() {
		setTimeout(() => {
			
			// esses "agora" etc até "momentos" serão desnecessários quando usarmos o backend futuramente
			var agora = new Date();
			var hora = agora.getHours();
			var minuto = agora.getMinutes();
			var segundo = agora.getSeconds();
			var momento = `${hora>9?'':'0'}${hora}:${minuto>9?'':'0'}${minuto}:${segundo>9?'':'0'}${segundo}`;

			// esse "novoRegistro" será recuperado do backend futuramente
			var novoRegistro = {
				momento: momento,
				leitura: sortear()
			};
			
			// tirando e colocando valores no gráfico
			config.data.labels.shift(); // apagar o primeiro
			config.data.labels.push(novoRegistro.momento); // incluir um novo momento
			config.data.datasets[0].data.shift();  // apagar o primeiro
			config.data.datasets[0].data.push(novoRegistro.leitura); // incluir uma nova leitura

			// Atualiza o gráfico
			window.graficoLinha.update();	

			// agendar a chamada da mesma função para daqui a 2 segundos
			receberNovasLeituras();	

		}, 2000); 
	}

	function plotarGrafico() {
		// chamar os 7 últimos registros de leitura
		recuperarDadosIniciais();

		// criação do gráfico na página
		var ctx = document.getElementById('grafico1').getContext('2d');
		window.graficoLinha = new Chart(ctx, config);

		// função que agenda a recuperação da última leitura para daqui a 2 segundos
		receberNovasLeituras();
	}

	// indicando que a função "plotarGrafico" será invocada assim que a página carregar
	window.onload = plotarGrafico;