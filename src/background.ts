const jsLocation = 'index.js';
const cssLocation = 'index.css';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(tab.url);
  if (changeInfo.status === 'complete' && jsLocation !== null && tab.url) {
    chrome.tabs.executeScript(tabId, {
      file: jsLocation,
      runAt: 'document_end',
    });
    chrome.tabs.insertCSS(tabId, {
      file: cssLocation,
      runAt: 'document_end',
    });
  }
});


chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req);
  const { videoId } = req;
    requestVideo(videoId).then((data: any) => sendResponse({ 
      success: true,
      data,
    })).catch(err => sendResponse({
      success: false,
      err,
    }));

  return true;
});

const requestVideo = async (videoId: string) => {
  try {
    const res = await fetch(`https://7darbnodnf.execute-api.us-east-1.amazonaws.com/prod/video/${videoId}`);
    console.log(res);
    const text = await res.text();
    console.log('text', text);
    const data = JSON.parse(text);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}