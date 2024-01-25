document.addEventListener("DOMContentLoaded", function () {
    const tempoInput = document.getElementById('text-input-information');

    function sendMessageToTimer(command, minutes) {
        window.opener.postMessage({ command, minutes }, '*');
    }

    document.getElementById('iniciar-cronometro-remote').addEventListener('click', function () {
        const minutosDefinidos = parseInt(tempoInput.value);
        if (!isNaN(minutosDefinidos)) {
            sendMessageToTimer('startCountdown', minutosDefinidos);
        }

    });

    document.getElementById('pausar-cronometro-remote').addEventListener('click', function () {
        sendMessageToTimer('pauseCountdown', 0);
    });

    document.getElementById('zerar-cronometro-remote').addEventListener('click', function () {
        // Sempre envie 0 ao clicar no botão de zerar
        sendMessageToTimer('resetCountdown', 0);
    });





    document.getElementById('pausar-cronometro-remote').addEventListener('click', function () {
        pausarCronometro();
    });

    document.getElementById('zerar-cronometro-remote').addEventListener('click', function () {
        reiniciarCronometro();
    });

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

    document.getElementById('iniciar-cronometro-remote').addEventListener('click', function () {
        const minutosDefinidos = parseInt(tempoInput.value);
        if (!isNaN(minutosDefinidos)) {
            startCountdown(minutosDefinidos);
        }
    });

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
                alertarTemporizadorEncerrado(); // Adiciona essa linha para alertar
            }
        }, 1000);
    
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

    function destacarTempoEsgotado(destacar) {
        if (destacar) {
            tempoInput.classList.add('tempo-esgotado');
            piscaPisca();
        } else {
            tempoInput.classList.remove('tempo-esgotado');
        }
    }

    function piscaPisca() {
        let count = 0;
        const maxCount = 5;  // Altere o número de piscadas desejado
        const interval = setInterval(function () {
            tempoInput.style.borderColor = (count % 2 === 0) ? 'red' : '';
            count++;
            if (count > maxCount * 2) {
                clearInterval(interval);
            }
        }, 500);
    }
});