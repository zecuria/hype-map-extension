const jsLocation = 'content.js';
const cssLocation = 'content.css';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && jsLocation !== null) {
    chrome.tabs.executeScript(tabId, {
      file: jsLocation,
      runAt: 'document_end',
    });
    chrome.tabs.executeScript(tabId, {
      file: cssLocation,
      runAt: 'document_end',
    });
  }
});
