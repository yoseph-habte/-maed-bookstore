const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const modal = document.getElementById("successModal");
const closeModalBtn = document.getElementById("closeModalBtn");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    // reset errors
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name";
        valid = false;
    }

    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === "") {
        emailError.textContent = "Please enter your email";
        valid = false;
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = "That email doesn't look right";
        valid = false;
    }

    if (messageInput.value.trim() === "") {
        messageError.textContent = "Please write a message";
        valid = false;
    }

    if (valid) {
        modal.classList.add("show");
        form.reset();
    }
});

closeModalBtn.addEventListener("click", function () {
    modal.classList.remove("show");
});

// also close modal if user clicks outside the box
modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});