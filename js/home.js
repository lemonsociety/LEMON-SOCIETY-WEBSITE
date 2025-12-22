// =============================
// Home Page – Gallery & Blur
// =============================

// List of images + titles for the gallery
const galleryItems = [

    {
        src: "resources/society logo.jpg",
        title: "Lemon Society"
    },

    {
        src: "resources/article.jpg",
        title: "News Report on Lemon Scoiety"
    },

    {
        src: "resources/Variety-1.jpeg.jpg",
        title: "Variety-1"
    },
    {
        src: "resources/Variety-2.jpg",
        title: "Variety-2"
    },
    {
        src: "resources/Variety-3.jpeg.jpg",
        title: "Variety-3"
    },
    {
        src: "resources/Variety-4.jpg",
        title: "Variety-4"
    },
    {
        src: "resources/Variety-5.jpg",
        title: "Variety-5"
    },
    
];

let currentIndex = 0;

function updateGallery() {
    const img = document.getElementById("galleryImage");
    const caption = document.getElementById("imageCaption");
    const imageArea = img ? img.closest(".image-area") : null;

    if (!img || !caption || galleryItems.length === 0) return;

    const item = galleryItems[currentIndex];
    img.src = item.src;
    img.alt = item.title;
    caption.textContent = item.title;

    // Reset blur background; will be recalculated on load
    if (imageArea) {
        imageArea.classList.remove("has-blur-bg");
        imageArea.style.backgroundImage = "";
    }
}

// Go to previous image
function showPrevImage() {
    if (galleryItems.length === 0) return;
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateGallery();
}

// Go to next image
function showNextImage() {
    if (galleryItems.length === 0) return;
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateGallery();
}

// -----------------------------
// Blur Background Helper
// -----------------------------

function applyBlurBackground(area, img) {
    if (!area || !img || !img.naturalWidth || !img.naturalHeight) return;

    const ratio = img.naturalWidth / img.naturalHeight;
    const target = 4 / 3;

    // Only add blurred bg if the image is NOT already ~4:3
    if (Math.abs(ratio - target) > 0.02) {
        area.classList.add("has-blur-bg");
        area.style.backgroundImage = `url('${img.src}')`;
    } else {
        area.classList.remove("has-blur-bg");
        area.style.backgroundImage = "";
    }
}

// -----------------------------
// Setup – Only runs on pages that
// actually have the gallery elements
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const galleryImg = document.getElementById("galleryImage");

    // Setup gallery slider if present
    if (prevBtn && nextBtn && galleryImg) {
        prevBtn.addEventListener("click", showPrevImage);
        nextBtn.addEventListener("click", showNextImage);

        // When gallery image loads, set blurred background if needed
        galleryImg.addEventListener("load", () => {
            const area = galleryImg.closest(".image-area");
            applyBlurBackground(area, galleryImg);
        });

        updateGallery(); // show first image
    }

    // Also support any other .image-area (if you reuse the class later)
    document.querySelectorAll(".image-area").forEach(area => {
        const img = area.querySelector("img");
        if (!img) return;

        if (img.complete) {
            applyBlurBackground(area, img);
        } else {
            img.addEventListener("load", () => applyBlurBackground(area, img));
        }
    });
});
