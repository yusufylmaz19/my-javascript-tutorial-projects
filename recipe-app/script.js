const meals = document.getElementById("meals");
const favMeals = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const closePop = document.querySelector(".close-pop");
const popupInfoContainer = document.querySelector(".popup-info-container");
const mealInfo = document.getElementById("meals-info");

getrandomMeal();
fetchFavMeals();

async function getrandomMeal() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await res.json();
  const randomMeal = data.meals[0];
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=` + id
  );
  const data = await res.json();
  const meal = data.meals[0];
  return meal;
}

async function getMealBySearch(term) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=` + term
  );
  const data = await res.json();
  const meal = data.meals;
  return meal;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
    <div class="meal-header">
    ${
      random
        ? `<span class="random">
    random recipe
    </span>`
        : ""
    }

<img src=${mealData.strMealThumb} alt="${mealData.strMeal}"></div>
</div>
<div class="meal-body">
<h3>${mealData.strMeal}</h3>
<button class="fav"}>
<i class="fa-solid fa-heart"></i> 
</button>
</div>
</div>
`;

  meals.appendChild(meal);

  const buttonFav = meal.querySelector(".meal-body .fav");

  buttonFav.addEventListener("click", () => {
    if (buttonFav.classList.contains("active")) {
      removeMealFromLs(mealData.idMeal);
      buttonFav.classList.remove("active");
    } else {
      addMealToLS(mealData.idMeal);
      buttonFav.classList.add("active");
    }

    fetchFavMeals();
  });

  meal.addEventListener('click',()=>{
    mealInfo.innerHTML='';
    ShowMealInfo(mealData);
  })

}

function addMealToLS(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLs(mealId) {
  const mealIds = getMealsFromLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

function addMealtoFav(mealData) {
  const meal = document.createElement("li");

  meal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><span>${mealData.strMeal}</span> 
    <button class="close"><i class="fa-regular fa-x"></i></button>
    `;

  favMeals.appendChild(meal);

  const btn = document.querySelector(".close");

  btn.addEventListener("click", () => {
    removeMealFromLs(mealData.idMeal);
    fetchFavMeals();
  });

  favMeals.addEventListener('click',()=>{
    mealInfo.innerHTML='';
    ShowMealInfo(mealData);
  })

}

async function fetchFavMeals() {
  //  clean the container
  favMeals.innerHTML = "";

  const mealIds = getMealsFromLS();
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    let meal = await getMealById(mealId);
    addMealtoFav(meal);
  }
}

searchBtn.addEventListener("click", async () => {
  const search = searchTerm.value;
  const searchMeals = await getMealBySearch(search);

  meals.innerHTML = "";
  if (searchMeals) {
    searchMeals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

closePop.addEventListener("click", () => {
  popupInfoContainer.style.visibility = "hidden";
});

function ShowMealInfo(mealData) {
  const mealsEl=document.createElement('div');

  const ingredients=[];

  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
        ingredients.push(
            `${mealData["strIngredient" + i]} - ${
                mealData["strMeasure" + i]
            }`
        );
    } else {
        break;
    }
}

  mealsEl.innerHTML=`<h1>${mealData.strMeal}</h1>
  <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
  />
  <p>
  ${mealData.strInstructions}
  </p>
  <h3>Ingredients:</h3>
<ul>
            ${ingredients
                .map(
                    (ing) => `
            <li>${ing}</li>
            `
                )
                .join("")}
        </ul>
    </div>
</div>`

  mealInfo.appendChild(mealsEl)

  popupInfoContainer.style.visibility="visible";
}
