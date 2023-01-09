"use strict";

import { showBalance } from "./userAcc.js";
//New user from registered user

//let curUser=JSON.parse(localStorage.getItem("logedIn"));

let curUser = JSON.parse(localStorage.getItem("peterJ@gmail.com"));

//Sort transactions
export const sortTransactions = function (c) {
  return curUser.transactions.filter((t) => t.cardID === c.id);
};

//Show all user cards
export function showAllUserCards(curUser) {
  const transferBlock = document.querySelector(".transfer-logic");
  transferBlock.innerHTML = "";
  if (curUser.cards.length !== 0) {
    curUser.cards.forEach((c) => {
      let html = `
      <div>
      <h4>Choose a card</h4>
        <div class="card-wrapper">
          <img class="user-card__img transfer-card" src="../img/${c.plan.toUpperCase()}.png" />
        </div>
        <h4>Balance ${showBalance(sortTransactions(c))}</h4>
      </div>`;
      transferBlock.insertAdjacentHTML("afterbegin", html);
    });
    const allCards = document.querySelectorAll(".transfer-card");
    allCards.forEach((c) => c.addEventListener("click"));
  } else {
    let html = `<div>
        <h4>No cards to transfer from. Get a new card to start.</h4>
      </div>`;
    transferBlock.insertAdjacentHTML("afterbegin", html);
  }
}
