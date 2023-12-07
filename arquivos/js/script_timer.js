const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const tempoInput = document.getElementById('text-input-information');

let tempoTotal = 0;
let cronometro;

function atualizarTempo() {
    const hr = Math.floor(tempoTotal / 3600);
    const min = Math.floor((tempoTotal % 3600) / 60);
    const seg = tempoTotal % 60;

    horas.textContent = hr < 10 ? '0' + hr : hr;
    minutos.textContent = min < 10 ? '0' + min : min;
    segundos.textContent = seg < 10 ? '0' + seg : seg;
}

document.getElementById('iniciar-cronometro').addEventListener('click', function () {
    const minutosDefinidos = parseInt(tempoInput.value);
    if (!isNaN(minutosDefinidos)) {
        clearInterval(cronometro); // Limpa o intervalo anterior, se existir
        tempoTotal = minutosDefinidos * 60; // Converter minutos em segundos
        atualizarTempo();
        cronometro = setInterval(function () {
            if (tempoTotal > 0) {
                tempoTotal--;
                atualizarTempo();
            } else {
                clearInterval(cronometro);
            }
        }, 1000);
    }
});

document.getElementById('pausar-cronometro').addEventListener('click', function () {
    clearInterval(cronometro);
});

document.getElementById('zerar-cronometro').addEventListener('click', function () {
    clearInterval(cronometro);
    tempoTotal = 0;
    atualizarTempo();
    tempoInput.value = '';
});

document.addEventListener("keydown", function (event) {
    if (event.key === "r" || event.key === "R") {
        window.location.href = "/arquivos/views/index.html";
    }
});

document.querySelector('.menu-toggle').addEventListener('mouseover', () => {
    const menu = document.querySelector('.menu');
    menu.style.right = '0px';
});

document.querySelector('.menu-toggle').addEventListener('mouseout', () => {
    const menu = document.querySelector('.menu');
    menu.style.right = '-250px';
});

document.querySelector('.menu-none').addEventListener('mouseover', () => {
    const menu = document.querySelector('.menu');
    menu.style.right = '0px';
});

document.querySelector('.menu-none').addEventListener('mouseout', () => {
    const menu = document.querySelector('.menu');
    menu.style.right = '-250px';
});

document.getElementById('preset-1').addEventListener('click', function () {
    tempoInput.value = '10'; //momento de oração antes do louvor
});

document.getElementById('preset-2').addEventListener('click', function () {
    tempoInput.value = '25'; //Momento de louvor
});

document.getElementById('preset-3').addEventListener('click', function () {
    tempoInput.value = '45'; //Momento ministração
});