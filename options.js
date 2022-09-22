const alwaysHideInputSwitchElement = document.getElementById(
  "always-hide-input-switch"
);

chrome.storage.sync.get(["shouldAlwaysHideInput"], (result) => {
  // Safety check to avoid unexpected behavior due to undefined being a falsy value
  const shouldAlwaysHideInput = result.shouldAlwaysHideInput ?? true;

  alwaysHideInputSwitchElement.setAttribute(
    "aria-checked",
    shouldAlwaysHideInput
  );
});

alwaysHideInputSwitchElement.addEventListener("click", (e) => {
  const currentValue = e.target.ariaChecked === "true";
  const newValue = !currentValue;
  e.target.setAttribute("aria-checked", !currentValue);
  chrome.storage.sync.set({
    shouldAlwaysHideInput: newValue,
  });
});
