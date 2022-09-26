"use strict";
import { User } from "./userAcc";

import("../css/shared-css.css");
import("../css/log-in.css");

//Log in
const emailField = document.getElementById("email-f");
const passField = document.getElementById("password");
const logInForm = document.querySelector(".log-in__form");
const emailErrorField = document.getElementById("email-error");
const passErrorField = document.getElementById("pass-error");

emailField.addEventListener("blur", function () {
  if (localStorage.getItem(emailField.value) === null) {
    console.log(localStorage.getItem(emailField.value));
    emailErrorField.classList.remove("hidden");
  } else {
    passErrorField.classList.add("hidden");
  }
});
passField.addEventListener("blur", function () {
  if (localStorage.getItem(passField.value) === null) {
    passErrorField.classList.remove("hidden");
  } else {
    passErrorField.classList.add("hidden");
  }
});

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    localStorage.getItem(emailField.value) !== null &&
    localStorage.getItem(passField.value) !== null
  ) {
    export const logedInUserEmail = emailField.value;
    window.location.href = "/user-acc.html";
  } else return;
});
