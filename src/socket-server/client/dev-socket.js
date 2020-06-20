const WebSocket = require('ws');
import socketConnect from '@socketserver/client/socket-connect.js';

let receivedData = false;
export default {
    init: async (initCallback, scrollCallback) => {
      const ws = await socketConnect();
      ws.addEventListener('message', function (event) {
        const data = event.data;
        const dataParsed = JSON.parse(data);
        if(dataParsed.action === 'siteData'){
          receivedData = true;
          initCallback(dataParsed.payload);
        }
        if(dataParsed.action === 'calculatePageScroll'){
            scrollCallback(dataParsed.payload);
        }
      });
      ws.send(JSON.stringify({
        action: 'getSiteData'
      }));

    },
    updateAnimationData: async (animationData) => {
        const ws = await socketConnect();
        ws.send(JSON.stringify({
            action: 'updateAnimationData',
            payload: animationData,
          }));
      }
}