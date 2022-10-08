'use strict';

//Lazy load 
const lazyImg = document.querySelectorAll("img[data-src]");
const loadImg = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  imgObserver.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  treshold: 0,
});
lazyImg.forEach((img) => imgObserver.observe(img));
