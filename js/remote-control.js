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
});
