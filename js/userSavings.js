"use strict";
import { showBalance } from "./userAcc.js";
import { sortTransactions } from "./userTransfer.js";
//New user from registered user

//let curUser=JSON.parse(localStorage.getItem("logedIn"));

let curUser = JSON.parse(localStorage.getItem("peterJ@gmail.com"));

//Manage savings
const manageSavBtn = document.querySelector(".manage-sav--btn");
const manageTypes = document.querySelectorAll(".manage-sav");
const createSavBtn = document.querySelector(".create-sav--btn h4");
const transferSavBtn = document.querySelector(".transfer-sav--btn h4");
const manageSavBlock = document.querySelector(".manage-sav--wrapper");
const createSavBlock = document.querySelector(".create-sav--block");
const transferSavBlock = document.querySelector(".transfer-sav--block");
const nextNewSavBtn = document.querySelector(".create-sav--btn__continue");
const cancelNewSavBtn = document.querySelector(".create-sav--btn__cancel");
const returnNewSavBtn = document.querySelector(".create-sav--btn__return");
const addNewSavBtn = document.querySelector(".create-sav--btn__add");
const inputNewSavAmount = document.querySelector(".inputField_new_sav");
const allNewSavMsg = Array.from(document.querySelectorAll(".new-sav__msg"));
const savGoalsWrapper = document.querySelector(".create-sav--goal__wrapper");
const savCardWrapper = document.querySelector(".create-sav--card__wrapper");
const savAmountCurWrapper = document.querySelector(".sav-amount--cur-wrapper");
const savWrappers = document.querySelectorAll("[data-step]");
const newSavGoalsContainer = document.querySelector(
  ".sav-new--goal__selection"
);
const goalMsg = document.querySelector(".create-sav--goal__msg");
const userCardsMsg = document.querySelector(".choose-sav--card__msg");
const newSavForm = document.querySelector(".create-new--sav__form");
const newSavCardsContainer = document.querySelector(".sav-card__selection");
const userSavNoMoneyError = document.querySelector(".user-sav--error ");
const savErrorBlock = document.querySelector(".sav-error--block");
const nothingSelectedNewSavBlock = document.querySelector(
  ".no-selected--block"
);
const notEnoughMoneyBlock = document.querySelector(".not-enough--money");

const allSavGoalsList = [
  "education",
  "health",
  "real-estate",
  "travel",
  "other",
];

function checkUserMoney() {
  return curUser.transactions.reduce((total, cur) => {
    if (cur.type === "withdrawal") {
      return (total -= Number(cur.amount));
    } else return (total += Number(cur.amount));
  }, 0);
}

//Manage savings
function showAllSavGoals() {
  allSavGoalsList.forEach((s) => {
    const html = `<div class="sav-goal--category" id=${s}-new--goal>
      <label>
      <input type="radio" id="html" name="sav-cat" value="${s}"></input>
      <img class="new-saving--category__img" id="${s}" src="../img/${s}-saving.png"/>
      <p class="saving-category__name">${s.replace("-", " ")}</p></label>
      </div>`;
    newSavGoalsContainer.insertAdjacentHTML("afterbegin", html);
  });
  manageSavBtn.addEventListener("click", function () {
    manageTypes.forEach((m) => m.classList.toggle("hidden"));
  });
}
showAllSavGoals();

function htmlSaving(s) {
  return `<div class="transaction">
        <img class="oper-group__img" src="../img/${s.savingType}-saving.png"/>
        <div class="transaction-name--date__block">
              <span class="transaction--name">${s.savingType}</span>
              <span class="transaction--date">Today</span>
            </div>
            <div class="transaction-amount">
              <span class="transaction-currency">${s.currency}</span>
              <span class="transaction--amount">${s.amount}</span>
        </div>`;
}
// Sort savings
function sortSavings() {
  return curUser.transactions.filter(function (transaction) {
    return transaction.group === "savings";
  });
}
//Card balance
function cardBalance(c) {
  const tr = curUser.transactions.filter(function (transaction) {
    return transaction.cardID === c;
  });
  console.log(tr);
  showBalance(tr);
}

