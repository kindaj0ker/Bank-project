"use strict";

import('../css/shared-css.css');

// Menu highlight
const [currPageLink] = window.location.href.split("/").slice(-1);
const currPageName = currPageLink.split(".")[0];
document.getElementById(currPageName).classList.add("active");

//Hamburger-menu
const hamBtn = document.querySelector(".ham");
const bars = document.querySelectorAll(".ham-bar");
hamBtn.addEventListener("click", function (e) {
  bars.forEach((bar) => bar.classList.toggle("open"));
  console.log(bars);
});
