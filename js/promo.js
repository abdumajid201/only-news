const modalBtns = document.querySelectorAll('.openModalBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalForm = document.getElementById('modalForm');
const phoneInput = document.getElementById('phoneInput');
const nameInput = document.getElementById('nameInput');
const promoTimerItems = document.querySelectorAll('.promo__timer__item');

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

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let numbers = e.target.value.replace(/\D/g, '');

        if (!numbers.startsWith('998')) {
            numbers = '998' + numbers;
        }

        numbers = numbers.slice(0, 12);

        let formatted = '+998';

        if (numbers.length > 3) {
            formatted += ' (' + numbers.slice(3, 5);
        }
        if (numbers.length >= 5) {
            formatted += ') ' + numbers.slice(5, 8);
        }
        if (numbers.length >= 8) {
            formatted += '-' + numbers.slice(8, 10);
        }
        if (numbers.length >= 10) {
            formatted += '-' + numbers.slice(10, 12);
        }

        e.target.value = formatted;
    });
}

if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const phoneNumbers = phoneInput.value.replace(/\D/g, '');

        if (nameInput.value.trim().length < 2) {
            alert('Ismingizni to‘g‘ri kiriting!');
            nameInput.focus();
            return;
        }

        if (phoneNumbers.length !== 12 || !phoneNumbers.startsWith('998')) {
            alert('Telefon raqamni to‘g‘ri kiriting!');
            phoneInput.focus();
            return;
        }

        alert('Ma’lumot qabul qilindi!');
        modalForm.reset();
        hideModal();
    });
}

if (promoTimerItems.length === 2) {
    let minutes = parseInt(promoTimerItems[0].textContent.trim(), 10);
    let seconds = parseInt(promoTimerItems[1].textContent.trim(), 10);

    let totalSeconds = minutes * 60 + seconds;

    const countdown = setInterval(() => {
        if (totalSeconds <= 0) {
            promoTimerItems[0].textContent = '00';
            promoTimerItems[1].textContent = '00';
            clearInterval(countdown);
            return;
        }

        totalSeconds--;

        const currentMinutes = Math.floor(totalSeconds / 60);
        const currentSeconds = totalSeconds % 60;

        promoTimerItems[0].textContent = String(currentMinutes).padStart(2, '0');
        promoTimerItems[1].textContent = String(currentSeconds).padStart(2, '0');
    }, 1000);
}
