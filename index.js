'use strict';
const electron = require('electron');
const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window & actionhero from being garbage collected
let mainWindow, actionhero, bg;
var redis;
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
		startActionheroBackground();
		startActionheroBackground();
		startActionheroBackground();
		startActionheroBackground();
		mainWindow = createMainWindow();
    });
});

function startActionhero(params, callback) {
	var actionheroPrototype = require('actionhero').actionheroPrototype;
	var actionhero = new actionheroPrototype();
	actionhero.start(params, callback);
	return actionhero;
}

function startActionheroBackground(id) {
	bg = new electron.BrowserWindow({
		width: 800,
		height: 600,
		x: 100,
		y: 100
	});
	bg.loadURL(`file://${__dirname}/bg.html`);
}

function extractActionhero() {
	var path = require('path');
	var ah = 'actionhero';
	var src = path.join(app.getAppPath(), ah);
	var dst = path.join(app.getPath('userData'), ah);
	console.log('extracting actionhero project from ' + src + ' to ' + dst);

	var fs = require('fs-extra');
	fs.emptyDirSync(dst);
	fs.copySync(src, dst, {
		filter: function (path) {
			return ! path.endsWith('.gitkeep');
		}
	});
	return dst;
}
