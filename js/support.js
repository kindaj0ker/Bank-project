"use strict";
const questions = document.querySelectorAll(".question");
questions.forEach((q) =>
  q.addEventListener("click", function () {
    if (q.nextElementSibling.classList.contains("hidden")) {
      q.nextElementSibling.classList.remove("hidden");
      q.lastElementChild.classList.add("arrow-down");
    } else {
      q.nextElementSibling.classList.add("hidden");
      q.lastElementChild.classList.remove("arrow-down");
    }
  })
);

//open/close contact form
const formBtn = document.querySelector(".form-hidden--mode");
const contactForm = document.querySelector(".form-block");
const closeFormBtn = document.querySelector(".close-form--btn");
const userMessage = document.querySelector(".user-input--message");
const sendMessageBtn = document.querySelector(".send-message__btn");
const dialogBlock = document.querySelector(".dialog-block");
const inputBlock = document.querySelector(".input-block");
const userInfoForm = document.querySelector(".user-info__form");
const sendDataMessage = document.querySelector(".send-data__message");

function toggleForm() {
  contactForm.classList.toggle("hidden");
  formBtn.classList.toggle("hidden");
}
formBtn.addEventListener("click", toggleForm);
closeFormBtn.addEventListener("click", toggleForm);

sendMessageBtn.addEventListener("click", function () {
  if (userMessage.value !== "") {
    const message = userMessage.value;
    inputBlock.classList.add("hidden");
    const html = `<div class="user-message">
              <p>${message}</p>
            </div>
            <div class="operator-message">
            <p>
              Unfortunately, all the operators are busy now. Please fill the form
              and we'll contact you soon.
            </p>
          </div>
          <div class="operator-message init-message">
              <p class="init-form">FORM</p>
            </div>`;
    dialogBlock.insertAdjacentHTML("beforeend", html);
    const initUserInfoFormLink = dialogBlock.querySelector(".init-message");
    initUserInfoFormLink.addEventListener("click", function () {
      dialogBlock.classList.toggle("hidden");
      userInfoForm.classList.toggle("hidden");
    });
  }
});

userInfoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  userInfoForm.classList.toggle("hidden");
  sendDataMessage.classList.toggle("hidden");
});
toggleForm();
