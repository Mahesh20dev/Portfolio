/**
 * Handles the toggle of the menu icon and navigation bar.
 */
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/**
 * Handles the scrolling behavior and highlighting of navigation links.
 */
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navlinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
    })
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

/**
 * Initializes ScrollReveal for element animations.
 */
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content,.heading', { origin: 'top' });
ScrollReveal().reveal('.home-img,.services-container,.projects-box,.contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1,.about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p,.about-content', { origin: 'right' });

/**
 * Initializes Typed.js for typing effect on the home page.
 */
const typed = new Typed('.multiple-text', {
    strings: [ 'Full-Stack Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
    backDelay: 1000
});

/**
 * Handles the form submission and sends an email using Email.js.
 */
const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name:${fullName.value}<br> Email:${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`;

    Email.send({
        SecureToken: "733450c8-470d-4959-b6d1-d19034b7de3d",
        To: 'myc0382@gmail.com',
        From: "myc0382@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(message => {
        if (message === "OK") {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
            });
            form.reset();
        } else {
            Swal.fire({
                title: "Oops!",
                text: "Something went wrong!",
                icon: "error"
            });
        }
    })
};

/**
 * Validates form inputs and adds error classes if necessary.
 */
function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != "") {
            checkEmail();
        }
        items[1].addEventListener("keyup", () => {
            checkEmail();
        })

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        })
    }
}

/**
 * Validates email input using a regular expression.
 */
function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errortxtemail = document.querySelector(".email")
    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
        if (email.value != "") {
            errortxtemail.innerText = "Enter a valid email Address";
        } else {
            errortxtemail.innerText = "Email Address can't be blank";
        }
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

/**
 * Event listener for form submission.
 * Calls checkInputs and sendEmail functions.
 */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")) {
        checkEmail();
        checkInputs();
        sendEmail();
        form.reset();
    }
});