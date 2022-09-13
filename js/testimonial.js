"use strict";
// Slider;
let curSlide = 0;
const slidesContainer = document.querySelector(".slider-wrapper");
const btnSliderLeft = document.querySelector(".arrow-left--slider");
const btnSliderRight = document.querySelector(".arrow-right--slider");
const slide = document.querySelector(".slide");

// Next slide
const nextSlideFunc = function () {
  const slideWidth = slide.clientWidth + 16; // 16 is 1 rem
  slidesContainer.scrollLeft += slideWidth;
};
btnSliderRight.addEventListener("click", nextSlideFunc);

// Previous slide
const prevSlideFunc = function () {
  const slideWidth = slide.clientWidth + 16; // 16 is 1 rem
  slidesContainer.scrollLeft -= slideWidth;
};
btnSliderLeft.addEventListener("click", prevSlideFunc);

// Key events in slider
btnSliderLeft.addEventListener("click", prevSlideFunc);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlideFunc();
  if (e.key === "ArrowRight") nextSlideFunc();
});
