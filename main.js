const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const inputField = document.querySelector("input");
let searchQuery = "";
const APP_ID = "0b7a0aad";
const APP_key = "cc0fac026a6f93fcaee293599221c604";



searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = inputField.value;
    fetchAPI();
    inputField.value = "";
});

const fetchAPI = async () => {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
}

const generateHTML = (results) => {
    container.classList.remove("initial");
    let generatedHTML = "";
    results.map(result => {
        generatedHTML +=
            `
        <div class="item">
                    <img src="${result.recipe.image}" alt="">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
                    </div>
                    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"}</p>
                    <p class="item-data">Health Label: ${result.recipe.healthLabels.length > 0 ? result.recipe.healthLabels : "No Data Found"}</p>
        </div>
        `
    });
    searchResultDiv.innerHTML = generatedHTML;
}


