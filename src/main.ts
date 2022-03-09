import { setPage } from './md-pages';
import './style.css'

const $tablineElem = document.querySelector("#tabline")!;

main()

function main() {
  const tabs = ["index", "about", "projects", "contact"];
  const currentTab = "index";
  createTabBar(tabs, currentTab);
  setPage("index");
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
    newTab.classList.add("active-tab");
  }
  newTab.innerHTML = `<span class="icon">▎ </span class="text"> ${tabName}.html  `;
  newTab.onclick = () => { setCurrentTab(newTab, tabName) };
  $tablineElem.appendChild(newTab);
}

function setCurrentTab(tabElem: HTMLDivElement, tabName: string) {
  $tablineElem.querySelector(".active-tab")?.classList.remove("active-tab");
  tabElem.classList.add("active-tab");
  setPage(tabName);
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

