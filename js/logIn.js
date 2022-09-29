"use strict";

import './fakeData.js';

//Log in
const emailField = document.getElementById("email-f");
const passField = document.getElementById("password");
const logInForm = document.querySelector(".log-in__form");
const emailErrorField = document.getElementById("email-error");
const passErrorField = document.getElementById("pass-error");

emailField.addEventListener("blur", function () {
  if (localStorage.getItem(emailField.value) === null) {
    emailErrorField.classList.remove("hidden");
  } else {
    passErrorField.classList.add("hidden");
  }
});

passField.addEventListener("blur", function () {
  const userByEmail = JSON.parse(localStorage.getItem(emailField.value));

  if (userByEmail.password !== passField.value || passField.value === null) {
    passErrorField.classList.remove("hidden");
  } else {
    passErrorField.classList.add("hidden");
  }
});

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userByEmail = JSON.parse(localStorage.getItem(emailField.value));

  if (
    localStorage.getItem(emailField.value) !== null &&
    userByEmail.password === passField.value
  ) {
    localStorage.setItem('logedInUserEmail', emailField.value);
    window.location.href = "./user-acc.html"
  };
});
