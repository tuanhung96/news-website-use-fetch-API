"use strict";

const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

const userArr = JSON.parse(getFromStorage("userArr"))
  ? JSON.parse(getFromStorage("userArr"))
  : [];

let data = {};

loginBtn.addEventListener("click", function () {
  data = {
    userName: userNameInput.value,
    password: passwordInput.value,
  };

  const userNameArr = userArr.map((user) => user.userName);
  if (!data.userName || !data.password) {
    alert("Data must be filled out");
  } else if (userNameArr.includes(data.userName)) {
    const userIndex = userNameArr.indexOf(data.userName);
    if (userArr[userIndex].password === data.password) {
      const currentUser = userArr[userIndex];
      saveToStorage("currentUser", JSON.stringify(currentUser));
      window.location.href = "../index.html";
    } else {
      alert("Password is not correct!");
    }
  } else {
    alert(`Username ${data.userName} does not exist!`);
  }
});
