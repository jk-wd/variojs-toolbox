const WebSocket = require('ws');
import {calculatePageScroll} from 'variojs';
import socketConnect from '@socketserver/client/socket-connect.js';

export default {
    init: async (variojs) => {
      const ws = await socketConnect();

      window.addEventListener('scroll', () => {
        ws.send(JSON.stringify({
          action: 'calculatePageScroll',
          payload: calculatePageScroll()
        }));
      });

      ws.addEventListener('message', function (event) {
        const data = event.data
        const dataParsed = JSON.parse(data);
        if(dataParsed.action === 'getInitialData'){
          const domNodes = [].slice.call(document.querySelectorAll('[data-v]'));
          ws.send(JSON.stringify({
            action: 'initialData',
            payload: {
              animationData: variojs.getAnimationData(),
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
      });
      ws.addEventListener('message', function (event) {
        const data = event.data
        const dataParsed = JSON.parse(data);
        if(dataParsed.action === 'setAnimationData'){
          console.log("HERE", dataParsed.payload);
          variojs.setAnimationData(dataParsed.payload)
        }
      });
      ws.send(JSON.stringify({
        action: 'pageReady',
        payload: {},
      }));
    },

}