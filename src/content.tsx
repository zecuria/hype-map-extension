import { Path } from 'path-parser';
const path = Path.createPath('/videos/:videoId');
const result = path.partialTest(window.location.pathname) || {};

console.log('-----initiated content-----');
console.log('video Id: ', result.videoId);
console.log('---------------------------');