
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Path } from 'path-parser';

const id = 'hype-map-extension-root';

const requestVideo = async (videoId: string) => {
  try {
    const res = await fetch(`https://7darbnodnf.execute-api.us-east-1.amazonaws.com/prod/video/${videoId}`);
    const text = await res.text();
    const data = JSON.parse(text);
    if (res.status > 200) {
      return { error: data.message };
    }
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const mount = async (videoId: string) => {
  const graphHeight = 100;

  ReactDOM.render(
    <React.StrictMode>
      <App isLoading={true} errorMessage="" data={[]} graphHeight={graphHeight} />
    </React.StrictMode>,
    document.getElementById(id)
  );

  const data = await requestVideo(videoId)
  const { error } = data;

  const res = error ? { success: false, error } : { success: true, data };

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
}

const main = () => {
  const videoPlayer = document.querySelector('[data-test-selector="video-player__video-container"]');

  const path = Path.createPath('/videos/:videoId');
  const element = document.getElementById(id);

  if (!videoPlayer) {
    return;
  }

  const result = path.partialTest(window.location.pathname) || {};
  const mountedVideoId = element && element.dataset.videoId;

  console.log(element);
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
    mount(result.videoId);
    return;
  };

  if (!result.videoId && element) {
    ReactDOM.unmountComponentAtNode(element);
    element.parentElement && element.parentElement.removeChild(element);
  }
}

main();

const bodyList = document.querySelector("body")

var oldHref = document.location.href;

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (oldHref != document.location.href) {
      oldHref = document.location.href;
      main();
    }
  });
});

var config = {
  childList: true,
  subtree: true
};

if(bodyList){
  observer.observe(bodyList, config);
}