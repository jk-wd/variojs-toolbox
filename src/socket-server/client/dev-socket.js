const WebSocket = require('ws');
var pjson = require('node_modules/variojs/package.json');

import socketConnect from '@socketserver/client/socket-connect.js';
import {major, minor} from 'semver';

let receivedData = false;

const isVersionValid = (version) => {
  return (major(version) === major(pjson.version) && minor(version) === minor(pjson.version))
}

export default {
    init: async (initCallback, scrollCallback, port) => {
      const ws = await socketConnect(port);
      ws.addEventListener('message', function (event) {
        const data = event.data;
        const dataParsed = JSON.parse(data);
        if(dataParsed.action === 'siteData'){
          receivedData = true;
          if(!dataParsed.payload.animationData.variojsVersion || !isVersionValid(dataParsed.payload.animationData.variojsVersion)) {
            initCallback(dataParsed.payload, true)
          } else {
            initCallback(dataParsed.payload);
          }
          
        }
        if(dataParsed.action === 'calculatePageScroll'){
            scrollCallback(dataParsed.payload);
        }
      });
      ws.send(JSON.stringify({
        action: 'getAnimationData'
      }));

    },
    updateAnimationData: async (animationData, url) => {
        const ws = await socketConnect();
        ws.send(JSON.stringify({
            action: 'updateAnimationData',
            payload: {
              animationData,
              url
            },
          }));
      }
}