// Accordion FAQ
const accordionBtns = document.querySelectorAll(".accordion-btn");

accordionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        const isOpen = btn.classList.contains("active");

        // close all others first
        accordionBtns.forEach(otherBtn => {
            otherBtn.classList.remove("active");
            otherBtn.nextElementSibling.style.maxHeight = null;
        });

        // open the clicked one if it wasn't already open
        if (!isOpen) {
            btn.classList.add("active");
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// Scroll to top button
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});