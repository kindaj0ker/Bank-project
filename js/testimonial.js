"use strict";

const btnSliderLeft = document.querySelector(".arrow-left--slider");
const btnSliderRight = document.querySelector(".arrow-right--slider");
const slides = document.querySelectorAll(".slide");
const allDebitCardsContainer = document.querySelector("debit-cards");
const learnMoreBlock = document.querySelector(".more-info--wrapper");
const allLearnBtns = document.querySelectorAll(".learn-more--btn");
const allInfo = document.querySelectorAll(".card-details--wrapper ");

//Show more info
allLearnBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    const cardType = e.target.id.split("-")[0] + "-" + "info";
    const curInfo = document.getElementById(cardType);
    Array.from(allInfo)
      .filter((c) => c !== curInfo)
      .forEach((a) => a.classList.add("hidden"));
    curInfo.classList.toggle("hidden");
  })
);

// Slider;
let curSlide = 0;
const maxSlide = slides.length;

const changeSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

// Next slide
const nextSlideFunc = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  changeSlide(curSlide);
};
btnSliderRight.addEventListener("click", nextSlideFunc);

// Previous slide
const prevSlideFunc = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  changeSlide(curSlide);
};
btnSliderLeft.addEventListener("click", prevSlideFunc);

// Key events in slider
btnSliderLeft.addEventListener("click", prevSlideFunc);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlideFunc();
  if (e.key === "ArrowRight") nextSlideFunc();
});
changeSlide(0);
