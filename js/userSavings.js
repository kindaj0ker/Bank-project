"use strict";
import { showBalance } from "./userAcc.js";
import { User } from "./creatUser.js";
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
const inputNewSavCurr = document.querySelector(".sav-currency");
const savGoalsWrapper = document.querySelector(".create-sav--goal__wrapper");
const savCardWrapper = document.querySelector(".create-sav--card__wrapper");
const savAmountCurWrapper = document.querySelector(".sav-amount--cur-wrapper");
const savWrappers = document.querySelectorAll("[data-step]");
const newSavGoalsContainer = document.querySelector(
  ".sav-new--goal__selection"
);
const newSavForm = document.querySelector(".create-new--sav__form");
const newSavCardsContainer = document.querySelector(".sav-card__selection");
const userSavNoMoneyError = document.querySelector(".user-sav--error ");
const savErrorBlock = document.querySelector(".sav-error--block");
const nothingSelectedNewSavBlock = document.querySelector(
  ".no-selected--block"
);
const positiveNewSavBlock = document.querySelector(".positive-new--sav");
const notEnoughMoneyBlock = document.querySelector(".not-enough--money");
const successfulSavMsg = document.querySelector(".successful-sav--msg");

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
  newSavGoalsContainer.innerHTML = "";
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
  console.log(c, tr, showBalance(tr));
  return showBalance(tr);
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
  const el = document.querySelector(".total-savings--balance--wrapper");
  if (el) {
    el.remove();
  }
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
let curNewSavStep = 1;

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
      }
      if (e.target === transferSavBtn) {
        categoriesBlock.classList.remove("hidden");
        manageSavBlock.classList.add("hidden");
        transferSavBlock.classList.remove("hidden");
      }
    }
  });
});

//Show content depending on msg
function showContentOnStep() {
  savWrappers.forEach((w) => w.classList.add("hidden"));
  const curEl = Array.from(savWrappers).find(
    (el) => Number(el.dataset.step) === curNewSavStep
  );
  curEl.classList.remove("hidden");
}
// Create new saving

//Cancel new saving creation
cancelNewSavBtn.addEventListener("click", function () {
  curNewSavStep = 1;
  manageTypes.forEach((t) => t.classList.add("hidden"));
  createSavBlock.classList.add("hidden");
  categoriesBlock.classList.remove("hidden");
  manageSavBlock.classList.remove("hidden");
});

// Show all savings goals

// const allSav = document.querySelectorAll(".sav-goal--category");
// allSav.forEach((s) => {
//   s.addEventListener("click", function () {
//     s.children[0].classList.toggle("selected-sav--goal");
//     newSavGoal = s.id.split("-")[0];
//   });
// });

//Check new savings cards
function showAllUserSavCards() {
  if (curUser.cards.length !== 0) {
    curUser.cards.forEach((c) => {
      let html = `
      <div>
        <div class="card-wrapper">
          <label>
            <input type="radio" id="html" name="new-sav--card" value="${
              c.id
            }"></input>
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
  let regex = /[a-zA-Z]/g;
  this.value = this.value.replace(regex, "");
}
inputNewSavAmount.addEventListener("input", onlyNumbers);

inputNewSavAmount.addEventListener("keyup", function () {
  inputNewSavAmount.value = inputNewSavAmount.value.replace(
    /(\.\d{2})\d+/g,
    "$1"
  );
});

//Check user savings balance
let curNewSavCard, curNewSavGoal, curNewSavAmount, curNewSavCurrency;
function checkUserSavBalance(c) {
  cardBalance(c);
}

//Validation savings block
const validationSteps = {
  1: () => {
    const checked = Array.from(
      document.querySelectorAll('input[name="sav-cat"]:checked')
    );
    if (checked.length === 0) {
      savErrorBlock.classList.remove("hidden");
      nothingSelectedNewSavBlock.classList.remove("hidden");
      return false;
    } else {
      console.log("bdnmcx");
      savErrorBlock.classList.add("hidden");
      curNewSavGoal = checked[0].value;
      return true;
    }
  },
  2: () => {
    const checked = Array.from(
      document.querySelectorAll('input[name="new-sav--card"]:checked')
    );
    if (checked.length === 0) {
      savErrorBlock.classList.remove("hidden");
      nothingSelectedNewSavBlock.remove("hidden");
      return false;
    } else {
      savErrorBlock.classList.add("hidden");
      curNewSavCard = checked[0].value;
      return true;
    }
  },
  3: () => {
    addNewSavBtn.classList.remove("hidden");
    if (inputNewSavAmount.value < 0) {
      savErrorBlock.classList.remove("hidden");
      positiveNewSavBlock.classList.remove("hidden");
      return false;
    }
    if (inputNewSavAmount.value > 0) {
      console.log(cardBalance(curNewSavCard), inputNewSavAmount.value);
      if (cardBalance(curNewSavCard) < inputNewSavAmount.value) {
        savErrorBlock.classList.remove("hidden");
        notEnoughMoneyBlock.classList.remove("hidden");
        return false;
      } else {
        savErrorBlock.classList.add("hidden");
        notEnoughMoneyBlock.classList.add("hidden");
        curNewSavAmount = inputNewSavAmount.value;
        curNewSavCurrency = inputNewSavCurr.value;
        return true;
      }
    }
  },
};

//Validation steps funcion
function validationCreateSavSteps() {
  return validationSteps[curNewSavStep]();
}

//Next button
function showNextContent() {
  if (validationCreateSavSteps() === true) {
    curNewSavStep++;
    showContentOnStep();
  }
}

//Go back button
function goBack() {
  curNewSavStep--;
  showContentOnStep();
}
nextNewSavBtn.addEventListener("click", showNextContent);
returnNewSavBtn.addEventListener("click", goBack);

//Submit new saving creation
newSavForm.addEventListener("submit", function (e) {
  e.preventDefault();
  curNewSavStep = "1";
  curUser.createNewTransaction(
    "savings",
    curNewSavCard,
    null,
    curNewSavAmount,
    curNewSavCurrency,
    "withdrawal",
    null,
    curNewSavGoal
  );
  localStorage.setItem(curUser.email, JSON.stringify(curUser));
  successfulSavMsg.classList.remove("hidden");
  setTimeout(function () {
    successfulSavMsg.classList.add("hidden");
    categoriesBlock.classList.remove("hidden");
    manageSavBlock.classList.remove("hidden");
    createSavBlock.classList.add("hidden");
    showAllSavGoals();
    showTotalSavingsBalance();
  }, 3000);
});

// кнопка гоубэк показывается на втором степе ryjgrb
