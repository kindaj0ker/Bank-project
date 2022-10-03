"use strict";
import { User } from "./userAcc.js";

import('../css/shared-css.css');
import('../css/get-card.css');

const registerForm = document.querySelector(".register-content");
const createAccBtn = document.querySelector(".create-acc--btn");
const plan = document.querySelector(".plan");
const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const ageField = document.getElementById("bday");
const email = document.getElementById("email-f");
const passwordField = document.querySelector('input[name="password"]');
const confirmPasswordField = document.querySelector(
  'input[name="confirm-password"]'
);
const ageCheckErrorField = document.getElementById("age-check--error");
const passwordErrorField = document.getElementById("pass");
const confErrorField = document.getElementById("conf-pass");
const successMessage = document.querySelector(".success-reg--message");
const allInputs = document.querySelectorAll("input");

//Allow only letters on name fields
const onlyLetters = function () {
  let regex = /[0-9]/g;
  this.value = this.value.replace(regex, "");
};

fName.addEventListener("input", onlyLetters);
lName.addEventListener("input", onlyLetters);

//Change border color on focus
const addBorderOnFocus = function (e) {
  e.target.closest(".form-field").classList.add("border-focus");
};
const removeBorderOnFocus = function (e) {
  e.target.closest(".form-field").classList.remove("border-focus");
};

allInputs.forEach((input) => {
  input.addEventListener("focus", addBorderOnFocus);
  input.addEventListener("blur", removeBorderOnFocus);
});

//Age check
let maxBDay;
const ageCheck = function () {
  const today = new Date().toISOString().split("T")[0];
  const maxBirthYear = today.split("-")[0] - 16;
  const maxDay = new Date().getDate().toString().padStart(2, "0");
  const maxMonth = new Date().getMonth().toString().padStart(2, "0");
  maxBDay = maxBirthYear + "-" + maxMonth + "-" + maxDay;
  ageField.max = `${maxBDay}`;
};

const validAgeInput = function () {
  if (this.value > maxBDay) {
    this.value = "";
    ageCheckErrorField.classList.remove("hidden");
  } else {
    ageCheckErrorField.classList.add("hidden");
  }
};
ageCheck();
ageField.addEventListener("blur", validAgeInput);

// Password validation
const passValidation = function () {
  if (
    passwordField.value.length < 6 ||
    !passwordField.value.match(/[A-Za-z\d]*$/) ||
    !passwordField.value.match(/(!|“|#|\$|%|‘|\(|\)|\*)/)
  ) {
    passwordErrorField.classList.replace("hidden", "password-validation");
  } else passwordErrorField.classList.replace("password-validation", "hidden");
};
passwordField.addEventListener("blur", passValidation);

// Password comparation
const passConfirmation = function () {
  if (passwordField.value !== confirmPasswordField.value) {
    confErrorField.classList.replace("hidden", "password-validation");
  } else {
    confErrorField.classList.replace("password-validation", "hidden");
  }
};
confirmPasswordField.addEventListener("blur", passConfirmation);
passwordField.addEventListener("blur", passConfirmation);

// Create account
const isValidForm = function () {
  const isNotEmpty = Array.from(allInputs)
    .map((input) => {
      if (input.value == "") {
        return false;
      }

      return true;
    })
    .every(Boolean);

  return (
    isNotEmpty &&
    passwordErrorField.classList.contains("hidden") &&
    confErrorField.classList.contains("hidden")
  );
};

const firstName = fName.value;
const lastName = lName.value;
const bDay = ageField.value;
const userEmail = email.value;
const password = password.value;
const cardPlan = plan.value;

createAccBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (isValidForm(e)) {
    const user = new User(
      firstName,
      lastName,
      bDay,
      userEmail,
      password,
      cardPlan
    );
    localStorage.setItem(email.value, JSON.stringify(user));
    registerForm.classList.add("hidden");
    successMessage.classList.remove("hidden");
  }
});
