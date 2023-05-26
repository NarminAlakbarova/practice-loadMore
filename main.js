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
  allData = data;
  searchedData = searchInp.value ? searchedData : allData;
  // console.log(searchedData);
  // console.log(allData);
  drawCard(searchedData.slice(0, max));
}
getAllData();

loadMoreBtn.addEventListener("click", async function () {
  max += 4;
  //  getAllData()
  if (max >= searchedData.length) {
    loadMoreBtn.style.display = "none";
  }
  if (searchedData.length) {
    drawCard(searchedData.slice(0, max));
  } else {
    getAllData();
  }
  console.log(max);
});

sort.addEventListener("click", function () {
  if (sort.innerHTML === "Sort") {
    searchedData = searchedData.sort((a, b) => a.price - b.price);
    sort.innerHTML = "Ascending";
  } else if (sort.innerHTML === "Ascending") {
    searchedData = searchedData.sort((a, b) => b.price - a.price);

    sort.innerHTML = "Descending";
  }
  // getAllData()
  drawCard(searchedData.slice(0, max));
});

searchInp.addEventListener("input", function (e) {
  searchedData = allData;
  searchedData = searchedData.filter((item) =>
    item.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  drawCard(searchedData.slice(0, max));
});
