// Agregar Active a los buton para las anclas

const links = document.querySelectorAll('.container-nav a');
links.forEach(link => {
    link.addEventListener('click', function () {
        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ABRIR MODAL

const buttonComprar = document.querySelectorAll('.btn-comprar');
const closeModal = document.querySelector('button#closeModal');
const modalContainer = document.querySelector('.modal-overlay');
// document.body.style.overflow = 'hidden';
closeModal.addEventListener("click", () => {
    modalContainer.classList.remove('active');
    document.body.style.overflow = '';
});


buttonComprar.forEach(button => {
    button.addEventListener('click', () => {
        modalContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.container-nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});