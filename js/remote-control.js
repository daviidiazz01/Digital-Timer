
document.getElementById('preset-1-control').addEventListener('click', function () {
    tempoInput.value = '10';
});
document.getElementById('preset-2-control').addEventListener('click', function () {
    tempoInput.value = '25';
});

document.getElementById('preset-3-control').addEventListener('click', function () {
    tempoInput.value = '45';
});
document.getElementById('iniciar-cronometro-control').addEventListener('click', function () {
    const minutosDefinidos = parseInt(tempoInput.value);
    if (!isNaN(minutosDefinidos)) {
        clearInterval(cronometro);
        tempoTotal = minutosDefinidos * 60;
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
});