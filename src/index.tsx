import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Path } from 'path-parser';
import App from './App';
import json from './test.json';

const id = 'hype-map-extension-root';

const mount = async (videoId: string) => {
  const graphHeight = 100;

  const communicator = document.getElementById('hype-map-communication');

  if (!communicator) {
    return;
  }
  const isHidden = communicator.dataset.hide === 'true';

  const onHide = (hide: boolean) => {
    communicator.dispatchEvent(new CustomEvent<{ isHidden: boolean }>('setHide', {
      detail: {
        isHidden: hide,
      },
    }));
  };

  ReactDOM.render(
    <React.StrictMode>
      <App videoId={videoId} graphHeight={graphHeight} isHidden={isHidden} onHide={onHide} />
    </React.StrictMode>,
    document.getElementById(id),
  );

  // const data = await requestVideo(videoId)
  // const { error } = data;

  // const res = error ? { success: false, error } : { success: true, data };
  const res = {
    success: true,
    data: json,
    error: 'false',
  };

  if (res.success) {
    ReactDOM.render(
      <React.StrictMode>
        <App videoId={videoId} graphHeight={graphHeight} isHidden={isHidden} onHide={onHide} />
      </React.StrictMode>,
      document.getElementById(id),
    );
  } else {
    ReactDOM.render(
      <React.StrictMode>
        <App videoId={videoId} graphHeight={graphHeight} isHidden={isHidden} onHide={onHide} />
      </React.StrictMode>,
      document.getElementById(id),
    );
  }
};

const main = () => {
  const videoPlayer = document.querySelector('[data-test-selector="video-player__video-container"] > div > div');

  const path = Path.createPath('/videos/:videoId');
  const path2 = Path.createPath('/u/:user/content/video-producer/highlighter/:videoId');
  const element = document.getElementById(id);

  if (!videoPlayer) {
    return;
  }

  const result = path.partialTest(window.location.pathname) || {};
  const result2 = path2.partialTest(window.location.pathname) || {};
  const mountedVideoId = element && element.dataset.videoId;

  const videoId = result.videoId || result2.videoId;
  if (videoId && !element) {
    const anchor = document.createElement('div');
    anchor.id = id;
    videoPlayer.insertBefore(anchor, videoPlayer.childNodes[0]);

    anchor.setAttribute('data-video-id', videoId);
    mount(videoId);
    return;
  }

  if (element && videoId && videoId !== mountedVideoId) {
    element.setAttribute('data-video-id', videoId);
    mount(videoId);
    return;
  }

  if (!videoId && element) {
    ReactDOM.unmountComponentAtNode(element);
    if (element.parentElement) {
      element.parentElement.removeChild(element);
    }
  }
};

main();

const bodyList = document.querySelector('body');

let oldHref = document.location.href;

const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      main();
    }
  });
});

const config = {
  childList: true,
  subtree: true,
};

if (bodyList) {
  observer.observe(bodyList, config);
}
