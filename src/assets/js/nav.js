(() => {
  const navToggle = document.getElementById("nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const drawerClose = document.getElementById("drawer-close");
  let lastTrigger = null;

  function setToggleState(open) {
    if (!navToggle || !drawer) return;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    drawer.classList[open ? "remove" : "add"]("hidden");
    const label = navToggle.querySelector("[data-nav-label]");
    const icon = navToggle.querySelector("[data-nav-icon]");
    if (label) label.textContent = open ? "Close" : "Menu";
    if (icon) icon.textContent = open ? "X" : "|||";
    if (open) {
      drawerClose?.focus();
    } else {
      lastTrigger?.focus();
    }
  }

  if (navToggle && drawer) {
    navToggle.addEventListener("click", () => {
      lastTrigger = navToggle;
      setToggleState(drawer.classList.contains("hidden"));
    });
  }
  if (drawerClose) {
    drawerClose.addEventListener("click", () => setToggleState(false));
  }
  if (drawer) {
    drawer.addEventListener("click", (e) => {
      if (e.target === drawer) setToggleState(false);
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer && !drawer.classList.contains("hidden")) {
      setToggleState(false);
    }
  });
})();
