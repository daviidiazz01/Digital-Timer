document.addEventListener("DOMContentLoaded", function () {
    // Obtenção de referências aos elementos HTML pelo ID
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

        // Verificação e controle do efeito de piscar quando o tempo chegar a zero
        if (tempoTotal === 0) {
            iniciarBlinking();
        } else {
            pararBlinking();
        }
    }

    // Função para iniciar o efeito de piscar, e abaixo a função para parar de piscar
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

    // Função compartilhada para iniciar a contagem regressiva
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
                    // Lógica adicional após a contagem regressiva chegar a zero
                }, 1000);
            }
        }, 1000);
    }

    document.getElementById('iniciar-cronometro').addEventListener('click', function () {
        const minutosDefinidos = parseInt(tempoInput.value);
        if (!isNaN(minutosDefinidos)) {
            // Chama a função compartilhada para iniciar a contagem regressiva
            startCountdown(minutosDefinidos);
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
});
