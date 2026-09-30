/* =========================================================
   AGRIGROW
   Main JavaScript
========================================================= */


/* =========================================================
   HEADER
========================================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${entry.target.id}"]`
                    );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    },

    {
        rootMargin: "-35% 0px -55% 0px"
    }

);

sections.forEach(section => {
    observer.observe(section);
});


/* =========================================================
   ORDER MODAL
========================================================= */

const orderModal = document.getElementById("orderModal");

function openOrder() {

    orderModal.classList.add("active");

    document.body.style.overflow = "hidden";

    updateOrderTotal();

}


function closeOrder() {

    orderModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   INQUIRY MODAL
========================================================= */

const inquiryModal = document.getElementById("inquiryModal");

function openInquiry() {

    inquiryModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeInquiry() {

    inquiryModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeOrder();
        closeInquiry();

        chatWindow.classList.remove("active");

    }

});


/* =========================================================
   QUANTITY
========================================================= */

const quantityInput =
    document.getElementById("orderQuantity");

const orderTotal =
    document.getElementById("orderTotal");

const PRICE_PER_BAG = 150;


function changeQuantity(amount) {

    let current =
        parseInt(quantityInput.value) || 1;

    current += amount;

    if (current < 1) {
        current = 1;
    }

    if (current > 100) {
        current = 100;
    }

    quantityInput.value = current;

    updateOrderTotal();

}


function updateOrderTotal() {

    const quantity =
        parseInt(quantityInput.value) || 1;

    const total =
        quantity * PRICE_PER_BAG;

    orderTotal.textContent =
        `₱${total.toLocaleString()}`;

}


/* =========================================================
   ORDER FORM
========================================================= */

const orderForm =
    document.getElementById("orderForm");

orderForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("orderName").value.trim();

    const quantity =
        document.getElementById("orderQuantity").value;

    if (!name) {
        showToast(
            "Please check your details",
            "Enter your name before submitting."
        );

        return;
    }

    closeOrder();

    orderForm.reset();

    quantityInput.value = 1;

    updateOrderTotal();

    showToast(
        "Order request received",
        `Thank you, ${name}. We received your request for ${quantity} bag${quantity > 1 ? "s" : ""}.`
    );

});


/* =========================================================
   INQUIRY FORM
========================================================= */

const inquiryForm =
    document.getElementById("inquiryForm");

inquiryForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("inquiryName").value.trim();

    if (!name) {
        showToast(
            "Please check your details",
            "Enter your name before submitting."
        );

        return;
    }

    closeInquiry();

    inquiryForm.reset();

    showToast(
        "Inquiry sent",
        `Thanks, ${name}. Your message has been received.`
    );

});


/* =========================================================
   TOAST
========================================================= */

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

let toastTimer;


function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 4500);

}


/* =========================================================
   FAQ
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isOpen =
            item.classList.contains("open");


        faqItems.forEach(otherItem => {

            otherItem.classList.remove("open");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });


        if (!isOpen) {

            item.classList.add("open");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* =========================================================
   CHATBOT
========================================================= */

const chatButton =
    document.getElementById("chatButton");

const chatWindow =
    document.getElementById("chatWindow");

const chatMessages =
    document.getElementById("chatMessages");

const chatForm =
    document.getElementById("chatForm");

const chatInput =
    document.getElementById("chatInput");


function toggleChat() {

    chatWindow.classList.toggle("active");

    if (chatWindow.classList.contains("active")) {

        setTimeout(() => {
            chatInput.focus();
        }, 200);

    }

}


function addUserMessage(message) {

    const messageElement =
        document.createElement("div");

    messageElement.className =
        "user-message";

    messageElement.innerHTML = `
        <div>${escapeHTML(message)}</div>
    `;

    chatMessages.appendChild(messageElement);

    scrollChat();

}


function addBotMessage(message) {

    const messageElement =
        document.createElement("div");

    messageElement.className =
        "bot-message";

    messageElement.innerHTML = `
        <span class="message-avatar">A</span>
        <div>${message}</div>
    `;

    chatMessages.appendChild(messageElement);

    scrollChat();

}


function scrollChat() {

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


function getBotResponse(message) {

    const text =
        message.toLowerCase().trim();


    if (
        text.includes("what is agrigrow") ||
        text.includes("what is agri") ||
        text.includes("about")
    ) {

        return `
            AgriGrow is a fertilizer venture that aims to provide
            affordable organic fertilizer made from locally available
            materials for small-scale farmers.
        `;

    }


    if (
        text.includes("price") ||
        text.includes("how much") ||
        text.includes("cost")
    ) {

        return `
            Our current planned price is
            <strong>₱150 per 5kg bag.</strong>
        `;

    }


    if (
        text.includes("order") ||
        text.includes("buy") ||
        text.includes("purchase")
    ) {

        return `
            You can click the <strong>Order AgriGrow</strong>
            button on the website and submit an order request.
            Our team can then confirm availability and delivery details.
        `;

    }


    if (
        text.includes("use") ||
        text.includes("apply")
    ) {

        return `
            Follow the recommended application instructions provided
            with the product. Application may depend on the crop and
            farming conditions.
        `;

    }


    if (
        text.includes("customer") ||
        text.includes("who")
    ) {

        return `
            AgriGrow is primarily designed for
            <strong>low-income and small-scale farmers</strong>
            in rural and agricultural communities.
        `;

    }


    if (
        text.includes("contact") ||
        text.includes("message") ||
        text.includes("inquire")
    ) {

        return `
            You can use the <strong>Contact Us</strong> or
            <strong>Ask AgriGrow</strong> form on the website
            to send an inquiry.
        `;

    }


    return `
        I'm still learning. Please send your question through
        our inquiry form and our team can assist you.
    `;

}


function askBot(question) {

    if (!chatWindow.classList.contains("active")) {
        chatWindow.classList.add("active");
    }

    addUserMessage(question);

    setTimeout(() => {

        addBotMessage(
            getBotResponse(question)
        );

    }, 500);

}


chatForm.addEventListener("submit", event => {

    event.preventDefault();

    const message =
        chatInput.value.trim();

    if (!message) {
        return;
    }

    addUserMessage(message);

    chatInput.value = "";

    setTimeout(() => {

        addBotMessage(
            getBotResponse(message)
        );

    }, 500);

});


/* =========================================================
   SECURITY
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        image.style.display = "none";

        image.parentElement.classList.add("image-fallback");

    });

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

    updateOrderTotal();

});