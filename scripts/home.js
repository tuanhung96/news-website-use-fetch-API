"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

const currentUser = JSON.parse(getFromStorage("currentUser"));
const userArr = JSON.parse(getFromStorage("userArr"))
  ? JSON.parse(getFromStorage("userArr"))
  : [];

if (!currentUser) {
  // when user has not logged in yet
  loginModal.classList.remove("hide");
  mainContent.classList.add("hide");
} else {
  // when user logged in
  loginModal.classList.add("hide");
  welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
}

// log out button
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "../pages/login.html";
});