//Create savings in user interface
let showAllSavBtn, showAllSavText;
const categoriesBlock = document.querySelector(".categories-block");
const categoriesTypes = document.querySelector(".all-savings--categories");
function createSavingsType(savingsTypes) {
  savingsTypes.forEach((s) => {
    const htmlSaving = `<div class="category">
        <img class="saving-category__img" id="${s}" src="../img/${s}-saving.png"/>
        <p class="saving-category__name">${s.replace("-", " ")}</p>
      </div>`;
    categoriesTypes.insertAdjacentHTML("afterbegin", htmlSaving);
  });
  const html = `
    <div class="show-all-sav--btn toggle-all--sav">
      <h4 class="show-sav--text">Show all savings</h4>
    </div>`;
  categoriesBlock.insertAdjacentHTML("beforeend", html);
  showAllSavBtn = document.querySelector(".show-all-sav--btn");
  showAllSavText = document.querySelector(".show-sav--text");
  showAllSavBtn.addEventListener("click", function () {
    showAllSavings();
  });
}

//Show total balance
export function showTotalSavingsBalance() {
  const totalSavSum = sortSavings().reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  const html = `<div class="total-savings--balance--wrapper"> <h4 class="total-savings--balance">Total:${totalSavSum} <span class="orange-text">saved</h4>
    </div>`;
  categoriesBlock.insertAdjacentHTML("afterbegin", html);
}

//Show savings
const savingsBlock = document.querySelector(".savings-block");

//Show user savings types
function showUserSavTypes() {
  let savingsTypes = new Set();
  sortSavings().forEach((saving) => {
    const type = saving.savingType;
    savingsTypes.add(type);
  });
  return [...savingsTypes];
}

function showSavings() {
  const savingsTypes = showUserSavTypes();
  createSavingsType(savingsTypes);
  showTotalSavingsBalance();
}
showSavings();

//Show all savings
function showAllSavings() {
  if (showAllSavBtn.classList.contains("toggle-all--sav")) {
    showAllSavBtn.classList.remove("toggle-all--sav");
    savingsRevealingBlock.innerHTML = "";
    showAllSavText.innerHTML = "Hide all savings";
    sortSavings().forEach((s) => {
      savingsRevealingBlock.insertAdjacentHTML("beforeend", htmlSaving(s));
    });
  } else {
    showAllSavBtn.classList.add("toggle-all--sav");
    savingsRevealingBlock.innerHTML = "";
    showAllSavText.innerHTML = "Show all savings";
  }
}

//Reveal savings
const savingsRevealingBlock = document.getElementById("savings-transactions");
function revealSavings(e) {
  const curSavingsType = e.target.id;
  savingsRevealingBlock.innerHTML = "";

  //Show balance
  let balance = 0;
  let currencySaving = "";
  sortSavings(savings).forEach((s) => {
    if (s.savingType === curSavingsType) {
      const html = htmlSaving(s);
      savingsRevealingBlock.insertAdjacentHTML("beforeend", html);
      balance += +s.amount;
      currencySaving = s.currency;
    }
  });

  const balanceHtml = `
        <div class="saving-balance--wrapper">
            <h5 class="saving-balance">Balance:${balance} ${currencySaving}</h5>
        </div>`;
  savingsRevealingBlock.insertAdjacentHTML("afterbegin", balanceHtml);
}

const savingTypeBtn = document.querySelectorAll(".saving-category__img");
savingTypeBtn.forEach((btn) => btn.addEventListener("click", revealSavings));

//Create/transfer new saving
let curStep = 1;

