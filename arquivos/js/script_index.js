const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

const relogio = setInterval(function time() {
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

})
document.addEventListener("keydown", function (event) {
    if (event.key === "T" || event.key === "t") {
        window.location.href = "/arquivos/views/timer.html";
    }
});
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