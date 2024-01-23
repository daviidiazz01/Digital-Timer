// Obtendo referências aos elementos HTML
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

// Configurando um intervalo para atualizar o relógio a cada segundo
const relogio = setInterval(function time() {
    // Obtendo a data e hora atual
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let s = dateToday.getSeconds();

    // Adicionando zeros à esquerda se os valores forem menores que 10
    if (hr < 10) hr = '0' + hr;
    if (min < 10) min = '0' + min;
    if (s < 10) s = '0' + s;

    // Atualizando os elementos HTML com a hora, minutos e segundos
    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = s;
})

// Adicionando um ouvinte de evento para redirecionar para a página "timer.html" quando a tecla "T" é pressionada
document.addEventListener("keydown", function (event) {
    if (event.key === "T" || event.key === "t") {
        window.location.href = "timer.html";
    }
});

// Adicionando ouvintes de eventos para mostrar e esconder o menu hamburguer ao passar o mouse 
document.querySelector('.menu-toggle').addEventListener('mouseover', () => {
    const menu = document.querySelector('.menu');
    menu.style.right = '0px';
});

document.querySelector('.menu-toggle').addEventListener('mouseout', () => {
    const menu = document.querySelector('.menu');
    menu.style.right = '-250px';
});

document.querySelector('.menu-none').addEventListener('mouseover', () => {
    const menu = document.querySelector('.menu');
    menu.style.right = '0px';
});

document.querySelector('.menu-none').addEventListener('mouseout', () => {
    const menu = document.querySelector('.menu');
    menu.style.right = '-250px';
});
