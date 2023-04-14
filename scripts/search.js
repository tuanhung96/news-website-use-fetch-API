"use strict";

const queryInput = document.getElementById("input-query");
const submitBtn = document.getElementById("btn-submit");
const newsContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const nextBtn = document.getElementById("btn-next");
const navPageNum = document.getElementById("nav-page-num");

const currentUser = JSON.parse(getFromStorage("currentUser"));

let page = 1;
const pageSize = currentUser ? currentUser.pageSize : 3;

// function get News from API
const getNews = async function (query, pageSize, page) {
  try {
    const resNews = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=0fd9035771614a71a7e4f15973815058`
    );
    if (!resNews.ok) throw new Error("Problem getting News");
    const news = await resNews.json();
    return news;
  } catch (err) {
    alert(err);
    throw err;
  }
};

// function render news data

const renderNews = function (data, pageSize, page) {
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
    navPageNum.classList.remove("hide");
    if (page === 1) {
      prevBtn.style.display = "none";
    } else if (page * pageSize >= data.totalResults) {
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
  });
};

// search button
submitBtn.addEventListener("click", async function () {
  try {
    if (queryInput.value) {
      const query = queryInput.value;
      const data = await getNews(query, pageSize, page);
      renderNews(data, pageSize, page);
    } else {
      alert("Please Enter keyword!");
    }
  } catch (err) {
    alert(err);
  }
});

// next button
nextBtn.addEventListener("click", async function () {
  try {
    page += 1;
    newsContainer.innerHTML = "";
    const query = queryInput.value;
    const data = await getNews(query, pageSize, page);
    renderNews(data, pageSize, page);
  } catch (err) {
    alert(err);
  }
});

// prev button
prevBtn.addEventListener("click", async function () {
  try {
    page -= 1;
    newsContainer.innerHTML = "";
    const query = queryInput.value;
    const data = await getNews(query, pageSize, page);
    renderNews(data, pageSize, page);
  } catch (err) {
    alert(err);
  }
});
