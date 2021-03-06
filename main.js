// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, shell} = require('electron');
const Glitch = require('./glitch');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 800, height: 600});

	// and load the index.html of the app.
	mainWindow.loadFile('index.html');

	

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});

// ipcMain
ipcMain.on('exit', (event, arg) => {
	if (arg == 'exit') {
		app.quit();
		mainWindow = null;
		return false;
	}
})
ipcMain.on('glitch-images', (event, arg) => {
	console.log(arg); // prints "ping"
	if (arg !== '') {
		console.log('we are looking to glitch this folder:', arg);
		if (arg[arg.length - 1] === '/') {
			new Glitch(arg);
			shell.openItem(arg);
			event.returnValue = 'done';
		} else {
			event.returnValue = 'error';
			event.sender.send('error', 'Error: You forgot a trailing slash.');
		}
	} else {
		event.returnValue = 'done';
	}
});
