"use strict";
import {
  onlyNumbers,
  digitsRestriction,
  checkUserMoney,
} from "./userSavings.js";
import { User } from "./creatUser.js";
import { showBalance } from "./userAcc.js";
import { sortTransactions } from "./userTransfer.js";

//New user from registered user

//let curUser=JSON.parse(localStorage.getItem("logedIn"));

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

const loanForm = document.querySelector(".loan-form");
const loanFieldsWrapper = document.querySelector(".loan-details--wrapper");
const loanAmount = document.querySelector(".inputField_loan");
const loanCurrency = document.querySelector(".loan-currency");
const loanBtnCancel = document.querySelector(".loan--btn__cancel");
const loanBtnRequest = document.querySelector(".loan-btn__request");
const loanBtnTryAgain = document.querySelector(".loan-btn__try-again");
const loanOkBtn = document.querySelector(".loan-okay--btn");
const loanCardsContainer = document.querySelector(".loan-card__selection");
const loanErrorBlock = document.querySelector(".loan--error--block");
const errorNothingSelected = document.querySelector(".loan-no-selected--block");
const errorPositiveAmount = document.querySelector(".loan-positive");
const loanResultsBlock = document.querySelector(".loan-result--msgs");
const errorTooOften = document.querySelector(".often-loan--msg");
const errorMoneyLimit = document.querySelector(".limit-loan--msg");
const loanApproved = document.querySelector(".successful-loan--msg");
const waitingLoanBlock = document.querySelector(".waiting-loan--block");
const loanBtns = document.querySelector(".loan--btns");
const loanTitle = document.querySelector(".request-loan__block h4");

//Sort loans
function sortLoans() {
  return curUser.transactions.filter(function (transaction) {
    return transaction.group === "loan";
  });
}

//Check last loan date
function checkLoanDate() {
  const allLoans = [];
  const comparationDate = 30;
  const today = new Date().getTime();
  sortLoans().forEach((l) => {
    const splitCreationDate = l.date.split("-");
    const creationDate = new Date(
      Number(splitCreationDate[2]) - 4,
      Number(splitCreationDate[1]) - 1,
      splitCreationDate[0]
    );
    const comparedStamp = creationDate.getTime();
    const timeSinceLastLoanCreation =
      (Number(today) - Number(comparedStamp)) / (60 * 60 * 24 * 1000);
    if (timeSinceLastLoanCreation < comparationDate) {
      allLoans.push("false");
    }
  });
  if (allLoans.length === 0) {
    return true;
  } else return false;
}

//Show user cards
function showAllUserSavCards() {
  loanCardsContainer.innerHTML = "";
  if (curUser.cards.length !== 0) {
    curUser.cards.forEach((c) => {
      let html = `
      <div class="cards-in_form__wrapper">
        <div class="card-wrapper">
          <label>
            <input class="cards-types--form" type="radio" id="html" name="new-loan--card" value="${
              c.id
            }"></input>
            <img class="user-card__img" src="../img/${c.plan.toUpperCase()}.png" /></label>
        </div>
        <h4>Balance: ${showBalance(sortTransactions(c))} ${c.currency}</h4>
      </div>`;
      loanCardsContainer.insertAdjacentHTML("afterbegin", html);
    });
  }
}
showAllUserSavCards();

//Check amount input
loanAmount.addEventListener("input", onlyNumbers);
loanAmount.addEventListener("keyup", digitsRestriction);

//Check inputs
let newLoanAmount, newLoanCur, newLoanCard;
function checkInputs() {
  const checked = Array.from(
    document.querySelectorAll('input[name="new-loan--card"]:checked')
  );
  if (loanAmount.value <= 0) {
    loanErrorBlock.classList.remove("hidden");
    errorPositiveAmount.classList.remove("hidden");
    return false;
  }
  if (checked.length === 0) {
    loanErrorBlock.classList.remove("hidden");
    errorNothingSelected.remove("hidden");
    return false;
  } else {
    loanErrorBlock.classList.add("hidden");
    errorNothingSelected.classList.add("hidden");
    errorPositiveAmount.classList.add("hidden");
    newLoanAmount = Number(loanAmount.value);
    newLoanCur = loanCurrency.value;
    newLoanCard = checked[0].value;
    return true;
  }
}

//Approval block
function approvalLogic() {
  if (newLoanAmount > 0.1 * checkUserMoney()) {
    loanResultsBlock.classList.remove("hidden");
    errorMoneyLimit.classList.remove("hidden");
    loanBtnTryAgain.classList.remove("hidden");
    return false;
  }
  if (checkLoanDate() === false) {
    loanResultsBlock.classList.remove("hidden");
    errorTooOften.classList.remove("hidden");
    loanBtns.classList.remove("hidden");
    loanBtnTryAgain.classList.remove("hidden");
    return false;
  } else {
    loanResultsBlock.classList.remove("hidden");
    loanApproved.classList.remove("hidden");
    loanBtnRequest.classList.remove("hidden");
    return true;
  }
}

//Request
loanForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (checkInputs()) {
    loanFieldsWrapper.classList.add("hidden");
    loanTitle.classList.add("hidden");
    loanBtns.classList.add("hidden");
    waitingLoanBlock.classList.remove("hidden");
    setTimeout(function () {
      if (approvalLogic()) {
        curUser.createNewTransaction(
          "loan",
          newLoanCard,
          null,
          newLoanAmount,
          newLoanCur,
          "deposit",
          null,
          null
        );
        localStorage.setItem(curUser.email, JSON.stringify(curUser));
        loanBtnCancel.classList.add("hidden");
        loanBtnTryAgain.classList.add("hidden");
      }
      loanBtnRequest.classList.remove("hidden");
      waitingLoanBlock.classList.add("hidden");
      loanBtnRequest.classList.add("hidden");
      loanForm.reset();
    }, 3000);
  }
});

// Reset form
function resetLoanForm() {
  loanForm.reset();
  loanTitle.classList.remove("hidden");
  loanForm.classList.remove("hidden");
  loanFieldsWrapper.classList.remove("hidden");
  loanBtnCancel.classList.remove("hidden");
  loanBtnTryAgain.classList.remove("hidden");
  loanResultsBlock.classList.add("hidden");
  errorMoneyLimit.classList.add("hidden");
  loanBtnTryAgain.classList.add("hidden");
  errorTooOften.classList.add("hidden");
  loanBtns.classList.remove("hidden");
  loanApproved.classList.add("hidden");
  loanBtnRequest.classList.remove("hidden");
}

//Try again and cancel
loanBtnTryAgain.addEventListener("click", function (e) {
  e.preventDefault();
  resetLoanForm();
});
loanBtnCancel.addEventListener("click", function (e) {
  e.preventDefault();
  resetLoanForm();
});

loanOkBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetLoanForm();
  showAllUserSavCards();
});
