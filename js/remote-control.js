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
});