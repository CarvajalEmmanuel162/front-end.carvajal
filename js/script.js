const images = document.querySelectorAll(".carousel-container img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;

function showImage(index) {
    images.forEach(img => img.classList.remove("active"));
    images[index].classList.add("active");
}

function nextImage() {
    current++;

    if (current >= images.length) {
        current = 0;
    }

    showImage(current);
}

function prevImage() {
    current--;

    if (current < 0) {
        current = images.length - 1;
    }

    showImage(current);
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Cambio automático cada 3 segundos
setInterval(nextImage, 3000);