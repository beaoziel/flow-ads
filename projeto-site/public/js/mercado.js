function getMercado() {
    const id = sessionStorage.id;

    fetch(`/usuarios/getMercado/${id}` , { cache: 'no-store' }).then(function (response) {
        if(response.ok) {
            response.json().then(function (dados) {
                console.log(dados);
                nomeMercado.innerHTML = dados[0].nome;
            })
        }
    }).catch(erro => {
        console.error(erro);
        
    })
}