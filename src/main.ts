import { setPage } from './md-pages';
import './style.css'

const $tabline = document.querySelector("#tabline")!;

main()

function main() {
  initTabBar();
  setPage("index");
}

// Tab Bar
function initTabBar() {
  for (let i = 0; i < $tabline.children.length; i++) {

    let $tab = $tabline.children[i] as HTMLDivElement;
    let tabName = $tab.dataset.url!;

    if (tabName === "index") {
      $tab.classList.add("active-tab");
    }

    if (tabName === "cap") {
      $tab.innerHTML = '<span class="icon">▎</span class="text">';
    } else {
      $tab.innerHTML = `<span class="icon">▎ </span class="text"> ${tabName}.html  `;
      $tab.onclick = () => { setCurrentTab($tab, tabName) };
    }

  }
}

function setCurrentTab(tabElem: HTMLDivElement, tabName: string) {
  $tabline.querySelector(".active-tab")?.classList.remove("active-tab");
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

