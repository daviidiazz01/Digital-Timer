document.addEventListener("DOMContentLoaded", function () {
    const iniciarCronometroButton = document.getElementById('iniciar-cronometro-remote');
    const pausarCronometroButton = document.getElementById('pausar-cronometro-remote');
    const zerarCronometroButton = document.getElementById('zerar-cronometro-remote');
    const tempoInput = document.getElementById('text-input-information-remote');

    let tempoTotal = 0;
    let cronometro;
    let blinkingInterval;

    function atualizarTempo() {
        const horas = document.getElementById('horas-remote');
        const minutos = document.getElementById('minutos-remote');
        const segundos = document.getElementById('segundos-remote');

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
            document.getElementById('horas-remote').classList.toggle('blink');
            document.getElementById('minutos-remote').classList.toggle('blink');
            document.getElementById('segundos-remote').classList.toggle('blink');
        }, 500);
    }

    function pararBlinking() {
        clearInterval(blinkingInterval);
        document.getElementById('horas-remote').classList.remove('blink');
        document.getElementById('minutos-remote').classList.remove('blink');
        document.getElementById('segundos-remote').classList.remove('blink');
    }

    iniciarCronometroButton.addEventListener('click', function () {
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
                        // Faça algo quando o tempo atingir 0
                    }, 1000);
                }
            }, 1000);
        }
    });

    pausarCronometroButton.addEventListener('click', function () {
        clearInterval(cronometro);
        pararBlinking();
    });

    zerarCronometroButton.addEventListener('click', function () {
        clearInterval(cronometro);
        pararBlinking();
        tempoTotal = 0;
        atualizarTempo();
        tempoInput.value = '';
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "r" || event.key === "R") {
            window.location.href = "/index.html";
        }
    });

    const presetButtons = document.querySelectorAll('.preset-button-remote');

    presetButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            const presetValues = ['10', '25', '45'];
            tempoInput.value = presetValues[index];
        });
    });
});