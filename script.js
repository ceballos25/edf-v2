document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.querySelector('form[action="functions/mercado-pago/process-pay.php"]');

    if (paymentForm) {
        paymentForm.addEventListener('submit', function (event) {
            const requiredFields = [
                'celular',
                'nombre',
                'correo',
                'usp-custom-departamento-de-residencia',
                'usp-custom-municipio-ciudad',
                'select-oportunidades',
                'total-oportunidades',
                'total-pago'
            ];

            let isValid = true;

            for (let id of requiredFields) {
                const field = document.getElementById(id);
                if (!field || !field.value.trim()) {
                    isValid = false;
                    break;
                }
            }

            const politica = document.getElementById('politica');
            if (!politica || !politica.checked) {
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
                Toastify({
                    text: "Por favor, completa el formulario.",
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "#e74c3c",
                    close: true,
                    stopOnFocus: true
                }).showToast();
            }
        });
    } else {
        console.error("El formulario de pago no fue encontrado.");
    }
});
// Bloquear scroll en el body

// const closeModal = document.querySelector('button#closeModal');
// const modalContainer = document.querySelector('.modal-overlay');

// document.body.style.overflow = 'hidden'; // Bloquea scroll (esto sí funciona si está en ejecución)

// closeModal.addEventListener("click", () => {
//     modalContainer.classList.remove('active');
//     document.body.style.overflow = ''; // Restaura scroll
// });


