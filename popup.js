const hashTargetElement = document.getElementById('hash-target');
const saveButtonElement = document.getElementById('save-button');

chrome.storage.sync.get(['shouldAlwaysHideInput', 'hashTarget'], result => {
  // Safety check to avoid unexpected behavior due to undefined being a falsy value
  const shouldAlwaysHideInput = result.shouldAlwaysHideInput ?? 'password';
  const hashTarget = result.hashTarget ?? '';

  hashTargetElement.value = hashTarget;
  hashTargetElement.setAttribute(
    'type',
    shouldAlwaysHideInput ? 'password' : 'text'
  );
});

saveButtonElement.addEventListener('click', async () => {
  chrome.storage.sync.set({
    hashTarget: hashTargetElement.value,
  });

  try {
    const hashResult = await hashMessage(hashTargetElement.value);

    navigator.clipboard.writeText(hashResult);

    const hashResultElement = document.getElementById('hash-result');
    hashResultElement.textContent = hashResult;
  } catch (err) {
    console.error(err);
  }
});

const hashMessage = async message => {
  // encode as (utf-8) Uint8Array
  const msgUint8 = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);

  // convert buffer to byte array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
};
