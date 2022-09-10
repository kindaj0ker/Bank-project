"use strict";
// Menu highlight
const [currPageLink] = window.location.href.split("/").slice(-1);
const currPageName = currPageLink.split(".")[0];
document.getElementById(currPageName).classList.add("active");
