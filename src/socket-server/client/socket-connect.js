var ws;

export default async () => {
  if(ws) {
    return ws;
  }
  return new Promise((resolve) => {
    ws = new WebSocket('ws://localhost:8081');
    ws.addEventListener('open', function (event) {
      resolve(ws);
    });
  });
  
}