"use strict";
import VanillaTilt from "vanilla-tilt";
const cards = document.querySelectorAll(".card-wrapper");
const closeCautionBtn = document.querySelector("#close-caution-banner-btn");
const cautionBanner = document.getElementsByClassName("caution-banner")[0];
const getStartedBtn = document.querySelector(".get-started");

// Cards animation
const animationCards = function (e) {
  VanillaTilt.init(e.target.closest(".card-wrapper"), {
    max: 35,
    speed: 400,
    glare: true,
    "max-glare": 0.8,
    gyroscope: true,
    gyroscopeMinAngleX: -45,
    gyroscopeMaxAngleX: 45,
    gyroscopeMinAngleY: -45,
    gyroscopeMaxAngleY: 45,
  });
};

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("load", animationCards);
});

// Close caution banner
closeCautionBtn.addEventListener("click", function () {
  cautionBanner.classList.add("hidden");
});
