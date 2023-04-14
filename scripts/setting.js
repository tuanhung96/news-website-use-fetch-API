"use strict";

const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const submitBtn = document.getElementById("btn-submit");

const userArr = JSON.parse(getFromStorage("userArr"))
  ? JSON.parse(getFromStorage("userArr"))
  : [];

const currentUser = JSON.parse(getFromStorage("currentUser"));

submitBtn.addEventListener("click", function () {
  if (currentUser) {
    if (!pageSizeInput.value) {
      alert("Please fill News per page!");
    } else {
      currentUser.category = categoryInput.value;
      currentUser.pageSize = pageSizeInput.value;
      saveToStorage("currentUser", JSON.stringify(currentUser));

      // replace current user in user array

      const indexCurrentUser = userArr
        .map((user) => user.userName)
        .indexOf(currentUser.userName);
      userArr[indexCurrentUser] = currentUser;
      saveToStorage("userArr", JSON.stringify(userArr));
    }
  } else {
    alert("Please Log in!");
  }
});
