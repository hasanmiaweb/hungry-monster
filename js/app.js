//Search for Meal

const searchButton = async () => {
  const searchinput = document.getElementById("searchinput");
  apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchinput.value}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  desplayMeals(data.meals);
};

// Desplay Search Result

const desplayMeals = (showProductAll) => {
  let htmlTemplate = "";
  if (showProductAll) {
    showProductAll.forEach((showmeals) => {
      htmlTemplate =
        htmlTemplate +
        `<div class="col-md-3">
          <span onclick="productDes(${showmeals.idMeal})"  id="product">
            <div class="productShowInner">
              <div class="productImg">
                <img
                  id="productphoto"
                  src="${showmeals.strMealThumb}"
                  class="img-fluid"
                  alt=""
                />
              </div>
              <div class="productName text-center">
                <p>${showmeals.strMeal}</p>
              </div>
            </div>
          </span>
        </div>`;
    });
  } else {
    htmlTemplate = document.getElementById(
      "error"
    ).innerHTML = `<div id="errorMessege" ><i class="fas fa-exclamation-triangle"></i> <h2>Oops..!</h2>
    <span>DATA NOT FOUND </span>
    </div>`;
    document.getElementById("searchProduct").innerHTML = htmlTemplate;
  }
  document.getElementById("searchProduct").innerHTML = htmlTemplate;
};

// Single Product Details
const productDes = async (singleProductDetails) => {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${singleProductDetails}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  productFullInfo(data.meals[0]);
};

const productFullInfo = (singleProductInfo) => {
  let singleProductadd = [];
  for (let i = 1; i <= 25; i++) {
    if (singleProductInfo[`strIngredient${i}`]) {
      singleProductadd.push(
        `${singleProductInfo[`strMeasure${i}`]} ${
          singleProductInfo[`strIngredient${i}`]
        }`
      );
    }
  }

  let htmlTemplate = `
  <div class="col-md-6 m-auto">
    <h3 id="searchResultTitle">Food Details</h3>
    <div class="shoProductDetailsInner mt-3">
      <img src="${singleProductInfo.strMealThumb}" class="img-fluid" alt="" />
      <div class="shoProductDetailsTitle">
        <h2>${singleProductInfo.strMeal}</h2>
        <h4>Ingredients</h4>
  
        <ul id="detailsLi">
        ${singleProductadd
          .map(
            (liContent) =>
              `<li><i class="fas fa-check-square"></i><span> ${liContent}</span></li>`
          )
          .join("")}
        </ul>
        <hr>
      </div>
    </div>
  </div>`;
  document.getElementById("singleProductDetails").innerHTML = htmlTemplate;
};
