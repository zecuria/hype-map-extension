import { browser } from "webextension-polyfill-ts";

var script = document.createElement('script'); 
var css = document.createElement('link'); 
css.rel = 'stylesheet';
css.type = 'text/css';
css.href = browser.extension.getURL('index.css');
script.src = browser.extension.getURL('index.js');
var div = document.createElement('div'); 
div.id = "hype-map-communication";
(document.head||document.documentElement).appendChild(script);
(document.head||document.documentElement).appendChild(css);
(document.head||document.documentElement).appendChild(div);

type HideEvent = CustomEvent<{ isHidden: boolean }>;

browser.storage.sync.get('isHidden').then(val => {
    div.dataset.hide = `${val.isHidden}`;
}).catch(err => console.error(err));

div.dataset.hide = 'false';

div.addEventListener('setHide', e => {
    const { detail: { isHidden } } = e as HideEvent;
    browser.storage.sync.set({ isHidden });
})