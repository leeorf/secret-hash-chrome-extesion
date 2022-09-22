const hashTargetElement = document.getElementById("hash-target");

chrome.action.setBadgeText(
  {
    text: hashTargetElement.value ? "filled" : "",
  },
  () => {
    console.log("finish");
  }
);
