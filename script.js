(() => {
    "use strict";

    // --- LÓGICA DO MENU ---
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {
        const closeMenu = () => {
            mainNav.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        };

        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
                : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            if (
                mainNav.classList.contains("is-open") &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    // --- NOVA LÓGICA DO FORMULÁRIO (EmailJS) ---
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const button = document.getElementById("submit-button");

    if (form && status && button) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            button.disabled = true;
            button.textContent = "Enviando...";
            status.textContent = "";

            emailjs.sendForm(
                "service_o5s92f9",
                "template_nz4jw35",
                form
            )
            .then(function () {
                status.textContent = "Mensagem enviada com sucesso!";
                status.style.color = "green";
                form.reset();
                button.disabled = false;
                button.textContent = "Enviar";
            })
            .catch(function (error) {
                console.error("Erro ao enviar:", error);
                status.textContent =
                    "Não foi possível enviar a mensagem. Tente novamente.";
                status.style.color = "red";
                button.disabled = false;
                button.textContent = "Enviar";
            });
        });
    }

    // --- LÓGICA DO LIGHTBOX (GALERIA) ---
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const closeButton = lightbox?.querySelector(".lightbox-close");

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.hidden = true;
        document.body.style.overflow = "";
        if (lightboxImage) {
            lightboxImage.removeAttribute("src");
            lightboxImage.removeAttribute("alt");
        }
    };

    if (lightbox && lightboxImage) {
        document.querySelectorAll(".gallery-item").forEach((item) => {
            item.addEventListener("click", (event) => {
                event.preventDefault();
                const image = item.querySelector("img");
                if (!image) return;

                lightboxImage.src = image.currentSrc || image.src;
                lightboxImage.alt = image.alt;
                lightbox.hidden = false;
                document.body.style.overflow = "hidden";
                closeButton?.focus();
            });
        });

        closeButton?.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) closeLightbox();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
        });
    }
})();