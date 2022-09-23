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

  try {
    navigator.clipboard.writeText(hashTargetElement.value);

    chrome.storage.sync.get(["showNotification"], (result) => {
      // Safety check to avoid unexpected behavior due to undefined being a falsy value
      const showNotification = result.showNotification ?? true;

      if (showNotification) {
        chrome.notifications.create({
          type: "basic",
          title: "Good!",
          message: "The hash have been copied to your clipboard",
          iconUrl: "icon.png",
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
});
