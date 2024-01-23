document.addEventListener("DOMContentLoaded", function () {
    const startRemoteButton = document.getElementById('iniciar-cronometro');
    const pauseRemoteButton = document.getElementById('pausar-cronometro');
    const resetRemoteButton = document.getElementById('zerar-cronometro');
    const setTimeRemoteButton = document.getElementById('set-time-remote');
    const timeInputRemote = document.getElementById('text-input-information');

    startRemoteButton.addEventListener('click', function () {
        const minutosDefinidos = parseInt(timeInputRemote.value);
        if (!isNaN(minutosDefinidos)) {
            console.log('Iniciar temporizador com ' + minutosDefinidos + ' minutos');
        }
    });

    pauseRemoteButton.addEventListener('click', function () {
        console.log('Pausar temporizador');
    });

    resetRemoteButton.addEventListener('click', function () {
        console.log('Zerar temporizador');
    });

    setTimeRemoteButton.addEventListener('click', function () {
        const minutesSet = parseInt(timeInputRemote.value);
        if (!isNaN(minutesSet)) {
            console.log('Definir tempo remotamente: ' + minutesSet + ' minutos');
        }
    });
});
