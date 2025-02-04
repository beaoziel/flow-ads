let login_usuario;
let nome_usuario;

function redirecionar_login() {
    window.location.href = 'login.html';
}

function verificar_autenticacao() {
    login_usuario = sessionStorage.login_usuario_meuapp;
    nome_usuario = sessionStorage.nome_usuario_meuapp;

    if (login_usuario == undefined) {
        redirecionar_login();
    } else {
        b_usuario.innerHTML = '<span style="font-weight: 700; font-size: 18px; color: #2b2b2b9f;">Olá,</span> '+nome_usuario;
        validar_sessao();
    }

}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${login_usuario}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Sessão :) ', texto);
                });
            } else {
                console.error('Sessão :.( ');
                logoff();
            }
        });
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, { cache: 'no-store' });
}


function aguardar() {
    img_aguarde.style.display = 'block';
    div_erro.innerHTML = '';
    btn.disabled = true;
    btn.style.background = "#d1d1d1";
}

function finalizar_aguardar() {
    img_aguarde.style.display = 'none';
    div_erro.style.display = 'block';
    btn.disabled = false;
}

function aguardar_login() {
    img_aguarde_login.style.display = 'block';
    div_erro.innerHTML = '';
    btn.disabled = true;
    btn.style.background = "#d1d1d1";
}


//Abre o perfil do usuário ADM
function consultar_usuario_edita() {
    cod_usuario = sessionStorage.cod_usuario_meuapp;
    fetch(`/usuarios/consulta/${cod_usuario}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                window.location.href = "edicao_adm.html"
            } else {
                alert("Algo deu errado ;(");
            }
        });
}

//Abre o perfil do usuário CLIENTE
function consultar_cliente_edita() {
    cod_usuario = sessionStorage.cod_usuario_meuapp;
    fetch(`/usuarios/consulta/${cod_usuario}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                window.location.href = "edicao_cliente.html"
            } else {
                alert("Algo deu errado ;(");
            }
        });
}

//Habilita os inputs do formulário
function habilita_edicao(){
    email2.disabled = false;
    senha2.disabled = false;
    confirma_senha2.disabled = false;
}