manageTypes.forEach((t) => {
  t.addEventListener("click", function (e) {
    savingsRevealingBlock.innerHTML = "";
    if (checkUserMoney() < 0) {
      userSavNoMoneyError.classList.remove("hidden");
    } else {
      if (e.target === createSavBtn) {
        categoriesBlock.classList.add("hidden");
        manageSavBlock.classList.add("hidden");
        createSavBlock.classList.remove("hidden");
        // const msgEl = allNewSavMsg.find(
        //   (el) => el.classList.contains("hidden") !== "false"
        // );
        // msg = msgEl.dataset.msg;
        // console.log(msg);
        showContentOnMsg(msg);
      }
      if (e.target === transferSavBtn) {
        categoriesBlock.classList.remove("hidden");
        manageSavBlock.classList.add("hidden");
        transferSavBlock.classList.remove("hidden");
      }
    }
  });
});

// Create new saving

//Cancel new saving creation
cancelNewSavBtn.addEventListener("click", function () {
  manageTypes.forEach((t) => t.classList.add("hidden"));
  createSavBlock.classList.add("hidden");
  categoriesBlock.classList.remove("hidden");
  manageSavBlock.classList.remove("hidden");
});

//Show content depending on msg
function showContentOnStep() {
  savWrappers.forEach(
    (w) => w.classList.contains("hidden") ?? w.classList.add("hidden")
  );
  const curEl = savWrappers.find((el) => el.dataset.step === curStep);
  curEl.classList.remove("hidden");
}
let newSavGoal;

// Show all savings goals

const allSav = document.querySelectorAll(".sav-goal--category");
allSav.forEach((s) => {
  s.addEventListener("click", function () {
    s.children[0].classList.toggle("selected-sav--goal");
    newSavGoal = s.id.split("-")[0];
    console.log(newSavGoal);
  });
});

//Check new savings goals
//Check new savings cards
function showAllUserSavCards() {
  if (curUser.cards.length !== 0) {
    curUser.cards.forEach((c) => {
      let html = `
      <div>
        <div class="card-wrapper">
          <label>
            <input type="radio" id="html" name="new-sav--card" value="${c}"></input>
            <img class="user-card__img" src="../img/${c.plan.toUpperCase()}.png" /></label>
        </div>
        <h4>Balance ${showBalance(sortTransactions(c))}</h4>
      </div>`;
      newSavCardsContainer.insertAdjacentHTML("afterbegin", html);
    });
  }
}
showAllUserSavCards();

//Check new savings input
function onlyNumbers() {
  let regex = /a-zA-Z/g;
  this.value = this.value.replace(regex, "");
}
inputNewSavAmount.addEventListener("input", onlyNumbers);

//Check user savings balance
let curNewSavCard, curNewSavGoal, curNewSavAmount, curNewSavCurrency;
function checkUserSavBalance(c) {
  cardBalance(c);
}

//Validation savings block
const validationSteps = {
  1: () => {
    const checked = document.querySelector(
      'input[name="sav-cat"]:checked'
    ).value;
    if (checked === null) {
      savErrorBlock.classList.remove("hidden");
      nothingSelectedNewSavBlock.remove("hidden");
    }
  },
  2: () => {
    const checked = document.querySelector(
      'input[name="new-sav--card"]:checked'
    ).value;
    if (checked === null) {
      savErrorBlock.classList.remove("hidden");
      nothingSelectedNewSavBlock.remove("hidden");
    }
  },
  3: (c) => {
    if (inputNewSavAmount.value < 0) return false;
    if (inputNewSavAmount.value > 0) {
      if (cardBalance(c) < inputNewSavAmount.value) {
        savErrorBlock.classList.remove("hidden");
        notEnoughMoneyBlock.classList.remove("hidden");
        return false;
      } else return true;
    }
  },
};

//Validation steps funcion
function validationCreateSavSteps(curStep) {
  validationSteps[curStep]();
}

const currentStep = 4;
validationSteps[currentStep]();
//Next button
function showNextContent() {
  validationCreateSavSteps(curStep);
  curStep++;
}

//Go back button
function goBack() {
  validationCreateSavSteps(curStep);
  curStep--;
}
nextNewSavBtn.addEventListener("click", showNextContent);
returnNewSavBtn.addEventListener("click", goBack);
