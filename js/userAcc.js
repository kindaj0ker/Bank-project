"use strict";

const uniqid = new ShortUniqueId();

//Highlight main page
const home=document.getElementById("HOME");
home.classList.add("menu-highlighted");
home.parentElement.classList.add("highlighted");

//Highlighted menu
const allMenu=Array.from(document.getElementsByClassName("user-menu--li"));
document.addEventListener("click", function(e){
  if (e.target.classList.contains("user-menu--li")){
  allMenu.forEach((m)=> {
    if (m.classList.contains("menu-highlighted") && m.parentElement.classList.contains("highlighted")) {
    m.classList.toggle("menu-highlighted");
    m.parentElement.classList.toggle("highlighted");
    };
    e.target.parentElement.classList.add("highlighted");
    e.target.classList.add("menu-highlighted");
  }) 
  }
showContent();
})

//Show html depends on current menu selection
const contentSpace=document.querySelector(".content-space");
const showContent=function(){
  allMenu.forEach((m)=>{
  if (m.classList.contains("menu-highlighted")){
    contentSpace.innerHTML="";
    const curMenu="#"+m.id.toLowerCase();
    const curTemplateID=document.querySelector(curMenu)
    const curTemplateContent=curTemplateID.content.cloneNode(true);
    contentSpace.appendChild(curTemplateContent)
  } else return
});
}
showContent();
// Create new user account
export class User {
  constructor(fName, lName, bDay, email, password) {
    this.id = uniqid();
    this.fName = fName;
    this.lN = lName;
    this.bDay = bDay;
    this.email = email;
    this.password = password;
    this.cards = [];
    this.transactions = [];
  }

  createNewCard(cardPlan, id = `${uniqid()}`, expired, currency = "$") {
    const day = new Date().getDate().toString().padStart(2, "0");
    const month = new Date().getMonth().toString().padStart(2, "0");
    const year = new Date().getFullYear() + 4;
    const expiredDate = day + "-" + month + "-" + year;
    const data = new Map([
      ["plan", `${cardPlan}`],
      ["id", `${id}`],
      ["expired", `${expiredDate}`],
      ["currency", `${currency}`],
    ]);
    const card = Object.fromEntries(data);
    this.cards.push(card);
  }

  createNewTransaction(
    group,
    cardID,
    transactionID = `${uniqid()}`,
    amount,
    currency,
    date = `${new Date().toISOString().split("T")[0]}`,
    type,
    savingType = "other"
  ) {
    const data = new Map([
      ["group", `${group}`],
      ["cardID", `${cardID}`],
      ["transactionID", `${transactionID}`],
      ["amount", `${amount}`],
      ["currency", `${currency}`],
      ["type", `${type}`],
      ["date", `${date}`],
      ["savingType", `${savingType}`],
    ]);
    const transaction = Object.fromEntries(data);
    this.transactions.push(transaction);
  }
}

//New user from registered user

//Header greeting
const userFname = document.querySelector(".user-f--name");
window.addEventListener("load", function () {
  let user = JSON.parse(
    localStorage.getItem(localStorage.getItem("logedInUserEmail"))
  );

  if (user) {
    console.log("hey!", user.fName);
    console.log(localStorage.getItem("newUserEmail"));
  }
});


// Currency info-box

// Date-time box
//Log out timer

const timer = document.querySelector(".timer");
if (timer) {
  let time = 60;
  setInterval(function () {
    const min = toString(Math.trunc(`${time / 60}`));
    const sec = toString(`${time % 60}`);
    timer.textContent = `${min}:${sec}`;
    time--;
  }, 1000);

  setTimeout(function () {
    if (min === "0" && sec === "0") {
      console.log(lpggedout);
    }
  }, time);
}
// window.addEventListener("click", countDownTimerFunc);
