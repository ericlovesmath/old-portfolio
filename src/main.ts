import { setBlogs } from './md-blog';
import './style.css'

const $tablineElem = document.querySelector("#tabline")!;

main()

function main() {
  const tabs = ["index.html", "about.html", "projects.html", "contact.html"];
  const currentTab = "index.html";
  createTabBar(tabs, currentTab);
  setBlogs("test");
}

// Tab Bar

function createTabBar(tabs: string[], currentTab: string) {
  tabs.forEach((tabName: string) => {
    createTabBarElem(tabName, currentTab);
  });

  let tabCap = document.createElement("div");
  tabCap.textContent = "▎";
  $tablineElem.appendChild(tabCap);
}

function createTabBarElem(tabName: string, currentTab: string) {
  let newTab = document.createElement("div");
  if (tabName === currentTab) {
    newTab.classList.add("current-tab");
  }
  newTab.innerHTML = `<span>▎ </span> ${tabName}  `;
  newTab.onclick = () => { setCurrentTab(newTab) };
  $tablineElem.appendChild(newTab);
}

function setCurrentTab(tabElem: HTMLDivElement) {
  $tablineElem.querySelector(".current-tab")?.classList.remove("current-tab");
  tabElem.classList.add("current-tab");
}

// Footer Scroll Test

const footerPercentLabel = document.querySelector("#footer-percent")!;

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  let docHeight = document.body.offsetHeight;
  let winHeight = window.innerHeight;
  console.log(scrollTop, docHeight, winHeight);
  console.log(window.pageYOffset);
  let scrollPercent = scrollTop / (docHeight - winHeight);
  if (docHeight == winHeight) {
    scrollPercent = 1;
  }
  let scrollPercentRounded = Math.round(scrollPercent * 100);
  footerPercentLabel.innerHTML = `${scrollPercentRounded}%`;
});

