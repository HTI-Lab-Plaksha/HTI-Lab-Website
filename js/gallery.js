/* =========================================================
   HTI LAB — GALLERY JAVASCRIPT
========================================================= */


const galleryItems =
    Array.from(
        document.querySelectorAll(".gallery-item")
    );

const filterButtons =
    document.querySelectorAll(".gallery-filter");


/* =========================================================
   FILTER
========================================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        const filter =
            button.dataset.filter;


        galleryItems.forEach(item => {

            const category =
                item.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                item.style.display = "block";

                setTimeout(() => {

                    item.style.opacity = "1";

                }, 20);

            } else {

                item.style.opacity = "0";

                setTimeout(() => {

                    item.style.display = "none";

                }, 250);

            }

        });

    });

});


/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const closeButton =
    document.getElementById("lightboxClose");

const nextButton =
    document.getElementById("lightboxNext");

const prevButton =
    document.getElementById("lightboxPrev");


let currentIndex = 0;


/* =========================================================
   GET VISIBLE IMAGES
========================================================= */

function getVisibleItems() {

    return galleryItems.filter(item => {

        return item.style.display !== "none";

    });

}


/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openLightbox(index) {

    const visibleItems =
        getVisibleItems();

    if (!visibleItems.length) {
        return;
    }


    currentIndex = index;


    const item =
        visibleItems[currentIndex];

    const image =
        item.querySelector("img");

    const title =
        item.querySelector("h3");

    const category =
        item.querySelector("span");


    lightboxImage.src =
        image.src;

    lightboxImage.alt =
        image.alt;


    lightboxCaption.innerHTML = `

        <strong>
            ${title ? title.textContent : ""}
        </strong>

        <br>

        <small>
            ${category ? category.textContent : ""}
        </small>

    `;


    lightbox.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   GALLERY IMAGE CLICK
========================================================= */

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const visibleItems =
            getVisibleItems();

        const index =
            visibleItems.indexOf(item);

        openLightbox(index);

    });

});


/* =========================================================
   CLOSE
========================================================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow =
        "";

}


closeButton.addEventListener(
    "click",
    closeLightbox
);


/* =========================================================
   NEXT
========================================================= */

nextButton.addEventListener(
    "click",
    () => {

        const visibleItems =
            getVisibleItems();

        if (!visibleItems.length) {
            return;
        }


        currentIndex =
            (currentIndex + 1)
            % visibleItems.length;


        openLightbox(currentIndex);

    }
);


/* =========================================================
   PREVIOUS
========================================================= */

prevButton.addEventListener(
    "click",
    () => {

        const visibleItems =
            getVisibleItems();

        if (!visibleItems.length) {
            return;
        }


        currentIndex =
            (
                currentIndex -
                1 +
                visibleItems.length
            )
            %
            visibleItems.length;


        openLightbox(currentIndex);

    }
);


/* =========================================================
   CLICK OUTSIDE IMAGE
========================================================= */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            nextButton.click();

        }


        if (event.key === "ArrowLeft") {

            prevButton.click();

        }

    }
);
