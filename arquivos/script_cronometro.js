const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const tempoInput = document.getElementById('tempoInput');

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

document.getElementById('iniciar').addEventListener('click', function () {
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

document.getElementById('pausar').addEventListener('click', function () {
    clearInterval(cronometro);
});

document.getElementById('zerar').addEventListener('click', function () {
    clearInterval(cronometro);
    tempoTotal = 0;
    atualizarTempo();
    tempoInput.value = '';
});

document.addEventListener("keydown", function (event) {
    if (event.key === "r" || event.key === "R") {
        window.location.href = "../DigitalWatch.html";
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'f' || event.key === 'F') {
        const element = document.documentElement; // Referência ao elemento raiz (a página inteira)

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
});



