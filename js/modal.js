const modalBtns = document.querySelectorAll('.openModalBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

modalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

closeModal.addEventListener('click', hideModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        hideModal();
    }
});
