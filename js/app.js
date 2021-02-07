// All common variable

const searchBtn = document.getElementById("search");
const searchinput = document.getElementById("searchinput");
const searchProductResult = document.getElementById("searchProductResult");
const searchMainbar = document.getElementById("searchMainbar");

// Search Button fatch And addEventListener
searchBtn.addEventListener("click", function () {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchinput.value}`
  )
    .then((response) => response.json())
    .then((data) => showProduct(data.meals));
});

const showProduct = (showProductAll) => {
  let htmlTemplate = "";

  showProductAll.forEach((showProductDetails) => {
    htmlTemplate =
      htmlTemplate +
      `
    <div class="col-md-3">
      <span onclick="productDes(${showProductDetails.idMeal})"  id="product">
        <div class="productShowInner">
          <div class="productImg">
            <img
              id="productphoto"
              src="${showProductDetails.strMealThumb}"
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="productName text-center">
            <p>${showProductDetails.strMeal}</p>
          </div>
        </div>
      </span>
    </div>
      `;
  });

  document.getElementById("searchProductResult").innerHTML = htmlTemplate;
};

// Single Product Details
const productDes = (singleProductDetails) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${singleProductDetails}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => productFullInfo(data));
};

const productFullInfo = (singleProductInfo) => {
  let fakalaArry = [];
  console.log(fakalaArry);
  for (let i = 1; i <= 20; i++) {
    if (singleProductInfo[`strIngredient${i}`]) {
      fakalaArry.push(
        `${singleProductInfo[`strMeasure${i}`]} ${
          singleProductInfo[`strIngredient${i}`]
        }`
      );
    }
  }

  let htmlTemplate = `
  <div class="col-md-6 m-auto">
  <div class="shoProductDetailsInner mt-3">
    <img src="${
      singleProductInfo.meals[0].strMealThumb
    }" class="img-fluid" alt="" />
    <div class="shoProductDetailsTitle">
      <h2>${singleProductInfo.meals[0].strMeal}</h2>
      <h4>Ingredients</h4>

      <ul id="detailsLi">
      ${fakalaArry
        .map((liInfo) => {
          `<li>
          <i class="fas fa-check-square"></i>
          <span>${liInfo}</span>
        </li>`;
        })
        .join("")}
      </ul>
      <hr>
   
    </div>
  </div>
</div>`;

  searchProductResult.classList.add("d-none");
  searchMainbar.classList.add("d-none");
  document.getElementById("singleProductDetails").innerHTML = htmlTemplate;
};
