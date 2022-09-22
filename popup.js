const hashTargetElement = document.getElementById("hash-target");
const saveButtonElement = document.getElementById("save-button");

chrome.storage.sync.get(["shouldAlwaysHideInput", "hashTarget"], (result) => {
  // Safety check to avoid unexpected behavior due to undefined being a falsy value
  const shouldAlwaysHideInput = result.shouldAlwaysHideInput ?? "password";
  const hashTarget = result.hashTarget ?? "";

  hashTargetElement.value = hashTarget;
  hashTargetElement.setAttribute(
    "type",
    shouldAlwaysHideInput ? "password" : "text"
  );
});

saveButtonElement.addEventListener("click", () => {
  chrome.storage.sync.set({
    hashTarget: hashTargetElement.value,
  });
});
