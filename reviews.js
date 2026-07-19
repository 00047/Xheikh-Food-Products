// ================= ALL REVIEWS =================

const allReviews = document.getElementById("all-reviews");

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

let adminMode = false;

// ================= RENDER REVIEWS =================

function renderAllReviews(){

    if(!allReviews) return;

    allReviews.innerHTML = "";

    if(reviews.length === 0){

        allReviews.innerHTML = `
            <h2 style="text-align:center;color:#777;">
                No Reviews Yet
            </h2>
        `;

        return;

    }

    reviews.slice().reverse().forEach((review,index)=>{

        allReviews.innerHTML += `

            <div class="user-review">

                <h3>${review.name}</h3>

                <div class="stars">
                    ${"⭐".repeat(review.rating)}
                </div>

                <p>${review.text}</p>

                <small>${review.date}</small>

                ${
                    adminMode
                    ?
                    `
                    <button class="delete-review"
                    onclick="deleteReview(${reviews.length-1-index})">

                        <i class="fas fa-trash"></i>
                        Delete

                    </button>
                    `
                    :
                    ""
                }

            </div>

        `;

    });

}

// ================= DELETE REVIEW =================

function deleteReview(index){

    if(confirm("Delete this review?")){

        reviews.splice(index,1);

        localStorage.setItem("reviews",JSON.stringify(reviews));

        renderAllReviews();

    }

}

// ================= SECRET ADMIN SHORTCUT =================

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.altKey && e.key.toLowerCase()=="m"){

        e.preventDefault();

        if(adminMode){

            adminMode = false;

            alert("Admin Mode Disabled");

            renderAllReviews();

            return;

        }

        const password = prompt("Enter Admin Password");

        if(password === "sheikhonly"){

            adminMode = true;

            alert("Admin Mode Enabled");

            renderAllReviews();

        }else{

            alert("Wrong Password");

        }

    }

});

// ================= INITIAL =================

renderAllReviews();