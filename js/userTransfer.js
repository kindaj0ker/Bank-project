"use strict";
import { showBalance } from "./userAcc.js";
import { onlyNumbers, digitsRestriction } from "./userSavings.js";

const transferBlock = document.querySelector(".transfer-logic");
const transferForm = document.querySelector(".transfer-form");
const transferFieldsWrapper = document.querySelector(
  ".transfer-details--wrapper"
);
const transferMoneyBlocks = document.querySelectorAll("[data-transfer]");
const transferToId = document.querySelector(".inputField_id-card--transfer");
const transferAmount = document.querySelector(".inputField_transfer");
const transferCurrency = document.querySelector(".transfer-currency");
const transferBtnCancel = document.querySelector(".transfer--btn__cancel");
const transferBtnRequest = document.querySelector(".transfer-btn__request");
const transferBtnContinue = document.querySelector(".transfer--btn__continue");
const transferBtnReturn = document.querySelector(".transfer--btn__return");
const transferBtnTryAgain = document.querySelector(".transfer-btn__try-again");
const transferOkBtn = document.querySelector(".transfer-okay--btn");
const transferCardsContainer = document.querySelector(
  ".transfer-card__selection"
);
const transferErrorBlock = document.querySelector(".transfer--error--block");
const transferErrorNothingSelected = document.querySelector(
  ".transfer-no-selected--block"
);
const noUserError = document.querySelector(".no-user");
const transferErrorPositiveAmount =
  document.querySelector(".transfer-positive");
const transferNotEnoughMoney = document.querySelector(
  ".transfer-not--enough_money"
);
const transferResultsBlock = document.querySelector(".transfer-result--msgs");
const transferErrorMoneyLimit = document.querySelector(".limit-transfer--msg");
const transferApproved = document.querySelector(".successful-transfer--msg");
const waitingTransferBlock = document.querySelector(".waiting-transfer--block");
const transferBtns = document.querySelector(".transfer--btns");

let transferMoneyAmount, transferMoneyCur, transferMoneyFrom, transferMoneyTo;
let curTransferMoneyStep = 1;

//New user from registered user

//let curUser=JSON.parse(localStorage.getItem("logedIn"));

let curUser = JSON.parse(localStorage.getItem("peterJ@gmail.com"));

//Input amount check
transferAmount.addEventListener("input", onlyNumbers);
transferAmount.addEventListener("keyup", digitsRestriction);

//Sort transactions
export function sortTransactions(c) {
  return curUser.transactions.filter((t) => t.cardID === c.id);
}
function checkCardBalance(c) {
  return c.transactions.reduce((total, cur) => {
    if (cur.type === "withdrawal") {
      return (total -= Number(cur.amount));
    } else return (total += Number(cur.amount));
  }, 0);
}
//Show all user cards
export function showAllUserTransferCards() {
  transferBlock.innerHTML = "";
  if (curUser.cards.length !== 0) {
    curUser.cards.forEach((c) => {
      let html = `
      <div>
        <div class="card-wrapper">
          <label>
            <input type="radio" id="html" name="transfer-card" value="${
              c.id
            }"></input>
            <img class="user-card__img" src="../img/${c.plan.toUpperCase()}.png" /></label>
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
    transferCardsContainer.insertAdjacentHTML("afterbegin", html);
  }
}

//Validate transfer fields
const validationTransfer = {
  1: () => {
    const input = transferToId.value;
    if (input === null) {
      transferErrorBlock.classList.remove("hidden");
      transferErrorNothingSelected.classList.remove("hidden");
      return false;
    } else {
      if (localStorage.getItem("input") === null) {
        transferErrorBlock.classList.remove("hidden");
        noUserError.classList.remove("hidden");
        return false;
      }
      if (localStorage.getItem("input") !== null) {
        transferErrorBlock.classList.add("hidden");
        noUserError.classList.add("hidden");
        transferErrorNothingSelected.classList.add("hidden");
        transferMoneyTo = input;
        return true;
      }
    }
  },
  2: () => {
    const checkedCard = Array.from(
      document.querySelectorAll('input[class="transfer-card"]:checked')
    );
    const inputAmount = Number(transferAmount.value);
    if (checkedCard.length === 0) {
      transferErrorBlock.classList.remove("hidden");
      transferErrorNothingSelected.classList.remove("hidden");
      return false;
    }
    if (inputAmount > checkCardBalance(checkedCard)) {
      transferErrorBlock.classList.remove("hidden");
      transferNotEnoughMoney.classList.remove("hidden");
      return false;
    }
    if (inputAmount < 0) {
      transferErrorBlock.classList.remove("hidden");
      transferErrorPositiveAmount.classList.remove("hidden");
      return false;
    } else {
      transferErrorBlock.classList.add("hidden");
      transferErrorNothingSelected.classList.add("hidden");
      transferErrorPositiveAmount.classList.add("hidden");
      transferNotEoughMoney.classList.add("hidden");
      transferMoneyAmount = inputAmount;
      transferMoneyCur = transferCurrency;
      transferMoneyFrom = checkedCard.id;
      return true;
    }
  },
};

//Validate transfer steps
function validateMoneyTransfer() {
  return validationTransfer[curTransferMoneyStep]();
}

// Show content on different steps
function showTransferFields() {
  transferMoneyBlocks.forEach((b) => b.classList.add("hidden"));
  const curEl = Array.from(transferMoneyBlock).find(
    (el) => Number(el.dataset.transfer) === curTransferMoneyStep
  );
  curEl.classList.remove("hidden");
}

//Go forwards
function nextTransfField() {
  if (validateMoneyTransfer() === true) {
    curTransferMoneyStep++;
    showTransferFields();
  }
}
//Go backwards
function prevTransfField() {
  curTransferMoneyStep--;
  showTransferFields();
}

transferBtnContinue.addEventListener("click", nextTransfField);
transferBtnReturn.addEventListener("click", prevTransfField);

//Submit form
// transferForm.addEventListener("sumbit", function (e) {
//   e.preventDefault();
//   transferForm.classList.add("hidden");
// })
