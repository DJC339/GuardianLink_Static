(() => {
  const navToggle = document.getElementById("nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const drawerClose = document.getElementById("drawer-close");

  function setToggleState(open) {
    if (!navToggle || !drawer) return;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.classList[open ? "remove" : "add"]("hidden");
    const label = navToggle.querySelector("[data-nav-label]");
    const icon = navToggle.querySelector("[data-nav-icon]");
    if (label) label.textContent = open ? "Close" : "Menu";
    if (icon) icon.textContent = open ? "X" : "|||";
  }

  if (navToggle && drawer) {
    navToggle.addEventListener("click", () =>
      setToggleState(drawer.classList.contains("hidden"))
    );
  }
  if (drawerClose) {
    drawerClose.addEventListener("click", () => setToggleState(false));
  }
  if (drawer) {
    drawer.addEventListener("click", (e) => {
      if (e.target === drawer) setToggleState(false);
    });
  }
})();
