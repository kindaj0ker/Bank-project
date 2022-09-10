"use strict";
import { fakeUser } from "./userAcc";
//Log in
const emailField = document.getElementById("email-f");
const passField = document.getElementById("password");
const logInForm = document.querySelector(".log-in__form");
const emailErrorField = document.getElementById("email-error");
const passErrorField = document.getElementById("pass-error");

fakeUser();

emailField.addEventListener("blur", function () {
  if (localStorage.getItem(emailField.value) === null) {
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

  window.location.href = "/user-acc.html";
});
