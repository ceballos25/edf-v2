document.addEventListener('DOMContentLoaded', () => {
    const config = {
        modalId: 'modal',
        closeButtonId: 'closeModal',
        buyButtonClass: 'btn-comprar',
        totalOportunidadesInputId: 'total-oportunidades',
        totalPagarInputId: 'total-pago',
        selectOportunidadesId: 'select-oportunidades',
        pricePerOpportunity: 4000,
        defaultPackageValue: '2',
        opportunityPackages: {
            '2': { cantidad: 2, precio: 8000 },
            '5': { cantidad: 5, precio: 20000 },
            '10': { cantidad: 10, precio: 40000 },
            'otro': { cantidad: 0, precio: 0 }
        }
    };

    const getEl = id => document.getElementById(id);
    const modal = getEl(config.modalId);
    const closeModalBtn = getEl(config.closeButtonId);
    const totalInput = getEl(config.totalOportunidadesInputId);
    const totalPayInput = getEl(config.totalPagarInputId);
    const selectInput = getEl(config.selectOportunidadesId);
    const buyButtons = document.querySelectorAll(`.${config.buyButtonClass}`);

    if (!modal || !closeModalBtn || !totalInput || !totalPayInput || !selectInput) {
        console.error("Faltan elementos del DOM.");
        return;
    }

    const openModal = () => modal.style.display = 'flex';
    const closeModal = () => {
        modal.style.display = 'none';
        setPackage(config.defaultPackageValue);
    };

    const setPackage = value => {
        const pack = config.opportunityPackages[value] || config.opportunityPackages['otro'];
        selectInput.value = value;

        if (value === 'otro') {
            totalInput.removeAttribute('readonly');
            totalInput.value = '';
            totalPayInput.value = '$0';
            totalInput.focus();
        } else {
            totalInput.value = pack.cantidad;
            totalInput.setAttribute('readonly', true);
            totalPayInput.value = `$${pack.precio.toLocaleString('es-CO')}`;
        }
    };

    const updateManualPrice = () => {
        const qty = parseInt(totalInput.value) || 0;
        totalPayInput.value = `$${(qty * config.pricePerOpportunity).toLocaleString('es-CO')}`;
    };

    buyButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            let value = config.defaultPackageValue;
            const card = e.currentTarget.closest('.card-plata, .card-oro, .card-diamante');
            if (card?.classList.contains('card-plata')) value = '2';
            if (card?.classList.contains('card-oro')) value = '5';
            if (card?.classList.contains('card-diamante')) value = '10';
            openModal();
            setPackage(value);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    selectInput.addEventListener('change', () => {
        setPackage(selectInput.value);
    });

    totalInput.addEventListener('input', () => {
        if (selectInput.value === 'otro') updateManualPrice();
    });

    // Inicializar
    setPackage(config.defaultPackageValue);
});
