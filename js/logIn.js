"use strict";

//Log in
const emailField = document.getElementById("email-f");
const passField = document.getElementById("password");
const logInForm = document.querySelector(".log-in__form");
const emailErrorField = document.getElementById("email-error");
const passErrorField = document.getElementById("pass-error");

//Email check
let user;
emailField.addEventListener("blur", function () {
  if (localStorage.getItem(emailField.value) === null) {
    emailErrorField.classList.remove("hidden");
  } else {
    user=JSON.parse(localStorage.getItem(emailField.value));
    passErrorField.classList.add("hidden");
  }
});

//Password check
passField.addEventListener("blur", function () {
  if (user.password !== passField.value) {
    passErrorField.classList.remove("hidden");
  } else {
    passErrorField.classList.add("hidden");
  }
});

//Submition
logInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    localStorage.getItem(emailField.value) !== null &&
    user.password === passField.value
  ) {
    localStorage.setItem('logedIn', JSON.stringify(user));
    window.location.href = "./user-acc.html";
  } else return;
});
