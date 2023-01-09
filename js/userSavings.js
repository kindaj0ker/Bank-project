"use strict";
//New user from registered user

//let curUser=JSON.parse(localStorage.getItem("logedIn"));

let curUser = JSON.parse(localStorage.getItem("peterJ@gmail.com"));

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
// function createSavingsType(savingsTypes) {
//   savingsTypes.forEach((s) => {
//     const htmlSaving = `<div class="category">
//         <img class="saving-category__img" id="${s}" src="../img/${s}-saving.png"/>
//         <p class="saving-category__name">${s.replace("-", " ")}</p>
//       </div>`;
//     categoriesTypes.insertAdjacentHTML("afterbegin", htmlSaving);
//   });
//   const html = `
//     <div class="show-all-sav--btn toggle-all--sav">
//       <h4 class="show-sav--text">Show all savings</h4>
//     </div>`;
//   categoriesBlock.insertAdjacentHTML("beforeend", html);
//   showAllSavBtn = document.querySelector(".show-all-sav--btn");
//   showAllSavText = document.querySelector(".show-sav--text");
//   showAllSavBtn.addEventListener("click", function () {
//     showAllSavings();
//   });
// }

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
  return sortSavings().forEach((saving) => {
    const type = saving.savingType;
    savingsTypes.add(type);
  });
}
const g = showUserSavTypes();
console.log(g);
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

//Manage savings
const manageSavBtn = document.querySelector(".manage-sav--btn");
const manageTypes = document.querySelectorAll(".manage-sav");
const createSavBtn = document.querySelector(".create-sav--btn h4");
const transferSavBtn = document.querySelector(".transfer-sav--btn h4");
const manageSavBlock = document.querySelector(".manage-sav--wrapper");
const createSavBlock = document.querySelector(".create-sav--block");
const transferSavBlock = document.querySelector(".transfer-sav--block");

manageSavBtn.addEventListener("click", function () {
  manageTypes.forEach((m) => m.classList.toggle("hidden"));
});

//Create/transfer new saving
manageTypes.forEach((t) => {
  t.addEventListener("click", function (e) {
    if (e.target === createSavBtn) {
      categoriesBlock.remove();
      manageSavBlock.classList.add("hidden");
      createSavBlock.classList.remove("hidden");
    }
    if (e.target === transferSavBtn) {
      categoriesBlock.classList.remove("hidden");
      manageSavBlock.classList.add("hidden");
      transferSavBlock.classList.remove("hidden");
    }
  });
});

// Create new saving
const nextNewSavBtn = document.querySelector(".create-sav--btn__continue");
const cancelNewSavBtn = document.querySelector(".create-sav--btn__cancel");
const returnNewSavBtn = document.querySelector(".create-sav--btn__return");
const addNewSavBtn = document.querySelector(".create-sav--btn__add");
const inputNewSavAmount = document.querySelector(".inputField_new_sav");

//Cancel new saving creation
cancelNewSavBtn.addEventListener("click", function () {
  manageTypes.forEach((t) => t.classList.add("hidden"));
  createSavBlock.classList.add("hidden");
  categoriesBlock.classList.remove("hidden");
  manageSavBlock.classList.remove("hidden");
  createSavingsType(savings);
});

//Go back in saving creation

//Next in saving creation

//Check saving amount input field
// function checkNewSavAmount() {
//   const insertedAmount = inputNewSavAmount.value;
// }

//Finish saving creation
