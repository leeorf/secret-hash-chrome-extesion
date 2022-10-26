chrome.runtime.sendMessage('From content scripts', response => {
  console.log(response);
});
