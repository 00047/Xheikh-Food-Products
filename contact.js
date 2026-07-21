    
 // -------------------- MOBILE MENU --------------------

const menuBtn = document.querySelector(".menu-btn");
const mobileSidebar = document.querySelector(".mobile-sidebar");
const closeBtn = document.querySelector(".close-btn");
const overlay = document.querySelector(".overlay");
const cartSidebar = document.querySelector(".cart-sidebar");

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        mobileSidebar.classList.add("active");
        overlay.classList.add("active");

    });

}

if(closeBtn){

    closeBtn.addEventListener("click",()=>{

        mobileSidebar.classList.remove("active");
        overlay.classList.remove("active");

    });

}

if (overlay) {
    overlay.addEventListener("click", () => {

        mobileSidebar?.classList.remove("active");
        cartSidebar?.classList.remove("active");
        overlay.classList.remove("active");

    });
}

 let cart = JSON.parse(localStorage.getItem("cart")) || [];

const contactForm = document.querySelector("form");

if(contactForm){

    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const phone = this.querySelector('input[name="phone"]').value;
        const address = document.querySelector('input[name="address"]').value;
        const messageText = this.querySelector('textarea[name="message"]').value;

const ownerNumber = "923240507608";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let message = `🛒 New Order from Sheikh Food Products Website

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
🏠 Address: ${address}

🛍 Cart Items:
`;

let total = 0;

cart.forEach((item, index) => {

    const qty = item.quantity || 1;
    const itemTotal = Number(item.price) * qty;

    message += `${index + 1}. ${item.name} × ${qty} - Rs.${itemTotal}\n`;

    total += itemTotal;

});

let delivery = 300;

if(total >= 5000){

    delivery = 0;

}

const grandTotal = total + delivery;

message += `\n💰 Subtotal: Rs.${total}\n`;

message += `🚚 Delivery: ${delivery === 0 ? "FREE" : "Rs.300"}\n`;

message += `💳 Grand Total: Rs.${grandTotal}\n`;
message += `\n📝 Message: ${messageText}`;

const url = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

window.open(url, "_blank");
    });
}