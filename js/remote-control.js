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

    document.getElementById('pausar-cronometro-remote').addEventListener('click', function () {
        sendMessageToTimer('pauseCountdown', 0);
    });

    document.getElementById('zerar-cronometro-remote').addEventListener('click', function () {
        // Sempre envie 0 ao clicar no botão de zerar
        sendMessageToTimer('resetCountdown', 0);
    });





    document.getElementById('pausar-cronometro-remote').addEventListener('click', function () {
        pausarCronometro();
    });

    document.getElementById('zerar-cronometro-remote').addEventListener('click', function () {
        reiniciarCronometro();
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

document.getElementById('diminuir-minuto-btn').addEventListener('click', diminuirMinuto);
document.getElementById('adicionar-minuto-btn').addEventListener('click', adicionarMinuto);

document.getElementById('button-relogio').addEventListener('click', function () {
    // Lógica para abrir a página do relógio (index.html)
    var relogioWindow = window.open('index.html');

    // Lógica para fechar a página do temporizador (timer.html)
    if (relogioWindow) {
        // Feche a página do temporizador apenas se ela estiver aberta
        var timerWindow = window.open('', '_self', '');  // Obtém uma referência à página atual (timer.html)
        timerWindow.close();  // Fecha a página do temporizador (timer.html)
    } else {
        alert("Não foi possível abrir a janela do relógio.");
    }
});

