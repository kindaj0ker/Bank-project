"use strict";
import uniqid from "uniqid";
import { logedInUserEmail } from "./logIn";

import("../css/shared-css.css");
import("../css/user-acc.css");

// Create new user account
export class User {
  constructor(fName, lName, bDay, email, password) {
    this.id = uniqid();
    this.fName = fName;
    this.lN = lName;
    this.bDay = bDay;
    this.email = email;
    this.password = password;
    this.cards = [];
    this.transactions = [];
  }
  createNewCard(cardPlan, id = `${uniqid()}`, expired, currency = "$") {
    const day = new Date().getDate().toString().padStart(2, "0");
    const month = new Date().getMonth().toString().padStart(2, "0");
    const year = new Date().getFullYear() + 4;
    const expiredDate = day + "-" + month + "-" + year;
    const data = new Map([
      ["plan", `${cardPlan}`],
      ["id", `${id}`],
      ["expired", `${expiredDate}`],
      ["currency", `${currency}`],
    ]);
    const card = Object.fromEntries(data);
    this.cards.push(card);
  }
  createNewTransaction(
    group,
    cardID,
    transactionID = `${uniqid()}`,
    amount,
    currency,
    date = `${new Date().toISOString().split("T")[0]}`,
    type,
    savingType = "other"
  ) {
    const data = new Map([
      ["group", `${group}`],
      ["cardID", `${cardID}`],
      ["transactionID", `${transactionID}`],
      ["amount", `${amount}`],
      ["currency", `${currency}`],
      ["type", `${type}`],
      ["date", `${date}`],
      ["savingType", `${savingType}`],
    ]);
    const transaction = Object.fromEntries(data);
    this.transactions.push(transaction);
  }
}

//New user from registered user
const curUserEmail = logedInUserEmail;
const curUser = JSON.stringify(localStorage.getItem(curUserEmail));
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
