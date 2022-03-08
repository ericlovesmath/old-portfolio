import './style.css'

const tablineElem = document.querySelector("#tabline")!;

main()

function main() {
  const tabs = ["index.html", "about.html", "projects.html", "contact.html"];
  const currentTab = "index.html";
  createTabBar(tabs, currentTab);
}

function createTabBar(tabs: string[], currentTab: string) {
  tabs.forEach((tabName: string) => {
    let newTab = document.createElement("div");
    let barAndIcon = document.createElement("span");
    if (tabName === currentTab) {
      newTab.classList.add("current-tab");
    }
    barAndIcon.textContent

    newTab.textContent = `▎  ${tabName}  `;
    tablineElem.appendChild(newTab);
  });

  let tabCap = document.createElement("div");
  tabCap.textContent = "▎";
  tablineElem.appendChild(tabCap);
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

