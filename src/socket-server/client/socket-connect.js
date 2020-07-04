var ws;

export default async (port) => {
  if(ws) {
    return ws;
  }
  return new Promise((resolve) => {
    ws = new WebSocket(`ws://localhost:${port}`);
    ws.addEventListener('open', function (event) {
      resolve(ws);
    });
  });
  
}