const footerPercentLabel = document.querySelector("#footer-percent")!;

export function initFooter() {
  window.addEventListener("scroll", () => {
    updateFooterScroll();
  });
}

export function updateFooterScroll() {
  let scrollTop = window.scrollY; // How much scrolled
  let docHeight = document.body.offsetHeight; // Height of Body
  let winHeight = window.innerHeight; // Height of Window - Scrollbar
  /* console.log(scrollTop, docHeight, winHeight);
  console.log(window.pageYOffset); */
  let scrollPercent = scrollTop / (docHeight - winHeight);
  if (docHeight == winHeight) { scrollPercent = 1; }
  scrollPercent = Math.min(Math.max(scrollPercent, 0), 1)
  let scrollPercentRounded = Math.round(scrollPercent * 100);
  footerPercentLabel.innerHTML = `${scrollPercentRounded}%`;
}
