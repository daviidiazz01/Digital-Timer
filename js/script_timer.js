document.addEventListener("DOMContentLoaded", function () {
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
                cronometro = setInterval(function () {
                }, 1000);
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
});
function openRemoteControl() {
    // Especifique as dimensões desejadas para a nova janela
    const width = 400;
    const height = 300;

    // Calcular as posições para centralizar a janela
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    // Abrir a nova janela com as dimensões e posições especificadas
    window.open('/remote-control.html', '_blank', `width=${width},height=${height},left=${left},top=${top} resizable=no`);
}