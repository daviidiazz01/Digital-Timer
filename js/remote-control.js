document.addEventListener("DOMContentLoaded", function () {
    const tempoInput = document.getElementById('text-input-information');
    const horas = document.getElementById('horas');
    const minutos = document.getElementById('minutos');
    const segundos = document.getElementById('segundos');
    let cronometro;
    let blinkingInterval;
    let tempoTotal = 0;

    function sendMessageToTimer(command, minutes) {
        window.opener.postMessage({ command, minutes }, '*');
    }

    document.getElementById('iniciar-cronometro-remote').addEventListener('click', function () {
        const minutosDefinidos = parseInt(tempoInput.value);
        if (!isNaN(minutosDefinidos)) {
            sendMessageToTimer('startCountdown', minutosDefinidos);
        }

    });

    document.getElementById('zerar-cronometro-remote').addEventListener('click', function () {
        reiniciarCronometro();
        sendMessageToTimer('resetCountdown', 0);
    });

    document.getElementById('pausar-cronometro-remote').addEventListener('click', function () {
        pausarCronometro();
        sendMessageToTimer('pauseCountdown', 0);
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
                alertarTemporizadorEncerrado();
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
        const maxCount = 5;
        const interval = setInterval(function () {
            tempoInput.style.borderColor = (count % 2 === 0) ? 'red' : '';
            count++;
            if (count > maxCount * 2) {
                clearInterval(interval);
            }
        }, 500);
    }
});
function adicionarMinuto() {
    let minutosAtual = parseInt(minutos.textContent, 10);
    minutosAtual++;
    minutos.textContent = minutosAtual.toString().padStart(2, '0');
}

function diminuirMinuto() {
    let minutosAtual = parseInt(minutos.textContent, 10);
    if (minutosAtual > 0) {
        minutosAtual--;
        minutos.textContent = minutosAtual.toString().padStart(2, '0');
    }
}
function atualizarTempoInterno() {
    const hr = parseInt(horas.textContent, 10);
    const min = parseInt(minutos.textContent, 10);
    const seg = parseInt(segundos.textContent, 10);

    tempoTotal = hr * 3600 + min * 60 + seg;
}

function toggleMenu() {
    var menu = document.querySelector('.menu');
    menu.classList.toggle('open');
    var menuClosedIcon = document.querySelector('.menu-closed');
    var menuOpenIcon = document.querySelector('.menu-open');
    var menuList = document.querySelector('.menu ul');

    if (menu.classList.contains('open')) {
        menuClosedIcon.style.display = 'none';
        menuOpenIcon.style.display = 'block';
        menuList.style.flexDirection = 'column';
    } else {
        menuClosedIcon.style.display = 'block';
        menuOpenIcon.style.display = 'none';
        menuList.style.flexDirection = 'row';
    }
}

var presets = {
    'Oração': 10,
    'Louvor': 25,
    'Ministração': 50,
    'Avisos': 15,
};

var buttons = document.querySelectorAll('.menu ul li button');

buttons.forEach(function(button) {
    var presetName = button.textContent;
    button.textContent = presetName;
    button.value = presets[presetName];
});

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        var value = this.value;
        document.getElementById('text-input-information').value = value;
    });
});

