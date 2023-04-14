"use strict";

const registerBtn = document.getElementById("btn-submit");
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-password-confirm");

const userArr = JSON.parse(getFromStorage("userArr"))
  ? JSON.parse(getFromStorage("userArr"))
  : [];

// Register Button

let data = {};
registerBtn.addEventListener("click", function () {
  data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    userName: userNameInput.value,
    password: passwordInput.value,
    confirmPassword: confirmPasswordInput.value,
  };

  // validate data

  function validate(data) {
    let validateCheck = false;
    if (
      !data.firstName ||
      !data.lastName ||
      !data.userName ||
      !data.password ||
      !data.confirmPassword
    ) {
      alert("Data must be filled out");
    } else if (userArr.map((user) => user.userName).includes(data.userName)) {
      alert("Username must unique!");
    } else if (data.password !== data.confirmPassword) {
      alert("Confirm Password is not correct!");
    } else if (data.password.length < 9) {
      alert("Password must be more than 8 characters");
    } else {
      validateCheck = true;
    }
    return validateCheck;
  }

  // function convert JS Object to Class Instance
  const categoryDefault = "general";
  const pageSizeDefault = 3;
  function parseUser(data) {
    const user = new UserCl(
      data.firstName,
      data.lastName,
      data.userName,
      data.password,
      categoryDefault,
      pageSizeDefault
    );
    return user;
  }

  // add user data to user array and save to storage
  if (validate(data)) {
    const user = parseUser(data);
    userArr.push(user);
    saveToStorage("userArr", JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
  } else {
    alert("Check your information");
  }
});
