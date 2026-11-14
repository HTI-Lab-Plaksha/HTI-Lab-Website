
/* =========================================================
   HTI LAB — HOMEPAGE GALLERY SLIDESHOW
   Reads images directly from gallery.html.
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    try {
        const response = await fetch("gallery.html");
        if (!response.ok) {
            throw new Error(`Could not load gallery.html (${response.status})`);
        }

        const galleryHTML = await response.text();
        const galleryDocument = new DOMParser().parseFromString(
            galleryHTML,
            "text/html"
        );

        // Use the same images shown in the Gallery page.
        const imageSources = Array.from(
            galleryDocument.querySelectorAll(".gallery-grid .gallery-item img")
        )
            .map((image) => image.getAttribute("src"))
            .filter(Boolean)
            .map((src) => new URL(src, window.location.href).href);

        // Remove duplicate image paths while preserving gallery order.
        const images = [...new Set(imageSources)];

        if (images.length === 0) {
            console.warn("No gallery images were found for the homepage slideshow.");
            return;
        }

        // Two layers allow a smooth cross-fade without changing the hero content.
        const firstLayer = document.createElement("div");
        const secondLayer = document.createElement("div");

        firstLayer.className = "hero-slide";
        secondLayer.className = "hero-slide";

        hero.prepend(secondLayer);
        hero.prepend(firstLayer);

        // Preload images to reduce blank frames during transitions.
        images.forEach((src) => {
            const preload = new Image();
            preload.src = src;
        });

        let currentIndex = 0;
        let showingFirst = true;

        firstLayer.style.backgroundImage = `url("${images[0]}")`;
        firstLayer.classList.add("is-active");

        // Change the background every 5 seconds.
        if (images.length > 1) {
            window.setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;

                const incomingLayer = showingFirst ? secondLayer : firstLayer;
                const outgoingLayer = showingFirst ? firstLayer : secondLayer;

                incomingLayer.style.backgroundImage =
                    `url("${images[currentIndex]}")`;

                incomingLayer.classList.add("is-active");
                outgoingLayer.classList.remove("is-active");

                showingFirst = !showingFirst;
            }, 5000);
        }
    } catch (error) {
        console.error("Homepage slideshow could not be initialized:", error);
    }
});
