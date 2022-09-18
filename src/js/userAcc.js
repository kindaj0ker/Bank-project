"use strict";
import uniqid from "uniqid";
import { newUserEmail } from "./getCard";

// Create new user account
const users = [];
export class User {
  constructor(fName, lName, bDay, email, password, plan) {
    this.id = uniqid();
    this.fName = fName;
    this.lN = lName;
    this.bDay = bDay;
    this.email = email;
    this.password = password;
    this.cards = [
      {
        id: "",
        plan: this.plan,
        date: new Date().toISOString().split("T")[0],
      },
    ];
    this.operations = [
      {
        id: "",
        cardId: "",
        amount: 5,
        currency: "",
        date: "",
        type: "",
        from: "",
        to: "",
      },
    ];
  }
}

//New user from registered user

//Header greeting
const userFname = document.querySelector(".user-f--name");
window.addEventListener("load", function () {
  localStorage.getItem("newUserEmail");
  console.log(localStorage.getItem("newUserEmail"));
});

// Currency info-box

// Date-time box
//Log out timer

const timer = document.querySelector(".timer");
let time = 60;
const countDownTimerFunc = setInterval(function (time) {
  const min = toString(Math.trunc(`${time / 60}`));
  const sec = toString(`${time % 60}`);
  timer.textContent = `${min}:${sec}`;
  time--;
}, 1000);

const logOutTimer = setTimeout(function () {
  countDownTimerFunc();
  if (min === "0" && sec === "0") {
    console.log(lpggedout);
  }
}, time);
// window.addEventListener("click", countDownTimerFunc);
