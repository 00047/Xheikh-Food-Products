const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".mobile-sidebar");
const closeBtn = document.querySelector(".close-btn");
const overlay = document.querySelector(".overlay");

const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");

const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");

const cartSubtotal = document.getElementById("cart-subtotal");
const deliveryCharge = document.getElementById("delivery-charge");
const cartTotal = document.getElementById("cart-total");

const clearCartBtn = document.querySelector(".clear-cart-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= MENU ================= */
if(menuBtn){
    menuBtn.addEventListener("click",()=>{
        sidebar?.classList.add("active");
        overlay?.classList.add("active");
    });
}

if(closeBtn){
    closeBtn.addEventListener("click",()=>{
        sidebar?.classList.remove("active");
        overlay?.classList.remove("active");
    });
}

if(overlay){
    overlay.addEventListener("click",()=>{
        sidebar?.classList.remove("active");
        cartSidebar?.classList.remove("active");
        overlay.classList.remove("active");
    });
}

/* ================= CART OPEN ================= */
if(cartIcon){
    cartIcon.addEventListener("click",()=>{
        cartSidebar.classList.add("active");
        overlay.classList.add("active");
        renderCart();
    });
}

/* ================= CART CLOSE ================= */
if(closeCart){
    closeCart.addEventListener("click",()=>{
        cartSidebar.classList.remove("active");
        overlay.classList.remove("active");
    });
}

/* ================= ADD TO CART (IMPORTANT FIX) ================= */
window.addToCart = function(event, name, price){

    // STOP PAGE JUMP 🔥
    if(event) event.preventDefault();

    let item = cart.find(p => p.name === name);

    if(item){
        item.quantity++;
    } else {
        cart.push({ name, price, quantity:1 });
    }

    saveCart();
    updateCartCount();
    renderCart();

    showToast(name + " added to cart");
};

/* ================= SAVE ================= */
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= COUNT ================= */
function updateCartCount(){
    let total = 0;
    cart.forEach(i => total += i.quantity);
    if(cartCount) cartCount.textContent = total;
}

/* ================= RENDER CART ================= */
function renderCart(){

    if(!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    let total = 0;

    if(cart.length === 0){
        cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
        if(cartSubtotal) cartSubtotal.textContent = 0;
        if(deliveryCharge) deliveryCharge.textContent = "Rs.300";
        if(cartTotal) cartTotal.textContent = 300;
        return;
    }

    cart.forEach((item,index)=>{

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
        <div class="cart-item">
            <div class="cart-item-top">
                <div>
                    <h4>${item.name}</h4>
                    <p>Rs.${item.price}</p>
                </div>

                <button onclick="removeItem(${index})">🗑</button>
            </div>

            <div class="qty-box">
                <button onclick="changeQty(${index},-1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index},1)">+</button>
            </div>

            <p><b>Total:</b> Rs.${itemTotal}</p>
        </div>
        `;
    });

    if(cartSubtotal) cartSubtotal.textContent = total;

    let delivery = total >= 5000 ? 0 : 300;

    if(deliveryCharge){
        deliveryCharge.textContent = delivery === 0 ? "FREE" : "Rs.300";
    }

    if(cartTotal){
        cartTotal.textContent = total + delivery;
    }
}

/* ================= REMOVE ================= */
window.removeItem = function(index){
    cart.splice(index,1);
    saveCart();
    updateCartCount();
    renderCart();
}

/* ================= QTY ================= */
window.changeQty = function(index,change){
    cart[index].quantity += change;

    if(cart[index].quantity <= 0){
        cart.splice(index,1);
    }

    saveCart();
    updateCartCount();
    renderCart();
}

/* ================= CLEAR CART (FIXED) ================= */
if(clearCartBtn){
    clearCartBtn.addEventListener("click",()=>{

        cart = [];
        saveCart();
        updateCartCount();
        renderCart();

        showToast("Cart cleared");
    });
}

/* ================= TOAST ================= */
function showToast(msg){

    const container = document.getElementById("toast-container");

    if(!container) return;

    let toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = msg;

    container.appendChild(toast);

    setTimeout(()=> toast.classList.add("show"), 50);

    setTimeout(()=> toast.remove(), 2000);
}

/* ================= INIT ================= */
updateCartCount();
renderCart();



// ================= SEARCH PRODUCTS =================

const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");
const noResults = document.getElementById("no-results");
console.log(noResults);

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.trim().toLowerCase();
        let found = 0;

        products.forEach(product => {

            const name = product.querySelector("h3").textContent.toLowerCase();

            if (name.includes(value)) {
                product.style.display = "";
                found++;
            } else {
                product.style.display = "none";
            }

        });

        if (found === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }

    });

}
// =================  Catogery Working  ================= //

const categories = document.querySelectorAll(".category-list li");

categories.forEach(category => {

    category.addEventListener("click", () => {

        const weight = category.dataset.weight;

        products.forEach(product => {

            if(weight === "all" || product.dataset.weight === weight){
                product.style.display = "";
            }else{
                product.style.display = "none";
            }

        });

    });

});

