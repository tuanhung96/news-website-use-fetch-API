"use strict";

const newsContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const nextBtn = document.getElementById("btn-next");

const currentUser = JSON.parse(getFromStorage("currentUser"));

if (currentUser) {
  // Convert JS Object to Class Instance
  function parseUser(data) {
    const user = new UserCl(
      data.firstName,
      data.lastName,
      data.userName,
      data.password,
      data.category,
      data.pageSize
    );
    return user;
  }

  const currentUserInstance = parseUser(currentUser);

  // function render news data
  let page = 1;
  const renderNews = async function (country, category, pageSize, page) {
    try {
      const data = await currentUserInstance.news(
        country,
        category,
        pageSize,
        page
      );
      data.articles.forEach(function (article) {
        pageNum.textContent = `${page}`;
        const html = `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src=${article.urlToImage}
            class="card-img"
            alt=${article.title}>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.description}</p>
            <a href=${article.url}
              class="btn btn-primary">View</a>
          </div>
        </div>
      </div>
    </div>
    </div>`;
        newsContainer.insertAdjacentHTML("beforeend", html);

        // hide or show next button and prev button
        if (page === 1) {
          prevBtn.style.display = "none";
        } else if (page * pageSize >= data.totalResults) {
          nextBtn.style.display = "none";
        } else {
          prevBtn.style.display = "block";
          nextBtn.style.display = "block";
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  renderNews("us", currentUser.category, currentUser.pageSize, page);

  // next button

  nextBtn.addEventListener("click", function () {
    page += 1;
    newsContainer.innerHTML = "";
    renderNews("us", currentUser.category, currentUser.pageSize, page);
  });

  // prev button
  prevBtn.addEventListener("click", function () {
    page -= 1;
    newsContainer.innerHTML = "";
    renderNews("us", currentUser.category, currentUser.pageSize, page);
  });
} else {
  alert("Please Log in!");
}
