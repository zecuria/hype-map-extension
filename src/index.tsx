
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Path } from 'path-parser';
const id = 'hype-map-extension-root';

// const selector = '[data-test-selector="seekbar-interaction-area__interactionArea"]';
// const interactionBar = document.querySelector(selector);

const videoPlayer = document.querySelector('[data-test-selector="video-player__video-container"]');

const path = Path.createPath('/videos/:videoId');
const element = document.getElementById(id);

const mount = (videoId: string) => {
  const graphHeight = 100;

  chrome.runtime.sendMessage({
    videoId: videoId
  }, (res) => {
    if (res.success) {
      ReactDOM.render(
        <React.StrictMode>
          <App isLoading={false} errorMessage="" data={res.data} graphHeight={graphHeight} />
        </React.StrictMode>,
        document.getElementById(id)
      );
    } else {
      ReactDOM.render(
        <React.StrictMode>
          <App isLoading={false} errorMessage={res.error} data={[]} graphHeight={graphHeight} />
        </React.StrictMode>,
        document.getElementById(id)
      );
    }
  });

  ReactDOM.render(
    <React.StrictMode>
      <App isLoading={true} errorMessage="" data={[]} graphHeight={graphHeight} />
    </React.StrictMode>,
    document.getElementById(id)
  );
}

const main = () => {
  if (!videoPlayer) {
    return;
  }

  const result = path.partialTest(window.location.pathname) || {};
  const mountedVideoId = element && element.dataset.videoId;

  if (result.videoId && !element) {
    const anchor = document.createElement('div');
    anchor.style.position = 'absolute';
    anchor.style.left = `${0}px`;
    anchor.style.width = `100%`;
    anchor.style.bottom = `${84}px`;
    anchor.style.zIndex = '100000';
    anchor.id = id;
    anchor.setAttribute("class", "tw-pd-x-2")
    videoPlayer.insertBefore(anchor, videoPlayer.childNodes[0]);

    anchor.setAttribute("data-video-id", result.videoId);;
    mount(result.videoId);
    return;
  } 

  if (element && result.videoId && result.videoId !== mountedVideoId) {
    element.setAttribute("data-video-id", result.videoId);
    element.parentElement && element.parentElement.removeChild(element);
    mount(result.videoId);
    return;
  };

  if(!result.videoId && element) {
    ReactDOM.unmountComponentAtNode(element);
    element.parentElement && element.parentElement.removeChild(element);
  }
}

main();
