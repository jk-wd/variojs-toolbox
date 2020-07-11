
const { ipcMain, dialog, shell } = require('electron');
const fs = require('fs')

module.exports = (port) => {
    ipcMain.on('GET_PORT', (event, data) => {
        event.returnValue = port;
    });

    ipcMain.on('OPEN_BROWSER', (event, data) => {
        shell.openExternal(data)
        event.returnValue = true;
    });
    ipcMain.on('SHOW_MESSAGE', (event, data) => {
        dialog.showMessageBox(null, {
            message: data,
        });
        event.returnValue = true;
    });
    ipcMain.on('LOAD_FILE', (event, data) => {

        dialog.showOpenDialog({
            filters: [{
                name: 'JSON',
                extensions: ['json']
            }]
        }).then(({filePaths}) => {
            
            fs.readFile(filePaths[0], (error, data) => {
                if (error) {
                    dialog.showErrorBox('File save error', error.message);
                    return;
                }
                const animationData = JSON.parse(data);
                event.sender.send('UPDATE_ANIMATION_DATA', animationData)
            });
        }).catch((error)=> {
            dialog.showErrorBox('File save error', error.message);
        });
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
}
