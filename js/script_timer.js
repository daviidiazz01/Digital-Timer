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

    function pararBlinking() {
        clearInterval(blinkingInterval);
        horas.classList.remove('blink');
        minutos.classList.remove('blink');
        segundos.classList.remove('blink');
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




});
function openRemoteControl() {
    // Abre o controle remoto em uma nova aba
    const remoteControlWindow = window.open('/remote-control.html', 'Controle Remoto', 'width=250,height=190');

    // Verifica se a janela foi bloqueada por pop-up
    if (!remoteControlWindow || remoteControlWindow.closed || typeof remoteControlWindow.closed === 'undefined') {
        alert('A janela pop-up foi bloqueada. Por favor, habilite pop-ups para abrir o Controle Remoto.');
    }
}



