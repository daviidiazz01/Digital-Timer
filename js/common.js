let tempoTotal = 0;
let cronometro;
let blinkingInterval;
let tempoInput;

function atualizarTempo() {
    const horas = document.getElementById('horas');
    const minutos = document.getElementById('minutos');
    const segundos = document.getElementById('segundos');

    const hr = Math.floor(tempoTotal / 3600);
    const min = Math.floor((tempoTotal % 3600) / 60);
    const seg = tempoTotal % 60;

    horas.textContent = hr < 10 ? '0' + hr : hr;
    minutos.textContent = min < 10 ? '0' + min : min;
    segundos.textContent = seg < 10 ? '0' + seg : seg;

    if (tempoTotal === 0) {
        iniciarBlinking();
    } else {
        pararBlinking();
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

function iniciarCronometro(tempoDefinido) {
    const minutosDefinidos = parseInt(tempoDefinido);
    if (!isNaN(minutosDefinidos)) {
        clearInterval(cronometro);
        if (minutosDefinidos > 0) {
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
        } else if (minutosDefinidos === 0) {
            tempoTotal = 0;
            atualizarTempo();
        } else if (minutosDefinidos === -1) {
            clearInterval(cronometro);
            pararBlinking();
        }
    }
}

function pausarCronometro() {
    sendMessageToTimer({ action: 'pause' });
}


function zerarCronometro() {
    clearInterval(cronometro);
    pararBlinking();
    tempoTotal = 0;
    atualizarTempo();
    tempoInput.value = '';
}

function exemploFuncaoComum() {
    console.log('Esta é uma função comum a ambas as páginas.');
}

function inicializarComum() {
    tempoInput = document.getElementById('text-input-information');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.style.right = '0';
    });

    menu.addEventListener('mouseleave', () => {
        menu.style.right = '-250px';
    });
    
    // Adicione este bloco para fechar o menu quando passar o mouse fora
    document.addEventListener('mouseover', (event) => {
        const isMenuVisible = menu.style.right === '0';
        const isMouseOutsideMenu = !event.target.closest('.menu') && !event.target.closest('.menu-toggle');

        if (isMenuVisible && isMouseOutsideMenu) {
            menu.style.right = '-250px';
        }
    });
}

document.addEventListener("DOMContentLoaded", inicializarComum);

