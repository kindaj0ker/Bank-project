"use strict";
import { showTotalSavingsBalance } from "./userSavings.js";
import { showAllUserCards } from "./userTransfer.js";
const uniqid = new ShortUniqueId();

//New user from registered user

//let curUser=JSON.parse(localStorage.getItem("logedIn"));

let curUser = JSON.parse(localStorage.getItem("peterJ@gmail.com"));
//Select main elements

const timerBlock = document.querySelector(".timer");
const contentSpace = document.querySelector(".content-space");
const allContentFillers = document.querySelectorAll(".content-filler");
const cardsZone = document.querySelector(".user-cards__zone");
let timer;

//Init page

if (timer) clearInterval(timer);
countDownTimerFunc();

//Highlight main page
const home = document.getElementById("menu-home");
home.classList.add("menu-highlighted");
home.parentElement.classList.add("highlighted");

//Highlighted menu
const allMenu = Array.from(document.getElementsByClassName("user-menu--li"));
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("user-menu--li")) {
    allMenu.forEach((m) => {
      if (
        m.classList.contains("menu-highlighted") &&
        m.parentElement.classList.contains("highlighted")
      ) {
        m.classList.toggle("menu-highlighted");
        m.parentElement.classList.toggle("highlighted");
      }
      e.target.parentElement.classList.add("highlighted");
      e.target.classList.add("menu-highlighted");
    });
    showContent();
  }
});

showContent();

//Show html depends on current menu selection

function showContent() {
  allMenu.forEach((m) => {
    if (m.classList.contains("menu-highlighted")) {
      const curId = m.id.split("-")[1];
      const curMenu = "#" + curId;
      const curContentFiller = document.querySelector(curMenu);
      allContentFillers.forEach((content) => {
        if (!content.classList.contains("hidden")) {
          content.classList.add("hidden");
        } else return;
      });
      curContentFiller.classList.remove("hidden");
      if (curId === "home") {
        revealHome();
      }
      if (curId === "savings") {
        createSavingsType();
      }
      if (curId === "transfer") {
        showAllUserCards();
      }
    } else return;
  });
}

//Reveal main content functions

function revealHome() {
  revealCards(curUser);
}
function revealLoan() {}
function revealSavingsBlock() {
  revealSavings(e);
}
function revealTransfer() {}

//Header greeting
const userFname = document.querySelector(".user-f--name");
window.addEventListener("DOMContentLoaded", function () {
  userFname.textContent = `${curUser.fName}`;
});

//Show Balance
export function showBalance(transactions) {
  return transactions.reduce((total, cur) => {
    if (cur.type === "withdrawal") {
      return (total -= Number(cur.amount));
    } else return (total += Number(cur.amount));
  }, 0);
}

//Reveal cards
function revealCards(curUser) {
  //Show balance of every card
  curUser.cards.forEach((card) => {
    const curId = card.id;
    const curCardTrans = curUser.transactions.filter((t) => t.cardID === curId);
    const balance = showBalance(curCardTrans);
    const cardHtml = `
    <div class="total-card__info">
      <div class="user-card" id=${card.id}>
        <div class="card-wrapper">
          <img class="user-card__img" src="../img/${card.plan.toUpperCase()}.png" />
        </div>
        <div class="card-info__block">
          <p class="card-number">#1 card</p>
          <p class="card-plan">${card.plan.toUpperCase()} plan</p>
          <p class="expiry-date">expired by ${card.expired}</p>
          <p class="transactions-init">Show transactions↓</p>
        </div>
        <div class="balance-info__block">
          <h3>Balance</h3>
          <p class="balance">${balance + " " + card.currency}</p>
        </div>
      </div>
    </div>`;
    cardsZone.insertAdjacentHTML("afterbegin", cardHtml);
  });
}

//Sort transactions
const sortTransactions = function (curCard) {
  return curUser.transactions.filter(function (transaction) {
    return transaction.cardID === curCard;
  });
};

