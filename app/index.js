const { BrowserWindow, app } = require('electron');
const path = require('path');
const url = require('url');
const { exec} = require('child_process');

exec(path.join(__dirname, 'start_server.bat'), (err, stdout, stderr)=> {
    if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
});

function createWindow() {

    let mainWindow = new BrowserWindow({ 
        width: 800, 
        height: 600 ,
        title:'Pic Tag App'
    });

    let file = url.format({
        pathname: path.join(__dirname, 'view/index.html'),
        protocol: 'file',
                
    });

    mainWindow.loadURL(file);
}

app.on('ready', createWindow);