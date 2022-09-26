"use strict";

import('../css/shared-css.css');
import('../css/why-us.css');

const blockThree = document.querySelector(".intersection");
const blockOne = document.querySelector(".block--1");
const header = document.querySelector(".menu-org");
const arrows = document.querySelectorAll(".arrow");
const arrowUp = document.querySelector(".arrow-btn--up");
const arrowDown = document.querySelector(".arrow-btn--down");
const footer = document.querySelector(".main-footer");
const allBlocks = document.querySelectorAll(".blocks");

//Sticky menu
const obsOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};
const obsFunc = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    header.classList.add("sticky-menu");
  }
  if (!entry.isIntersecting) {
    header.classList.remove("sticky-menu");
  }
};
const observer = new IntersectionObserver(obsFunc, obsOptions);
observer.observe(blockThree);

//Reveal elements on scroll

const revealBlocks = function (entries, observer) {
  const [entry] = entries;
  entry.target.classList.remove("hidden-block");
};
const blockObserver = new IntersectionObserver(revealBlocks, {
  root: null,
  threshold: 0.15,
});
allBlocks.forEach(function (block) {
  blockObserver.observe(block);
  block.classList.add("hidden-block");
});

// Arrow buttons navigation on page
arrowUp.addEventListener("click", function () {
  blockOne.scrollIntoView({ behavior: "smooth" });
});
arrowDown.addEventListener("click", function () {
  footer.scrollIntoView({ behavior: "smooth" });
  arrowDown.classList.toggle("hidden");
});
// Hide arrow down if footer is intersecting

const arrowNavigation = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    arrows.forEach((arrow) => {
      arrow.classList.remove("hidden");
    });
  } else {
    arrows.forEach((arrow) => {
      arrow.classList.add("hidden");
    });
  }
};
const arrowObserver = new IntersectionObserver(arrowNavigation, {
  root: null,
  rootMargin: "0px",
  threshold: 0,
});
arrowObserver.observe(blockThree);

// //Lazy load (parcel doesn't support)
// const lazyImg = document.querySelectorAll("img[data-src]");
// const loadImg = function (entries) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;
//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener("load", function () {
//     console.log(loaded);
//     entry.target.classList.remove(".lazy-img");
//   });
//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   treshold: 0,
// });
// lazyImg.forEach((img) => imgObserver.observe(img));
