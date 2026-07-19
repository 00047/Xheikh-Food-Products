// -------------------- Elements --------------------

const buyBtns = document.querySelectorAll(".buy-btn");
const cartCount = document.querySelector(".cart-count");

const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");
const overlay = document.querySelector(".overlay");

const cartItemsContainer = document.querySelector(".cart-items");

const cartTotal = document.getElementById("cart-total");
const cartSubtotal = document.getElementById("cart-subtotal");
const deliveryCharge = document.getElementById("delivery-charge");

const cards = document.querySelectorAll(".card");

// -------------------- MOBILE MENU --------------------

const menuBtn = document.querySelector(".menu-btn");
const mobileSidebar = document.querySelector(".mobile-sidebar");
const closeBtn = document.querySelector(".close-btn");

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

overlay.addEventListener("click",()=>{

    mobileSidebar.classList.remove("active");
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");

});

// -------------------- Cart Data --------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// -------------------- CART UPDATE --------------------

function updateCart(){

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    cartCount.textContent = totalItems;

    const headerCount = document.querySelector(".cart-count-header");

    if(headerCount){
        headerCount.textContent = totalItems;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

}
// -------------------- RENDER CART --------------------

function renderCart(){

    cartItemsContainer.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItemsContainer.innerHTML =
        `<p class="empty-cart">Your cart is empty.</p>`;

        cartSubtotal.textContent = 0;
        deliveryCharge.textContent = "Rs.300";
        cartTotal.textContent = 300;

        return;
    }

    cart.forEach((item,index)=>{

        const itemTotal = Number(item.price) * Number(item.quantity);

        total += itemTotal;

        cartItemsContainer.innerHTML += `

        <div class="cart-item">

            <div class="cart-item-top">

                <div>

                    <h4>${item.name}</h4>

                    <p>Rs.${item.price}</p>

                </div>

                <i class="fas fa-trash delete-item"
                onclick="removeItem(${index})"></i>

            </div>

            <div class="qty-box">

                <button onclick="changeQuantity(${index},-1)">−</button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${index},1)">+</button>

            </div>

            <h4 style="margin-top:12px;color:#ff6600;">
                Item Total: Rs.${itemTotal}
            </h4>

        </div>

        `;

    });

    cartSubtotal.textContent = total;

    let delivery = 300;

    if(total >= 5000){

        delivery = 0;
        deliveryCharge.textContent = "FREE";

    }else{

        deliveryCharge.textContent = "Rs.300";

    }

    cartTotal.textContent = total + delivery;

}

// -------------------- REMOVE ITEM --------------------

function removeItem(index){
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    renderCart();
}


function changeQuantity(index, change){

    cart[index].quantity += change;

    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

    renderCart();

}



const clearCartBtn = document.querySelector(".clear-cart-btn");

if(clearCartBtn){

    clearCartBtn.addEventListener("click",()=>{

        if(confirm("Are you sure you want to clear the cart?")){

            cart = [];

            localStorage.setItem("cart",JSON.stringify(cart));

            updateCart();

            renderCart();

            showToast("Cart cleared");

        }

    });

}


// -------------------- TOAST --------------------

function showToast(message){

    let toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(()=> toast.classList.add("show"), 100);

    setTimeout(()=>{
        toast.remove();
    }, 2500);
}

// -------------------- ADD TO CART --------------------

buyBtns.forEach(btn => {

    btn.addEventListener("click", (e) => {

        e.preventDefault();

        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        console.log(btn.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCart();
        renderCart();

        showToast(name + " added to cart");

    });

});

// -------------------- CART OPEN / CLOSE --------------------

cartIcon.addEventListener("click", ()=>{
    cartSidebar.classList.add("active");
    overlay.classList.add("active");
    renderCart();
});

closeCart.addEventListener("click", ()=>{
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
});

overlay.addEventListener("click", ()=>{
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
});

// -------------------- INITIAL --------------------

updateCart();
renderCart();

// -------------------- CARD ANIMATION --------------------

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, { threshold: 0.2 });

cards.forEach(card=>{

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.8s ease";

    observer.observe(card);

});

// -------------------- NAVBAR SHADOW --------------------

window.addEventListener("scroll", ()=>{

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
    } else {
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";
    }

});


const checkoutBtn = document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", () => {
    window.location.href = "contact.html";
});

// ================= Reviews Animation =================

const reviewCards = document.querySelectorAll(".review-card");

const reviewObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.2
});

reviewCards.forEach((card,index)=>{

    card.style.opacity="0";
    card.style.transform="translateY(50px)";
    card.style.transition=`0.8s ease ${index*0.2}s`;

    reviewObserver.observe(card);

});

// ================= CUSTOMER REVIEWS =================

const reviewName = document.getElementById("review-name");
const reviewRating = document.getElementById("review-rating");
const reviewText = document.getElementById("review-text");
const submitReview = document.getElementById("submit-review");
const reviewsList = document.getElementById("reviews-list");
const averageRating = document.getElementById("average-rating");
const reviewCount = document.getElementById("review-count");

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function renderReviews(){

    if(!reviewsList) return;

    reviewsList.innerHTML = "";

   reviews.slice().reverse().slice(0,6).forEach(review=>{

        reviewsList.innerHTML += `

        <div class="user-review">

            <h3>${review.name}</h3>

            <div class="stars">
                ${"⭐".repeat(review.rating)}
            </div>

            <p>${review.text}</p>

            <small style="color:#888;">
                ${review.date}
            </small>

        </div>

        `;

    });

    // ⭐ Average Rating

    if(reviews.length > 0){

        let totalStars = 0;

        reviews.forEach(review=>{

            totalStars += review.rating;

        });

        averageRating.textContent =
        (totalStars / reviews.length).toFixed(1);

        reviewCount.textContent = reviews.length;

    }else{

        averageRating.textContent = "5.0";
        reviewCount.textContent = "0";

    }

}

if(submitReview){

    submitReview.addEventListener("click",()=>{

        if(reviewName.value.trim()==="" || reviewText.value.trim()===""){

            alert("Please fill all fields.");
            return;

        }

        reviews.push({

            name:reviewName.value,
            rating:Number(reviewRating.value),
            text:reviewText.value,
            date:new Date().toLocaleDateString()

        });

        localStorage.setItem("reviews",JSON.stringify(reviews));

        renderReviews();

        reviewName.value="";
        reviewRating.value="5";
        reviewText.value="";

        alert("Thank you for your review ❤️");

    });

}

renderReviews();