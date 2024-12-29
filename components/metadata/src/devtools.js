'use strict';

chrome.devtools.panels.create(
  'Chrome Extension Angular',
  'icons/icon-128x128.png',
  'devtools-panel/index.html',
  (panel) => {
    panel.onShown.addListener((event) => {
      console.log('panel is being shown', event);
    });
    panel.onHidden.addListener((event) => {
      console.log('panel is being hidden', event);
    });
  }
);
