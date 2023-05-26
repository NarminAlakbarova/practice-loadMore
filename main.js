let row = document.querySelector(".row");
let searchInp = document.querySelector(".search");
let sort = document.querySelector(".sort");
let loadMoreBtn = document.querySelector(".load");
const BASE_URL = "http://localhost:8080/users";
let allData = [];
let searchedData = [];
let sortedData = [];
// let max=4
// let defaultData = [];
let max = 4;
function drawCard(arr) {
  row.innerHTML = "";
  arr.forEach((item) => {
    row.innerHTML += `
        <div class="col-12 col-md-6 col-lg-3 my-3">
        <div class="card">
          <img src="./st-blog-3.jpg" alt="" />
          <h4>${item.name}</h4>
          <p>${item.usertype}</p>
          <p>${item.price}</p>
        </div>
      </div>
        
        `;
  });
}

async function getAllData() {
  let resp = await axios(BASE_URL);
  let data = resp.data;
  allData = data.slice(0, max);
  if (sort.innerHTML == "Ascending") {
    sortedData = allData.sort((a, b) => a.price - b.price);
    console.log("s");
  } else if (sort.innerHTML == "Descending") {
    sortedData = allData.sort((a, b) => b.price - a.price);
  } else {
    sortedData = allData;
  }

  searchedData = searchedData.length|| searchInp.value
    ? sortedData.filter((item) =>
        item.name.toLowerCase().includes(searchInp.value.toLowerCase())
      )
    : sortedData;

  drawCard(searchedData);
}
getAllData();

loadMoreBtn.addEventListener("click", async function () {
  let resp = await axios(BASE_URL);
  let data = resp.data;
  if (allData.length >= data.length) {
    loadMoreBtn.style.display = "none";
  } else {
    max = max + 4;
    getAllData();
    console.log(max);
  }
});
sort.addEventListener("click", function () {
  if (sort.innerHTML === "Sort") {
    sort.innerHTML = "Ascending";
  } else if (sort.innerHTML === "Ascending") {
    sort.innerHTML = "Descending";
  } else if (sort.innerHTML === "Descending") {
    sort.innerHTML = "Sort";
  }
  getAllData();
});

searchInp.addEventListener("input", function (e) {
  searchedData = sortedData.filter((item) =>
    item.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  drawCard(searchedData);
});
