const alwaysHideInputSwitchElement = document.getElementById(
  'always-hide-input-switch'
);
const showNotificationSwitchElement = document.getElementById(
  'show-notification-switch'
);

chrome.storage.sync.get(
  ['shouldAlwaysHideInput', 'showNotification'],
  result => {
    // Safety check to avoid unexpected behavior due to undefined being a falsy value
    const shouldAlwaysHideInput = result.shouldAlwaysHideInput ?? true;
    const showNotification = result.showNotification ?? true;

    alwaysHideInputSwitchElement.setAttribute(
      'aria-checked',
      shouldAlwaysHideInput
    );
    showNotificationSwitchElement.setAttribute(
      'aria-checked',
      showNotification
    );
  }
);

const toggleValue = target => {
  const currentValue = target.ariaChecked === 'true';
  const newValue = !currentValue;
  target.setAttribute('aria-checked', !currentValue);
  return newValue;
};

alwaysHideInputSwitchElement.addEventListener('click', e => {
  const newValue = toggleValue(e.target);
  chrome.storage.sync.set({
    shouldAlwaysHideInput: newValue,
  });
});

showNotificationSwitchElement.addEventListener('click', e => {
  const newValue = toggleValue(e.target);
  chrome.storage.sync.set({
    showNotification: newValue,
  });
});
