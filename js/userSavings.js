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
const allSavGoals = document.querySelector(".sav-selection--fields");
const newSavGoalsContainer = document.querySelector(
  ".sav-new--goal__selection"
);
const goalMsg = document.querySelector(".create-sav--goal__msg");
const userCardsMsg = document.querySelector(".choose-sav--card__msg");
const newSavForm = document.querySelector(".create-new--sav__form");
const newSavCardsContainer = document.querySelector(".sav-card__selection");
const userSavNoMoneyError = document.querySelector(".user-sav--error ");
const savErrorBlock = document.querySelector(".sav-error--block");

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
        <img class="new-saving--category__img" id="${s}" src="../img/${s}-saving.png"/>
        <p class="saving-category__name">${s.replace("-", " ")}</p>
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
        allSavGoals.classList.remove("hidden");
        const msgEl = allNewSavMsg.find(
          (el) => el.classList.contains("hidden") !== "false"
        );
        const msg = msgEl.dataset.msg;
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
function showContentOnMsg(msg) {
  if (msg === "1") {
    newSavCardsContainer.classList.toggle("hidden");
    newSavForm.classList.toggle("hidden");
    userCardsMsg.classList.toggle("hidden");
  }
  if (msg === "2") {
    newSavCardsContainer.classList.remove("hidden");
    newSavGoalsContainer.classList.add("hidden");
    newSavForm.classList.add("hidden");
    goalMsg.classList.add("hidden");
    userCardsMsg.classList.remove("hidden");
  }
  if (msg === "3") {
    newSavForm.classList.remove("hidden");
    newSavCardsContainer.classList.add("hidden");
    newSavGoalsContainer.classList.add("hidden");
    userCardsMsg.classList.add("hidden");
  }
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

//Next button
function showNextContent(msg) {
  msg++;
}

//Go back button
function goBack(msg) {
  msg--;
}

function showAllUserCards() {
  if (curUser.cards.length !== 0) {
    curUser.cards.forEach((c) => {
      let html = `
      <div>
        <div class="card-wrapper">
          <img class="user-card__img" src="../img/${c.plan.toUpperCase()}.png" />
        </div>
        <h4>Balance ${showBalance(sortTransactions(c))}</h4>
      </div>`;
      newSavCardsContainer.insertAdjacentHTML("afterbegin", html);
    });
  }
}
showAllUserCards();

//Check user input
const onlyNumbers = function () {
  let regex = /a-zA-Z/g;
  this.value = this.value.replace(regex, "");
};
inputNewSavAmount.addEventListener("input", onlyNumbers);

// function showSavMsg(msg) {
//   if (msg.dataset.msg === "sav-goal--msg")
//     const allSavGoals = document.querySelectorAll(".sav-goal--category");
//     allGoals.forEach((g) => {
//       g.addEventListener("click", function () {
//         newSavGoal = e.target.id.split("-")[0];
//       });
//     });
//   }
// }
//Go back in saving creation
// returnNewSavBtn.addEventListener("click", function () {});
//Next in saving creation

//Check saving amount input field
// function checkNewSavAmount() {
//   const insertedAmount = inputNewSavAmount.value;
// }

//Finish saving creation