//Reveal card transactions block
function revealTransactions(transactions, curTarget, curCard) {
  const cardTransactionsContainer = curTarget.closest(".total-card__info");
  if (sortTransactions(curCard.id).length === 0) {
    const noTransBlock = `<div class="no-transactions__block">
        <p class="no-transactions__p"> No transactions found</p>
      </div>`;
    cardTransactionsContainer.insertAdjacentHTML("beforeend", noTransBlock);
  } else {
    const transastions = `<div class="sorting-box">
      <div>
        <input class="radio" type="radio" id="all" name="trans" value="all" checked/>
        <label for="trans">All transactions</label>
      </div>
      <div>
        <input class="radio" type="radio" id="withdrawal" name="trans" value="withdrawals" />
        <label for="trans">Withdrawals</label>
      </div>
      <div>
        <input class="radio" type="radio" id="deposit" name="trans" value="deposits"/>
        <label for="trans">Deposits</label>
      </div>
    </div>
    <div class="transactions">
    </div>`;

    cardTransactionsContainer.insertAdjacentHTML("beforeEnd", transastions);
    const cardTransactionsBlock =
      cardTransactionsContainer.querySelector(".transactions");
    transactions.forEach((t) => {
      const htmlString = `<div class="transaction ${t.type}">
            <span class="transaction-group">
              <img class="oper-group__img" src="../img/${t.group}.png" />
            </span>
            <div class="transaction-name--date__block">
              <span class="transaction--name">AMAZON</span>
              <span class="transaction--date">Today</span>
            </div>
            <div class="transaction-amount">
              <span class="transaction-currency">${t.currency}</span>
              <span class="transaction--amount">${t.amount}</span>
            </div>
          </div>`;
      cardTransactionsBlock.insertAdjacentHTML("beforeend", htmlString);
    });
  }
}

// Show/close transactions block
const openTransactions = document.addEventListener("click", function (e) {
  const curTarget = e.target;
  const curCard = curTarget.closest(".user-card");
  if (curTarget.classList.contains("transactions-init")) {
    //Toggle open class to define that transactions info is open
    curCard.classList.toggle("open");
    const closeTransactions = curTarget.closest(".transactions-init");
    if (curCard.classList.contains("open")) {
      //Change text to close transactions
      closeTransactions.textContent = "Close transactions information ↑";

      //Add transactions info
      const curCardID = curCard.id;
      sortTransactions(curCardID);
      revealTransactions(curUser.transactions, curTarget, curCard);
      const radioBtns = document.getElementsByName("trans");
      radioBtns.forEach((btn) =>
        btn.addEventListener("change", function () {
          sortingTrans(curTarget, curCard, btn);
        })
      );
    } else {
      //Close block
      closeTransactions.textContent = "Show transactions↓";
      deletePrevInfo(curTarget, curCard);
    }
  }
});

//Delete prev transactions info
const deletePrevInfo = function (curTarget, curCard) {
  const transactionsBlock = curTarget.closest(".total-card__info");
  const transactions = transactionsBlock.querySelector(".transactions");
  if (sortTransactions(curCard.id).length === 0) {
    const noTransactions = document.querySelector(".no-transactions__block");
    transactionsBlock.removeChild(noTransactions);
  } else {
    const radioBtns = transactionsBlock.querySelector(".sorting-box");
    transactionsBlock.removeChild(transactions);
    transactionsBlock.removeChild(radioBtns);
  }
};

//Sorting functions
const sortingTrans = function (curTarget, curCard, btn) {
  if (btn.checked === true && !(btn.id === "all")) {
    const type = btn.id;
    deletePrevInfo(curTarget);
    showSortedOperations(curTarget, curCard, type);
  }
};

//Show sorted operations
const showSortedOperations = function (curTarget, curCard, type) {
  const transactions = curUser.transactions.filter(function (t) {
    return t.cardID === curCard.id && t.type === type;
  });
  revealTransactions(transactions, curTarget);
};

//Create new card
const getNewCardBtn = document.querySelector(".creation");
getNewCardBtn.addEventListener("click", function () {
  const creationBlock = document.querySelector(".creation");
  creationBlock.classList.add("hidden");
  const choosePlan = document.querySelector(".register-form");
  choosePlan.classList.remove("hidden");
});
const getCardBtn = document.querySelector(".register-form");
getCardBtn.addEventListener("submit", function (e) {
  e.preventDefault();
  const plan = document.querySelector(".plan").value;
  curUser.cards.push(plan);
  updateCardsContainer(curUser);
});

//Update cards container
const updateCardsContainer = function (curUser) {
  cardsZone.innerHTML = "";
  revealCards(curUser);
};
// Reveal Savings
// Sort savings
const sortSavings = function () {
  return curUser.transactions.filter(function (transaction) {
    return transaction.group === "savings";
  });
};

