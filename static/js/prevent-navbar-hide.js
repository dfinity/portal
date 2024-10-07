(function () {
  console.log("prevent-navbar-hide script loaded");

  function handleClick(event) {
    if (window.innerWidth <= 996) {
      // Docusaurus mobile breakpoint
      const target = event.target.closest(
        ".navbar-sidebar__item.menu .menu__list-item a.menu__link"
      );
      if (target && target.textContent.trim() === "Build") {
        console.log("Build link clicked");
        event.preventDefault();
        event.stopPropagation();
        console.log("Default behavior prevented, sidebar should remain open");
      }
    }
  }

  function initializeScript() {
    document.addEventListener("click", handleClick, true);
    console.log("Click event listener added");
  }

  // Initialize the script when the DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeScript);
  } else {
    initializeScript();
  }
})();
