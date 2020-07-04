const { ipcMain, dialog } = require('electron');
const initSocketServer = require('./src/socket-server/index')
const { app, BrowserWindow } = require('electron')
const fs = require('fs')

let port = undefined;

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.webContents.openDevTools()
  
  // and load the index.html of the app.
  win.loadFile('./app/index.html')
  win.maximize();
  win.show();
}

initSocketServer((portArg) => {
    port = portArg;
    app.whenReady().then(createWindow)
})


ipcMain.on('GET_PORT', (event, data) => {
    event.returnValue = port;
});

ipcMain.on('SAVE_FILE', (event, data) => {
    dialog.showSaveDialog({
        filters: [{
            name: 'JSON',
            extensions: ['json']
        }]
    }).then(({filePath}) => {
        if (filePath === undefined) {
            return;
          }
    
        fs.writeFile(filePath, data, (error) => {
        if (!error) {
            dialog.showMessageBox({
            message: 'The file has been saved!',
            buttons: ['OK']
            });
        } else {
            dialog.showErrorBox('File save error', error.message);
        }
        });
    }).catch((error)=> {
        dialog.showErrorBox('File save error', error.message);
    });
});