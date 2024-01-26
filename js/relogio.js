document.addEventListener("DOMContentLoaded", function () {
    let relogio;

    function iniciarRelogio() {
        const horas = document.getElementById('horas');
        const minutos = document.getElementById('minutos');
        const segundos = document.getElementById('segundos');

        relogio = setInterval(function time() {
            let dateToday = new Date();
            let hr = dateToday.getHours();
            let min = dateToday.getMinutes();
            let s = dateToday.getSeconds();

            if (hr < 10) hr = '0' + hr;

            if (min < 10) min = '0' + min;

            if (s < 10) s = '0' + s;

            horas.textContent = hr;
            minutos.textContent = min;
            segundos.textContent = s;
        }, 1000);
    }

    document.getElementById('iniciar-relogio').addEventListener('click', function () {
        pausarCronometro();
        sendMessageToTimer('pauseCountdown', 0);
        iniciarRelogio();
    });

});