//Create savings in user interface
const categoriesSavingsBlock = document.querySelector(".categories-block");
function createSavingsType(savings) {
  savings.forEach((s) => {
    const html = `<div class="category">
        <img class="saving-category__img" id="${s}" src="../img/${s}-saving.png"/>
        <p class="saving-category__name">${s.replace("-", " ")}</p>
      </div>`;
    categoriesSavingsBlock.insertAdjacentHTML("afterbegin", html);
  });
}

//Show savings
const savingsBlock = document.querySelector(".savings-block");
function showSavings() {
  const savingsTypes = new Set();
  sortSavings().forEach((saving) => {
    const type = saving.savingType;
    savingsTypes.add(type);
  });
  createSavingsType(savingsTypes);
}

//Reveal savings
const savingsRevealingBlock = document.getElementById("savings-block");
function revealSavings(e) {
  const curSavingsType = e.target.id;
  savingsRevealingBlock.innerHTML = "";
  //show balance
  let balance = 0;
  let currencySaving = "";
  sortSavings().forEach((s) => {
    if (s.savingType === curSavingsType) {
      const html = `<div class="transaction">
        <img class="oper-group__img" src="../img/${s.savingType}-saving.png"/>
        <div class="transaction-name--date__block">
          <span class="transaction--name">${s.savingType}</span>
          <span class="transaction--date">Today</span>
            </div>
        <div class="transaction-amount">
          <span class="transaction-currency">${s.currency}</span>
          <span class="transaction--amount">${s.amount}</span>
        </div>`;
      savingsRevealingBlock.insertAdjacentHTML("beforeend", html);
      balance += +s.amount;
      currencySaving = s.currency;
    }
  });
  const balanceHtml = `
        <div class="saving-balance">
            <h5>Balance:${balance} ${currencySaving} </h5>
        </div>`;
  savingsRevealingBlock.insertAdjacentHTML("afterbegin", balanceHtml);
}
const savingTypeBtn = document.querySelectorAll(".saving-category__img");
savingTypeBtn.forEach((btn) => btn.addEventListener("click", revealSavings));

//Check input info
// const loanAmountInput = document.querySelector(".inputField_loan");
// const onlyNumbers = function () {
//   let regex = /[A-Za-z]/g;
//   this.value = this.value.replace(regex, "");
// };

// loanAmountInput.addEventListener("input", onlyPositiveNumbers);

//Request a loan
const nextFieldBtn = document.querySelector(".loan-form");
const fieldsWrapper = document.querySelector(".amount-loan__info");
nextFieldBtn.addEventListener("submit", revealNextField);
function revealNextField(e) {
  e.preventDefault();
  fieldsWrapper.classList.add("hidden");
}

// Currency info-box

// Date-time box
const userNavigationBox = document.querySelector(".user-date--time__box");
let lat, lng;

if (curUser.location.length > 0) {
  userNavigationBox.textContent =
    userNavigationBox.textContent = `You are in ${curUser.location[0]}, ${curUser.location[1]}`;
} else {
  // Get user coords
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    const userPosition = fetch(
      `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=fecony`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        const userCity = response.geonames[0].adminName1;
        const userCountry = response.geonames[0].countryName;
        curUser.location = [userCity, userCountry];
        localStorage.setItem(curUser.email, JSON.stringify(curUser));
        userNavigationBox.textContent = `You are in ${curUser.location[0]}, ${curUser.location[1]}`;
      });
  });
}

// Get position from API

//Log out function
const logOutBtn = document.querySelector(".log-out--btn");
logOutBtn.addEventListener("click", logOut);
function logOut() {
  window.location.href = "./log-in.html";
  localStorage.removeItem("logedIn");
}

// Log out timer

function countDownTimerFunc() {
  function timeCounting() {
    const min = String(Math.trunc(`${time / 60}`)).padStart(2, 0);
    const sec = String(`${time % 60}`).padStart(2, 0);
    timerBlock.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      logOut();
    }
    time--;
  }
  let time = 18000;
  timeCounting();
  timer = setInterval(timeCounting, 1000);
  return timer;
}
document.addEventListener("click", function () {
  if (timer) clearInterval(timer);
  countDownTimerFunc();
});
