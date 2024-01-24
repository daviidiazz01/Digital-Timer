document.addEventListener("DOMContentLoaded", function () {
    const tempoInput = document.getElementById('text-input-information');

    function sendMessageToTimer(minutes) {
        window.opener.postMessage({ command: 'startCountdown', minutes: minutes }, '*');
    }

    document.getElementById('iniciar-cronometro-remote').addEventListener('click', function () {
        const minutosDefinidos = parseInt(tempoInput.value);
        if (!isNaN(minutosDefinidos)) {
            sendMessageToTimer(minutosDefinidos);
        }
    });

    document.getElementById('pausar-cronometro-remote').addEventListener('click', function () {
        sendMessageToTimer(-10);
    });

    document.getElementById('zerar-cronometro-remote').addEventListener('click', function () {
        // Sempre envie 0 ao clicar no botão de zerar
        sendMessageToTimer(0);
    });

    
});
