"use strict";
import { User } from "./creatUser.js";
import { showBalance } from "./userAcc.js";
import { onlyNumbers, digitsRestriction, cardBalance } from "./userSavings.js";

const transferTitle = document.querySelector(".transfer-title");
const transferMoneyForm = document.querySelector(".transfer-form");
const transferFieldsWrapper = document.querySelector(
  ".transfer-details--wrapper"
);
const transferMoneyBlocks = document.querySelectorAll("[data-transfer]");
const transferToId = document.querySelector(".inputField_id-card--transfer");
const transferAmount = document.querySelector(".inputField_transfer");
const transferCurrency = document.querySelector(".transfer-currency");
const transferBtnCancel = document.querySelector(".transfer--btn__cancel");
const transferBtnTransfer = document.querySelector(".transfer--btn__transfer");
const transferBtnContinue = document.querySelector(".transfer--btn__continue");
const transferBtnReturn = document.querySelector(".transfer--btn__return");
const transferBtnTryAgain = document.querySelector(".transfer-btn__try-again");
const transferOkBtn = document.querySelector(".transfer-okay--btn");
const transferCardsContainer = document.querySelector(
  ".transfer-money--card__selection"
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

let transferMoneyAmount,
  transferMoneyCur,
  transferMoneyFrom,
  transferMoneyTo,
  receiverAcc;
let curTransferMoneyStep = 1;

//New user from registered user

//let curUser=JSON.parse(localStorage.getItem("logedIn"));

// let curUser = JSON.parse(localStorage.getItem("peterJ@gmail.com"));
let { fName, lName, bDay, email, password, cards, transactions, location } =
  JSON.parse(localStorage.getItem("peterJ@gmail.com"));
const curUser = new User(
  fName,
  lName,
  bDay,
  email,
  password,
  cards,
  transactions,
  location
);

//Input amount check
transferAmount.addEventListener("input", onlyNumbers);
transferAmount.addEventListener("keyup", digitsRestriction);

//Sort transactions
export function sortTransactions(c) {
  return curUser.transactions.filter((t) => t.cardID === c.id);
}

//Show all user cards
export function showAllUserTransferCards() {
  transferCardsContainer.innerHTML = "";
  if (curUser.cards.length !== 0) {
    curUser.cards.forEach((c) => {
      let html = `
      <div class="cards-in_form__wrapper">
        <div class="card-wrapper">
          <label>
            <input class="cards-types--form" type="radio" value="${
              c.id
            }" name="transfer-money--card"></input>
            <img class="user-card__img" src="../img/${c.plan.toUpperCase()}.png" /></label>
        </div>
        <h4>Balance ${showBalance(sortTransactions(c))}</h4>
      </div>`;
      transferCardsContainer.insertAdjacentHTML("afterbegin", html);
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
    receiverAcc = localStorage.getItem(input);
    if (input === null) {
      transferErrorBlock.classList.remove("hidden");
      transferErrorNothingSelected.classList.remove("hidden");
      return false;
    } else {
      if (receiverAcc === null) {
        transferErrorBlock.classList.remove("hidden");
        noUserError.classList.remove("hidden");
        return false;
      }
      if (receiverAcc !== null) {
        transferErrorBlock.classList.add("hidden");
        noUserError.classList.add("hidden");
        transferErrorNothingSelected.classList.add("hidden");
        transferBtnTransfer.classList.remove("hidden");
        transferBtnReturn.classList.remove("hidden");
        transferBtnContinue.classList.add("hidden");
        transferMoneyTo = input;
        return true;
      }
    }
  },
  2: () => {
    const checkedCard = Array.from(
      document.querySelectorAll('input[name="transfer-money--card"]:checked')
    );
    const inputAmount = Number(transferAmount.value);
    if (checkedCard.length === 0) {
      transferErrorBlock.classList.remove("hidden");
      transferErrorNothingSelected.classList.remove("hidden");
      return false;
    }
    if (inputAmount === "") {
      transferErrorBlock.classList.add("hidden");
      transferErrorNothingSelected.classList.add("hidden");
      return false;
    }
    if (inputAmount > cardBalance(checkedCard[0].value)) {
      transferErrorBlock.classList.remove("hidden");
      transferNotEnoughMoney.classList.remove("hidden");
      return false;
    }
    if (inputAmount < 0) {
      transferErrorBlock.classList.remove("hidden");
      transferErrorPositiveAmount.classList.remove("hidden");
      return false;
    } else {
      transferTitle.classList.add("hidden");
      transferErrorBlock.classList.add("hidden");
      transferErrorNothingSelected.classList.add("hidden");
      transferErrorPositiveAmount.classList.add("hidden");
      transferNotEnoughMoney.classList.add("hidden");
      transferMoneyAmount = inputAmount;
      transferMoneyCur = transferCurrency.value;
      transferMoneyFrom = checkedCard[0].value;
      console.log(checkedCard, transferMoneyFrom);
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
  const curEl = Array.from(transferMoneyBlocks).find(
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
  if (curTransferMoneyStep === 1) {
    transferBtnContinue.classList.remove("hidden");
    transferBtnReturn.classList.add("hidden");
    transferBtnTransfer.classList.add("hidden");
  }
  showTransferFields();
}
transferBtnCancel.addEventListener("click", function () {
  if (curTransferMoneyStep === 1) {
    transferBtnContinue.classList.remove("hidden");
    transferBtnReturn.classList.add("hidden");
    transferBtnTransfer.classList.add("hidden");
  }
  transferMoneyForm.reset();
});
transferBtnContinue.addEventListener("click", nextTransfField);
transferBtnReturn.addEventListener("click", prevTransfField);

// Submit form
transferMoneyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateMoneyTransfer() === true) {
    curTransferMoneyStep = 1;
    transferMoneyForm.classList.add("hidden");
    transferMoneyForm.reset();
    waitingTransferBlock.classList.remove("hidden");
    let { fName, lName, bDay, email, password, cards, transactions, location } =
      JSON.parse(localStorage.getItem(transferMoneyTo));
    const recepient = new User(
      fName,
      lName,
      bDay,
      email,
      password,
      cards,
      transactions,
      location
    );
    recepient.createNewTransaction(
      "recieve",
      cards[0].id,
      null,
      transferMoneyAmount,
      transferMoneyCur,
      "deposit",
      null,
      null
    );
    localStorage.setItem(recepient.email, JSON.stringify(recepient));
    curUser.createNewTransaction(
      "send",
      transferMoneyFrom,
      null,
      transferMoneyAmount,
      transferMoneyCur,
      "withdrawal",
      null,
      null
    );
    localStorage.setItem(curUser.email, JSON.stringify(curUser));
    setTimeout(function () {
      transferBtnTransfer.classList.add("hidden");
      transferResultsBlock.classList.remove("hidden");
      transferApproved.classList.remove("hidden");
      waitingTransferBlock.classList.add("hidden");
      transferBtnReturn.classList.add("hidden");
      setTimeout(function () {
        transferBtnContinue.classList.remove("hidden");
        transferMoneyForm.classList.remove("hidden");
        transferResultsBlock.classList.add("hidden");
        transferApproved.classList.add("hidden");
        transferTitle.classList.remove("hidden");
        showTransferFields();
        showAllUserTransferCards();
      }, 3000);
    }, 3000);
  }
});
