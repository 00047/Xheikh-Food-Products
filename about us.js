const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".mobile-sidebar");
const closeBtn = document.querySelector(".close-btn");
const overlay = document.querySelector(".overlay");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });
}

if (overlay) {
    overlay.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });
}

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
        } else {
            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";
        }
    }

});


const boxes = document.querySelectorAll(".about-box");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

boxes.forEach(box=>{

    observer.observe(box);

});