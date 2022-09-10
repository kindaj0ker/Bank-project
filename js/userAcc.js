"use strict";
import uniqid from "uniqid";
import { newUserEmail } from "./getCard";

// Create new user account
const users = [];
export class User {
  constructor(fN, lN, bDay, email, password, plan) {
    this.id = uniqid();
    this.fN = fName;
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
const countDownTimerFunc = setInterval(function (time) {
  const min = Math.trunc(`${time / 60}`);
  const sec = time % 60;
  timer.textContent = `${min}:${sec}`;
  time--;
}, 1000);
let time = 60;
countDownTimerFunc();
