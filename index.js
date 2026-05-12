

let currentSlide = 0;
const totalSlides = 2; // Update this if you add more slides
let locked = false;


/* =========================
   GO TO SLIDE
========================= */
function goToSlide(i) {

    const slides = document.querySelectorAll(".slide");

    // ===== OPEN PORTFOLIO =====
    if (i >= totalSlides) {

        document.body.classList.add('page-exit');

        setTimeout(() => {
            window.location.href = 'portfolio.html';
        }, 600);

        return;
    }

    // ===== LIMIT TOP =====
    if (i < 0) return;

    currentSlide = i;

    document.getElementById('slideWrapper').style.transform =
        `translateY(-${i * 100}vh)`;

    // DOTS
    document.querySelectorAll('.dot').forEach((d, idx) => {
        d.classList.toggle('active', idx === i);
    });

    // NAV LINKS
    document.querySelectorAll('.nav-link[data-slide]').forEach(l => {
        l.classList.toggle(
            'active',
            parseInt(l.dataset.slide) === i
        );
    });

    // SKILL BAR
    if (i === 1) {
        document.querySelectorAll('.skill-fill').forEach(el => {
            el.style.width = el.dataset.width || el.style.width;
        });
    }
}


/* =========================
   WHEEL
========================= */
window.addEventListener('wheel', e => {

    if (locked) return;

    locked = true;

    if (e.deltaY > 0) {
        goToSlide(currentSlide + 1);
    } else {
        goToSlide(currentSlide - 1);
    }

    setTimeout(() => {
        locked = false;
    }, 900);

}, { passive: true });


/* =========================
   TOUCH
========================= */
let touchStart = 0;

window.addEventListener('touchstart', e => {
    touchStart = e.touches[0].clientY;
});

window.addEventListener('touchend', e => {

    let diff = touchStart - e.changedTouches[0].clientY;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
        goToSlide(currentSlide + 1);
    } else {
        goToSlide(currentSlide - 1);
    }

});


/* =========================
   KEYBOARD
========================= */
window.addEventListener('keydown', e => {

    if (e.key === 'ArrowDown') {
        goToSlide(currentSlide + 1);
    }

    if (e.key === 'ArrowUp') {
        goToSlide(currentSlide - 1);
    }

});

document.querySelectorAll('.transition-link').forEach(link => {

    link.addEventListener('click', function(e) {

        e.preventDefault();

        document.body.classList.add('page-exit');

        setTimeout(() => {
            window.location.href = this.href;
        }, 600);

    });

});

/* =========================
   MENU
========================= */
function toggleMenu() {
    document.getElementById('navbar').classList.toggle('open');
}


/* =========================
   INIT
========================= */
goToSlide(0);
