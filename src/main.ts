import { setPage } from './md-pages';
import { updateFooterScroll } from './footer';
import './style.css'

const $tabline = document.querySelector("#tabline")!;

main()

function main() {
  initTabBar("index");
  setPage("index");
}

// Tab Bar
function initTabBar(startTab: string) {
  for (let i = 0; i < $tabline.children.length; i++) {
    let $tab = $tabline.children[i] as HTMLDivElement;
    let tabName = $tab.dataset.url!;
    if (tabName === startTab) {
      $tab.classList.add("active-tab");
    }
    $tab.innerHTML = `<span class="icon">[ </span class="text"> ${tabName}.html <span class="icon">]</span>`;
    $tab.onclick = () => { setCurrentTab($tab, tabName) };
  }
}

function setCurrentTab(tabElem: HTMLDivElement, tabName: string) {
  $tabline.querySelector(".active-tab")?.classList.remove("active-tab");
  tabElem.classList.add("active-tab");
  setPage(tabName);
}

window.addEventListener("scroll", () => {
  updateFooterScroll();
});
