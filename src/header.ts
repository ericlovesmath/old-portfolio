import { setBlogPreviews, setPage } from "./md-pages";

const $tabline = document.querySelector("#tabline")!;

export function initTabBar(startTab: string) {
  for (let i = 0; i < $tabline.children.length; i++) {
    let $tab = $tabline.children[i] as HTMLDivElement;
    let tabName = $tab.dataset.url!;
    if (tabName === startTab) {
      $tab.classList.add("active-tab");
    }
    $tab.innerHTML = `<span class="icon">[ </span class="text"> ${tabName}.html <span class="icon">]</span>`;
    $tab.onclick = () => { setCurrentTab($tab, tabName) };
  }
  setPage(`./pages/${startTab}.md`);
}

function setCurrentTab(tabElem: HTMLDivElement, tabName: string) {
  $tabline.querySelector(".active-tab")?.classList.remove("active-tab");
  tabElem.classList.add("active-tab");
  if (tabName === "blog") {
    setBlogPreviews();
  } else {
    setPage(`./pages/${tabName}.md`);
  }
}

