const alwaysHideInputSwitchElement = document.getElementById(
  "always-hide-input-switch"
);

alwaysHideInputSwitchElement.addEventListener("click", (e) => {
  const checked = e.target.ariaChecked === "true";
  e.target.setAttribute("aria-checked", !checked);
});
