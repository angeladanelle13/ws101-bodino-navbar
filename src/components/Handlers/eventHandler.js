import { useEffect } from 'react';

const EventHandler = () => {
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("header");
            const scrollUp = document.getElementById("scroll-up");
            if (header) {
                header.classList.toggle("sticky", window.scrollY >= 55);
            }
            if (scrollUp) {
                if (window.scrollY >= 560) scrollUp.classList.add("show-scroll");
                else scrollUp.classList.remove("show-scroll");
            }
            updateUnderlinePosition();
        };

        const updateUnderlinePosition = () => {
            const sections = document.querySelectorAll("section");
            let currentSection = null;
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentSection = section;
                }
            });

            if (currentSection) {
                const correspondingLink = document.querySelector(`a[href="#${currentSection.id}"]`);
                const underline = document.querySelector(".underline");

                if (correspondingLink && underline) {
                    underline.style.width = `${correspondingLink.getBoundingClientRect().width}px`;
                    underline.style.transform = `translateX(${correspondingLink.offsetLeft}px)`;
                }
            }
        };

        const themeButton = document.getElementById("theme-button");
        const darkTheme = "dark-theme";
        const iconTheme = "bx-sun";

        const applySavedTheme = () => {
            const selectedTheme = localStorage.getItem("selected-theme");
            const selectedIcon = localStorage.getItem("selected-icon");

            if (selectedTheme) {
                document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
                if (themeButton) {
                    themeButton.classList[selectedIcon === "bx-sun" ? "add" : "remove"](iconTheme);
                }
            } else {
                themeButton.classList.add("bx-moon");
            }
        };

        applySavedTheme();

        if (themeButton) {
            themeButton.addEventListener('click', () => {
                document.body.classList.toggle(darkTheme);
                themeButton.classList.toggle(iconTheme);
                localStorage.setItem('selected-theme', document.body.classList.contains(darkTheme) ? "dark" : "light");
                localStorage.setItem('selected-icon', themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun");
            });
        }

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", updateUnderlinePosition);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateUnderlinePosition);
        };
    }, []);

    return null;
};

export default EventHandler;
