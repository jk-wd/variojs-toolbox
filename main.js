const initSocketServer = require('./src/socket-server/index')
const { app, BrowserWindow } = require('electron')
const init = require('./main-shared')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  // and load the index.html of the app.
  win.loadFile('./index.html')
  win.maximize();
  win.show();
}

initSocketServer((port) => {
    app.whenReady().then(createWindow)
    init(port);
})
