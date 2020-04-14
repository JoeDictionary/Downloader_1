const electron = require('electron');
const { app, BrowserWindow } = electron;
const url = require('url');
const path = require('path');



let win;
// Listen for app to be ready
app.on('ready', function () {
  // Create new window
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
	win.loadFile('mainWindow.html');
	

  /* 	win.loadURL(url.format({
		pathname: path.join(__dirname, "mainWindow.html"),
		protocol: "file:",
		slashes: true
	})) */

  // win.webContents.openDevTools();
  win.on('closed', function () {
    app.quit();
  });
});


console.log("OEUFFF")
