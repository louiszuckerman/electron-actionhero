'use strict';
const NUM_BACKGROUND_PROCS = 4;

const electron = require('electron');
const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window & actionhero from being garbage collected
let mainWindow, actionhero, backgrounds = [];
function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 800,
		height: 600
	});

	win.loadURL(`file://${process.env.PROJECT_ROOT}/public/chat.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	// if (process.platform !== 'darwin') {
	// 	app.quit();
	// }
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	process.env.PROJECT_ROOT = extractActionhero();
	actionhero = startActionhero((err, api) => {
		// Now that main is started, lets add more in the background
		for (var i = 0; i < NUM_BACKGROUND_PROCS; i++) {
			startActionheroBackground();
		}
		mainWindow = createMainWindow();
    });
});

function startActionhero(params, callback) {
	var actionheroPrototype = require('actionhero').actionheroPrototype;
	var actionhero = new actionheroPrototype();
	actionhero.start(params, callback);
	return actionhero;
}

function startActionheroBackground() {
	var bg = new electron.BrowserWindow({
		width: 800,
		height: 600,
		x: 100,
		y: 100,
		show: false
	});
	bg.loadURL(`file://${__dirname}/bg.html`);
	backgrounds.push(bg);
}

function extractActionhero() {
	var path = require('path');
	var ah = 'actionhero';
	let appPath = app.getAppPath();
	var src = path.join(appPath, ah);
	let userData = app.getPath('userData');
	var dst = path.join(userData, ah);
	console.log('extracting actionhero project from ' + src + ' to ' + dst);

	var fs = require('fs-extra');
	fs.emptyDirSync(dst);
	fs.copySync(src, dst, {
		filter: function (path) {
			return ! path.endsWith('.gitkeep');
		}
	});

	var nodefs = require('fs');
	let nodeModules = 'node_modules';
	nodefs.symlinkSync(path.join(appPath, nodeModules), path.join(dst, nodeModules));

	return dst;
}
