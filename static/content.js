
var script = document.createElement('script'); 
var css = document.createElement('link'); 
css.rel = 'stylesheet';
css.type = 'text/css';
css.href = chrome.extension.getURL('index.css');
script.src = chrome.extension.getURL('index.js');
(document.head||document.documentElement).appendChild(script);
(document.head||document.documentElement).appendChild(css);