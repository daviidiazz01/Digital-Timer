const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const tempoInput = document.getElementById('text-input-information');

let tempoTotal = 0;
let cronometro;
let blinkingInterval;

function atualizarTempo() {
    const hr = Math.floor(tempoTotal / 3600);
    const min = Math.floor((tempoTotal % 3600) / 60);
    const seg = tempoTotal % 60;

    horas.textContent = hr < 10 ? '0' + hr : hr;
    minutos.textContent = min < 10 ? '0' + min : min;
    segundos.textContent = seg < 10 ? '0' + seg : seg;

    if (tempoTotal === 0) {
        iniciarBlinking();
    } else {
        pararBlinking();
    }
}

function iniciarBlinking() {
    pararBlinking();
    blinkingInterval = setInterval(() => {
        horas.classList.toggle('blink');
        minutos.classList.toggle('blink');
        segundos.classList.toggle('blink');
    }, 500);
}

function pararBlinking() {
    clearInterval(blinkingInterval);
    horas.classList.remove('blink');
    minutos.classList.remove('blink');
    segundos.classList.remove('blink');
}

document.getElementById('iniciar-cronometro').addEventListener('click', function () {
    const minutosDefinidos = parseInt(tempoInput.value);
    if (!isNaN(minutosDefinidos)) {
        clearInterval(cronometro);
        tempoTotal = minutosDefinidos * 60;
        atualizarTempo();
        cronometro = setInterval(function () {
            if (tempoTotal > 0) {
                tempoTotal--;
                atualizarTempo();
            } else {
                clearInterval(cronometro);
                iniciarBlinking();
                cronometro = setInterval(function () {

                }, 1000);
            }
        }, 1000);
    }
});

document.getElementById('pausar-cronometro').addEventListener('click', function () {
    clearInterval(cronometro);
    pararBlinking();
});

document.getElementById('zerar-cronometro').addEventListener('click', function () {
    clearInterval(cronometro);
    pararBlinking();
    tempoTotal = 0;
    atualizarTempo();
    tempoInput.value = '';
});

document.addEventListener("keydown", function (event) {
    if (event.key === "r" || event.key === "R") {
        window.location.href = "index.html";
    }
});

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('mouseenter', () => {
    menu.style.right = '0';
});

menu.addEventListener('mouseleave', () => {
    menu.style.right = '-250px';
});

document.getElementById('preset-1').addEventListener('click', function () {
    tempoInput.value = '10';
});

document.getElementById('preset-2').addEventListener('click', function () {
    tempoInput.value = '25';
});

document.getElementById('preset-3').addEventListener('click', function () {
    tempoInput.value = '45';
});
document.getElementById('Remote-Control').addEventListener('click', function (event) {
    event.preventDefault();
    window.open('/remote-control.html', '_blank');
    window.focus();
});
