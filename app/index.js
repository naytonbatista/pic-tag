const { BrowserWindow, app } = require('electron');
const path = require('path');
const url = require('url');
const { exec } = require('child_process');

if (process.env.NODE_ENV == 'development') {
    require('electron-reload')(__dirname);
}

exec(path.join(__dirname, 'start_server.bat'), (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});

function createWindow() {

    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Pic Tag App',

    });


    let file = url.format({
        pathname: path.join(__dirname, 'view/index.html'),
        protocol: 'file',

    });


    if (process.env.NODE_ENV == 'development') {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.setIcon(path.join(__dirname, 'napoli-logo.png'), 'N Systems');
    //mainWindow.setMenu(null);
    mainWindow.loadURL(file);
}

app.on('ready', createWindow);