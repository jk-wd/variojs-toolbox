const WebSocket = require('ws');
import {calculatePageScroll} from 'variojs';
import socketConnect from '@socketserver/client/socket-connect.js';


const sendSiteData = (ws, variojs) => {
  const animationData = variojs.getFetchedAnimationData();
  if(!animationData) {
    return;
  }
  const domNodes = [].slice.call(document.querySelectorAll('[data-v]'));
  ws.send(JSON.stringify({
    action: 'siteData',
    payload: {
      animationData,
      siteUrl: window.location.href,
      placeholders: domNodes.reduce((result, domNode) => {
        const name = domNode.getAttribute('data-v');
        if(name && name!= "") {
          result.push(name) ;
        }
        return result;
      }, []),
    },
  }));
}

export default {
    init: async (variojs) => {
      const ws = await socketConnect();

      window.addEventListener('scroll', () => {
        ws.send(JSON.stringify({
          action: 'calculatePageScroll',
          payload: calculatePageScroll()
        }));
      });
      sendSiteData(ws, variojs)

      ws.addEventListener('message', function (event) {
        const data = event.data
        const dataParsed = JSON.parse(data);
        if(dataParsed.action === 'setAnimationData'){
          variojs.setAnimationData(dataParsed.payload)
        }
        if(dataParsed.action === 'getSiteData'){
          sendSiteData(ws, variojs)
        }
      });

    },

}