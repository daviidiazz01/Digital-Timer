document.addEventListener("DOMContentLoaded", function () {
    // Obtenção de referências aos elementos HTML pelo ID
    const horas = document.getElementById('horas');
    const minutos = document.getElementById('minutos');
    const segundos = document.getElementById('segundos');
    const tempoInput = document.getElementById('text-input-information');

    // Variáveis para controlar o tempo e o cronômetro
    let tempoTotal = 0;
    let cronometro;
    let blinkingInterval;

    // Função para atualizar o tempo exibido no temporizador
    function atualizarTempo() {
        const hr = Math.floor(tempoTotal / 3600);
        const min = Math.floor((tempoTotal % 3600) / 60);
        const seg = tempoTotal % 60;

        // Atualização dos elementos de horas, minutos e segundos no DOM
        horas.textContent = hr < 10 ? '0' + hr : hr;
        minutos.textContent = min < 10 ? '0' + min : min;
        segundos.textContent = seg < 10 ? '0' + seg : seg;

        // Verificação e controle do efeito de piscar quando o tempo chega a zero
        if (tempoTotal === 0) {
            iniciarBlinking();
        } else {
            pararBlinking();
        }
    }

    // Função para iniciar o efeito de piscar
    function iniciarBlinking() {
        pararBlinking();
        blinkingInterval = setInterval(() => {
            horas.classList.toggle('blink');
            minutos.classList.toggle('blink');
            segundos.classList.toggle('blink');
        }, 500);
    }

    // Função para parar o efeito de piscar
    function pararBlinking() {
        clearInterval(blinkingInterval);
        horas.classList.remove('blink');
        minutos.classList.remove('blink');
        segundos.classList.remove('blink');
    }

    // Adiciona um ouvinte de evento ao botão de iniciar o cronômetro
    document.getElementById('iniciar-cronometro').addEventListener('click', function () {
        const minutosDefinidos = parseInt(tempoInput.value);
        if (!isNaN(minutosDefinidos)) {
            clearInterval(cronometro);
            tempoTotal = minutosDefinidos * 60;
            atualizarTempo();

            // Configuração do intervalo do cronômetro
            cronometro = setInterval(function () {
                if (tempoTotal > 0) {
                    tempoTotal--;
                    atualizarTempo();
                } else {
                    clearInterval(cronometro);
                    iniciarBlinking();
                    cronometro = setInterval(function () {
                        // Código vazio, precisa ser preenchido conforme a necessidade
                    }, 1000);
                }
            }, 1000);
        }
    });

    // Adiciona um ouvinte de evento ao botão de pausar o cronômetro
    document.getElementById('pausar-cronometro').addEventListener('click', function () {
        clearInterval(cronometro);
        pararBlinking();
    });

    // Adiciona um ouvinte de evento ao botão de zerar o cronômetro
    document.getElementById('zerar-cronometro').addEventListener('click', function () {
        clearInterval(cronometro);
        pararBlinking();
        tempoTotal = 0;
        atualizarTempo();
        tempoInput.value = '';
    });

    // Adiciona um ouvinte de evento para a tecla "R" para redirecionar para index.html
    document.addEventListener("keydown", function (event) {
        if (event.key === "r" || event.key === "R") {
            window.location.href = "index.html";
        }
    });

    // Configuração do menu toggle para mostrar e esconder o menu
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('mouseenter', () => {
        menu.style.right = '0';
    });

    menu.addEventListener('mouseleave', () => {
        menu.style.right = '-250px';
    });

    // Adiciona ouvintes de eventos aos botões de preset para definir valores predefinidos
    document.getElementById('preset-1').addEventListener('click', function () {
        tempoInput.value = '10';
    });

    document.getElementById('preset-2').addEventListener('click', function () {
        tempoInput.value = '25';
    });

    document.getElementById('preset-3').addEventListener('click', function () {
        tempoInput.value = '45';
    });

    // Adiciona um ouvinte de evento ao botão "Controle Remoto" para abrir a página remota
    document.getElementById('Remote-Control').addEventListener('click', function (event) {
        event.preventDefault();
        // Abre a página remota em uma nova janela com configurações específicas
        window.open('/remote-control.html', '_blank', 'width=400,height=300,resizable=no,toolbar=no,menubar=no,scrollbars=no,status=no');
        window.focus();
    });
});
