
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const id = 'hype-map-extension-root';

const selector = '[data-test-selector="seekbar-interaction-area__interactionArea"]';

const interactionBar = document.querySelector(selector);
const videoPlayer = document.querySelector('[data-test-selector="video-player__video-container"]');

if(!document.getElementById(id) && interactionBar && videoPlayer) {
  const graphHeight = 100;
  const { left, top, width, height } = interactionBar.getBoundingClientRect();
  console.log(interactionBar.getBoundingClientRect());

  const calculatedTopPosition = top - graphHeight;
  console.log(calculatedTopPosition, left);

  const anchor = document.createElement('div');
  anchor.style.position = 'absolute';
  anchor.style.left = `${0}px`;
  anchor.style.width = `100%`;
  anchor.style.bottom = `${84}px`;
  anchor.style.zIndex = '100000';
  anchor.className = 'tw-pd-x-2'
  anchor.id = id;
  videoPlayer.insertBefore(anchor, videoPlayer.childNodes[0]);

  ReactDOM.render(
    <React.StrictMode>
      <App graphWidth={width} graphHeight={graphHeight}/>
    </React.StrictMode>,
    document.getElementById(id)
  );
};
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
