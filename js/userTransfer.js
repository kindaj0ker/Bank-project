"use strict";

import { showBalance } from "./userAcc.js";
//New user from registered user

//let curUser=JSON.parse(localStorage.getItem("logedIn"));

let curUser = JSON.parse(localStorage.getItem("peterJ@gmail.com"));

const transferBlock = document.getElementById("transfer");

//Sort transactions
const sortTransfer = function (c) {
  return curUser.transactions.filter(function (transaction) {
    return transaction.cardID === c;
  });
};

//Show all user cards
export function showAllUserCards() {
  curUser.cards.forEach((c) => {
    const html = `
      <div>
        <div class="card-wrapper">
          <img class="user-card__img" src="../img/${c.plan.toUpperCase()}" />
        </div>
        <h4>Balance ${showBalance(sortTransfer(c))}</h4>
      </div>`;
  });
}
