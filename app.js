let limiteInferior;
let limiteSuperior;
let numeroAleatorio;
let tentativas;

let numerosSorteados = [];

let botaoChutar = buscarComponenteDeTela(`button.container__botao`);
let h1 = buscarComponenteDeTela(`h1`);
let paragrafo = buscarComponenteDeTela(`p`);
let campoTexto = buscarComponenteDeTela(`input`);
let botaoReiniciar = buscarComponenteDeTela(`#reiniciar`);
let paginaInteira = buscarComponenteDeTela(`html`);

prepararNovoJogo();

paginaInteira.addEventListener('keypress', (e) => {
    var code = e.keyCode || e.which;
    if (code === 13) {
        e.preventDefault();
        botaoReiniciar.focus();
    }
})

function prepararNovoJogo() {
    limiteInferior = 1;
    limiteSuperior = 10;
    trocarTextoDeCampo(h1, `Jogo do número secreto`);
    trocarTextoDeCampo(paragrafo, `Escolha um número entre ${limiteInferior} e ${limiteSuperior}`);
    numeroAleatorio = gerarNumeroAleatorio();
    tentativas = 0;
    campoTexto.disabled = false;
    botaoChutar.disabled = false;
    botaoReiniciar.disabled = true;
    trocarTextoDeCampo(campoTexto, ``);
    campoTexto.focus();
}

botaoReiniciar.onclick = () => {
    prepararNovoJogo();
}

campoTexto.onkeydown = (e) => {
    if(e.key === 'Enter') {
        botaoChutar.onclick();
    }
}

botaoChutar.onclick = () => {
    tentativas += 1;

    let numeroEscolhido = parseInt(campoTexto.value);
    if (isNaN(numeroEscolhido))
        alert(`Escolha um número`);
    else if (numeroEscolhido < limiteInferior || numeroEscolhido > limiteSuperior) {
        alert(paragrafo.innerHTML);
    }
    else if (numeroEscolhido == numeroAleatorio) {
        trocarTextoDeCampo(h1, `Acertou!`);
        trocarTextoDeCampo(paragrafo, `Você descobriu em ${tentativas} tentativa${tentativas > 1 ? `s`: ``}!`);
        campoTexto.disabled = true;
        botaoChutar.disabled = true;
        botaoReiniciar.disabled = false;
        return;
    }
    else if (numeroEscolhido > numeroAleatorio) {
        limiteSuperior = numeroEscolhido;
        trocarTextoDeCampo(paragrafo, `Escolha um número entre ${limiteInferior} e ${limiteSuperior}`)
    }
    else {
        limiteInferior = numeroEscolhido;
        trocarTextoDeCampo(paragrafo, `Escolha um número entre ${limiteInferior} e ${limiteSuperior}`)
    }
    trocarTextoDeCampo(campoTexto, ``);
}

function buscarComponenteDeTela(seletor) {
    return document.querySelector(seletor);
}

function trocarTextoDeCampo(componenteHtml, texto) {
    if (componenteHtml instanceof HTMLInputElement && componenteHtml.type == `number`) {
        componenteHtml.value = texto;
    }
    else {
        componenteHtml.innerHTML = texto;
    }
}

function gerarNumeroAleatorio() {
    if (numerosSorteados.length == limiteSuperior - limiteInferior + 1) {
        alert(`reiniciando lista de números`);
        numerosSorteados = []
    }

    var numeroAleatorio = Math.floor(Math.random() * limiteSuperior + limiteInferior);
    if (numerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    }
    numerosSorteados.push(numeroAleatorio);

    return numeroAleatorio;
}