const id = sessionStorage.id;

//Diario
fetch(`leituras/ultimas/${id}/1` , { cache: 'no-store' }).then(function (response) {
    if(response.ok) {
        response.json().then(function (dados){
            console.log(`Dados recebidos: ${JSON.stringify(dados)}`);
            diario.innerHTML = dados[0].count;

            if(dados[0].count < 250) {
                diario.style.color = '#A6BDE2';
                fluxoDiario.innerHTML = 'Fluxo Abaixo';
            }else if(dados[0].count < 500) {
                diario.style.color = '#3C5DAA';
                fluxoDiario.innerHTML = 'Fluxo Medio';
            }else if(dados[0].count < 750) {
                diario.style.color = '#FFD966';
                fluxoDiario.innerHTML = 'Fluxo Normal';
            }else if(dados[0].count < 1000) {
                diario.style.color = '#EE9012';
                fluxoDiario.innerHTML = 'Fluxo Maximo';
            }else{ 
                diario.style.color = '#A51F1F';
                fluxoDiario.innerHTML = 'Fluxo Superlotação';
            }
        })
    }
})

fetch(`leituras/ultimas/${id}/7` , { cache: 'no-store' }).then(function (response) {
    if(response.ok) {
        response.json().then(function (dados){
            console.log(`Dados recebidos: ${JSON.stringify(dados)}`);
            semanal.innerHTML = dados[0].count;

            if(dados[0].count < (250 * 7)) {
                semanal.style.color = '#A6BDE2';
                fluxoSemanal.innerHTML = 'Fluxo Abaixo';
            }else if(dados[0].count < (500 * 7)) {
                semanal.style.color = '#3C5DAA';
                fluxoSemanal.innerHTML = 'Fluxo Medio';
            }else if(dados[0].count < (750 * 7)) {
                semanal.style.color = '#FFD966';
                fluxoSemanal.innerHTML = 'Fluxo Ideal';
            }else if(dados[0].count < (1000 * 7)) {
                semanal.style.color = '#EE9012';
                fluxoSemanal.innerHTML = 'Fluxo Maximo';
            }else{ 
                semanal.style.color = '#A51F1F';
                fluxoSemanal.innerHTML = 'Fluxo Superlotação';
            }
        })
    }
})

fetch(`leituras/ultimas/${id}/30` , { cache: 'no-store' }).then(function (response) {
    if(response.ok) {
        response.json().then(function (dados){
            console.log(`Dados recebidos: ${JSON.stringify(dados)}`);
            mensal.innerHTML = dados[0].count;

            if(dados[0].count < (250 * 30)) {
                mensal.style.color = '#A6BDE2';
                fluxoMensal.innerHTML = 'Fluxo Abaixo';
            }else if(dados[0].count < (500 * 30)) {
                mensal.style.color = '#3C5DAA';
                fluxoMensal.innerHTML = 'Fluxo Medio';
            }else if(dados[0].count < (750 * 30)) {
                mensal.style.color = '#FFD966';
                fluxoMensal.innerHTML = 'Fluxo Ideal';
            }else if(dados[0].count < (1000 * 30)) {
                mensal.style.color = '#EE9012';
                fluxoMensal.innerHTML = 'Fluxo Maximo';
            }else{ 
                mensal.style.color = '#A51F1F';
                fluxoMensal.innerHTML = 'Fluxo Superlotação';
            }
        })
    }
})