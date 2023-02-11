"use strict";

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

//Mobile style
const checkboxIcon = document.querySelector(".checkbox-menu");
const body = document.querySelector("body");
checkboxIcon.addEventListener("change", function () {
  if (this.checked) {
    body.classList.add("overflow-hidden");
  } else documentBody.classList.remove("overflow-hidden");
});
