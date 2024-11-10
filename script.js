
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const mealResultTitle = document.querySelector(".meal-result .title");
const mainContent = document.getElementById("main-content");
const errorMsg = document.getElementById("error-msg");
const latestRecipesSection = document.getElementById("latest-recipes");
const faqSection = document.getElementById("faq-section");
const footer = document.getElementById("footer");
const subscribeBtn = document.getElementById('subscribe-btn');
const popupForm = document.getElementById('popup-form');
const closePopup = document.getElementById('close-popup');
const body = document.body;
const errorSound = document.getElementById("click-sound");

function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim();

    if (searchInputTxt === "") {
        errorMsg.style.display = "block";
        return;
    } else {
        errorMsg.style.display = "none";
    }

    mainContent.style.display = "none";
    latestRecipesSection.style.display = "none";
    faqSection.style.display = "none";
    footer.style.display = "none";

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food" />
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove("notFound");
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add("notFound");
            }
            mealList.innerHTML = html;
            mealResultTitle.style.visibility = "visible";
        });
}

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.closest(".meal-item");
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then((response) => response.json())
            .then((data) => {
                let meal = data.meals[0];
                let html = `
                    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3>Instructions:</h3>
                        <p>${meal.strInstructions}</p>
                    </div>
                    <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="recipe-link">
                        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                    </div>
                `;
                mealDetailsContent.innerHTML = html;
                mealDetailsContent.parentElement.classList.add("showRecipe");
            });
    }
}

subscribeBtn.addEventListener('click', function() {
    popupForm.style.display = 'block';
});
closePopup.addEventListener('click', function() {
    popupForm.style.display = 'none';
});

function validate(){
    let email = document.getElementById("email").value;
    if(email === ""){
        errorSound.play();
        alert("Please enter your email.");
    } else if (!email.includes("@")) {
        alert("Please enter a valid email address!");
        errorSound.play();
    }
}

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.style.display = (answer.style.display === "block") ? "none" : "block";
    });
});

recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe");
});

document.querySelectorAll('.recipe-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600); // Removes the ripple element after animation
    });
});

function displayDateTime() {
    const now = new Date();
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const formattedDate = now.toLocaleString('en-US', options);
    document.getElementById('date-time').innerHTML = formattedDate;
}
setInterval(displayDateTime, 1000);
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

//darkmode


searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const mainContentLeft = document.querySelector('.main-content-left');
const mainContentRight = document.querySelector('.main-content-right');
const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.navbar-brand img');
const cards = document.querySelectorAll('.card');

if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
}

function enableDarkMode() {
    body.classList.add('dark-mode');
    document.querySelector('header').classList.add('dark-mode');
    mainContentLeft.classList.add('dark'); 
    mainContentRight.classList.add('dark');
    navbar.setAttribute('data-bs-theme', 'dark'); 
    cards.forEach(card => card.classList.add('text-bg-dark'));
    logo.src = 'images/logodark.jpg';
    faqSection.classList.add('dark-mode'); // Add dark mode to FAQ section

    localStorage.setItem('darkMode', 'enabled'); 
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    document.querySelector('header').classList.remove('dark-mode');
    mainContentLeft.classList.remove('dark'); 
    mainContentRight.classList.remove('dark'); 
    navbar.removeAttribute('data-bs-theme');
    logo.src = 'images/Recipe Finder (1).png';
    cards.forEach(card => card.classList.remove('text-bg-dark'));
    faqSection.classList.remove('dark-mode'); // Remove dark mode from FAQ section

    localStorage.setItem('darkMode', 'disabled'); 
}

toggleDarkModeButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});



document.querySelectorAll('.my-custom-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.2)';
        card.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {

            document.querySelectorAll('.faq-answer').forEach(openAnswer => {
                openAnswer.style.maxHeight = null;
            });

            const padding = 20; 
            answer.style.maxHeight = answer.scrollHeight + padding + 'px';
        }
    });
});

///Filter search 


const searchInput = document.getElementById("search-input"); 

window.addEventListener('load', () => {
    const savedSearch = localStorage.getItem('lastSearch');
    if (savedSearch) {
        searchInput.value = savedSearch; 
        getMealList(savedSearch); 
    }
});

function getMealList(searchTerm) {
    const searchInputTxt = searchTerm || searchInput.value.trim(); 
    if (searchInputTxt === "") {
        errorMsg.style.display = "block";
        return;
    } else {
        errorMsg.style.display = "none";
    }

    localStorage.setItem('lastSearch', searchInputTxt);

    mainContent.style.display = "none";
    latestRecipesSection.style.display = "none";
    faqSection.style.display = "none";
    footer.style.display = "none";

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food" />
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove("notFound");
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add("notFound");
            }
            mealList.innerHTML = html;
            mealResultTitle.style.visibility = "visible";
        })
        .catch(error => console.log("Error fetching data:", error));
}

searchBtn.addEventListener("click", () => getMealList());

const clearSearchBtn = document.getElementById("clear-search-btn");
if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
        localStorage.removeItem('lastSearch'); 
        searchInput.value = ""; 
        mealList.innerHTML = ""; 
        mealResultTitle.style.visibility = "hidden"; 
        errorMsg.style.display = "none"; 
        window.location.href = 'index.html';
    });
}

window.addEventListener("keydown", (event) => {
    const isModalOpen = mealDetailsContent.parentElement.classList.contains("showRecipe");
    if (event.key === "Enter" && document.activeElement === searchInput) {
        getMealList();
    }
    if (event.key === "Escape" && isModalOpen) {
        mealDetailsContent.parentElement.classList.remove("showRecipe");
    }
});