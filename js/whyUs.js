"use strict";
const blockThree = document.querySelector(".block--3");
const header = document.querySelector(".menu-org");
const arrowUp = document.querySelector(".arrow-btn--up");
const arrowDown = document.querySelector(".arrow-btn--down");
const footer = document.querySelector(".main-footer");

const allBlocks = document.querySelectorAll(".blocks");
//Sticky menu
// const obsOptions = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 0.4,
// };
// const obsFunc = function (entries) {
//   const [entry] = entries;
//   console.log(entry, entry.isIntersecting);

//   if (!entry.isIntersecting) {
//     header.classList.add("sticky-menu");
//   } else {
//     header.classList.remove("sticky-menu");
//   }
// };
// const observer = new IntersectionObserver(obsFunc, obsOptions);
// observer.observe(blockThree);

//Reveal elements on scroll

const revealBlocks = function (entries, observer) {
  const [entry] = entries;
  entry.target.classList.remove("hidden-block");
};
const blockObserver = new IntersectionObserver(revealBlocks, {
  root: null,
  threshold: 0.35,
});
allBlocks.forEach(function (block) {
  blockObserver.observe(block);
  block.classList.add("hidden-block");
});

// Arrow buttons navigation on page
arrowUp.addEventListener("click", function () {
  header.scrollIntoView({ behavior: "smooth" });
});
arrowDown.addEventListener("click", function () {
  footer.scrollIntoView({ behavior: "smooth" });
});
const coordsBlockThree = blockThree.getBoundingClientRect();
const heightBlockThree = coordsBlockThree.y;
console.log(heightBlockThree);

const arrowNavigation = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
};
const blockObserver = new IntersectionObserver(revealBlocks, {
  root: null,
  threshold: 0.35,
});

arrowNavigation.observe(blockThree);
block.classList.add("hidden-block");
