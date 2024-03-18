document.addEventListener("DOMContentLoaded", function () {
    const horas = document.getElementById('horas');
    const minutos = document.getElementById('minutos');
    const segundos = document.getElementById('segundos');
    const tempoInput = document.getElementById('text-input-information');

    let tempoTotal = 0;
    let cronometro;
    let blinkingInterval;

    
function iniciarCronometro(tempoDefinido) {
    const minutosDefinidos = parseInt(tempoDefinido);
    if (!isNaN(minutosDefinidos)) {
        clearInterval(cronometro);
        if (minutosDefinidos > 0) {
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
        } else if (minutosDefinidos === 0) {
            tempoTotal = 0;
            atualizarTempo();
        } else if (minutosDefinidos === -1) {
            clearInterval(cronometro);
            pararBlinking();
        }
    }
}

    function atualizarTempo() {
        const hr = Math.floor(tempoTotal / 3600);
        const min = Math.floor((tempoTotal % 3600) / 60);
        const seg = tempoTotal % 60;

        horas.textContent = hr < 10 ? '0' + hr : hr;
        minutos.textContent = min < 10 ? '0' + min : min;
        segundos.textContent = seg < 10 ? '0' + seg : seg;

        if (tempoTotal === 0) {
            iniciarBlinking();
            destacarTempoEsgotado(true);
        } else {
            pararBlinking();
            destacarTempoEsgotado(false);
        }
    }

    function destacarTempoEsgotado(destacar) {
        if (destacar) {
            tempoInput.classList.add('tempo-esgotado');
            piscaPisca();
        } else {
            tempoInput.classList.remove('tempo-esgotado');
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

    function zerarCronometro() {
        clearInterval(cronometro);
        pararBlinking();
        tempoTotal = 0;
        atualizarTempo();
        tempoInput.value = '';
    }

    function pararBlinking() {
        clearInterval(blinkingInterval);
        horas.classList.remove('blink');
        minutos.classList.remove('blink');
        segundos.classList.remove('blink');
    }

    function piscaPisca() {
        let count = 0;
        const maxCount = 5;
        const interval = setInterval(function () {
            tempoInput.style.borderColor = (count % 2 === 0) ? 'red' : '';
            count++;
            if (count > maxCount * 2) {
                clearInterval(interval);
            }
        }, 500);
    }

    function startCountdown(minutes) {
        clearInterval(cronometro);
        tempoTotal = minutes * 60;
        atualizarTempo();

        cronometro = setInterval(function () {
            if (tempoTotal > 0) {
                tempoTotal--;
                atualizarTempo();
            } else {
                clearInterval(cronometro);
                iniciarBlinking();
                alertarTemporizadorEncerrado();
            }
        }, 1000);

    }

    function pausarCronometro() {
        clearInterval(cronometro);
        pararBlinking();
    }

    function reiniciarCronometro() {
        clearInterval(cronometro);
        pararBlinking();
        tempoTotal = 0;
        atualizarTempo();
        tempoInput.value = '';
    }

    document.getElementById('iniciar-cronometro').addEventListener('click', function () {
        const minutosDefinidos = parseInt(tempoInput.value);
        if (!isNaN(minutosDefinidos)) {
            startCountdown(minutosDefinidos);
        }
    });

    document.getElementById('pausar-cronometro').addEventListener('click', function () {
        pausarCronometro();
    });

    document.getElementById('zerar-cronometro').addEventListener('click', function () {
        reiniciarCronometro();
    });

    window.addEventListener('message', function (event) {
        if (event.data.command === 'startCountdown' && !isNaN(event.data.minutes)) {
            startCountdown(event.data.minutes);
        } else if (event.data.command === 'pauseCountdown') {
            pausarCronometro();
        } else if (event.data.command === 'resetCountdown') {
            reiniciarCronometro();
        }
    });

    function alertarTemporizadorEncerrado() {
        window.opener.postMessage({ message: 'tempoEsgotado' }, '*');
    }


});
function openRemoteControl() {

    const remoteControlWindow = window.open('views/remote-control.html', 'Controle Remoto', 'width=300, height=600');

    if (!remoteControlWindow || remoteControlWindow.closed || typeof remoteControlWindow.closed === 'undefined') {
        alert('A janela pop-up foi bloqueada. Por favor, habilite pop-ups para abrir o Controle Remoto.');
    }
}
document.body.style.overflow = "hidden";

document.addEventListener("keydown", function (event) {
    if (event.key === "C" || event.key === "c") {
        window.location.href = "views/remote-control.html";
    }
});




