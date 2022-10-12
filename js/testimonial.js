"use strict";

// Slider;

const btnSliderLeft = document.querySelector(".arrow-left--slider");
const btnSliderRight = document.querySelector(".arrow-right--slider");
const slides = document.querySelectorAll(".slide");

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
