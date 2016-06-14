# Electron-Actionhero

The goal of this project is to have a desktop application built with Electron where all the real work happens in the bundled Actionhero

Here's what we have so far:

- Bootstrapped this project with [electron-boilerplate](https://github.com/sindresorhus/electron-boilerplate)
- Installed [actionhero](http://www.actionherojs.com/) via NPM
- Generated the sample Actionhero project structure and moved it into the `actionhero` directory
- Added some lines to `index.js` to boot up actionhero looking in the `actionhero` directory for its configuration
- Pointed the main window at `actionhero/public/chat.html`
- Edited the resource paths in `chat.html` to be relative to that file
- Changed the default server address in `actionhero/public/javascript/actionheroClient.js` (line 3240) to be `http://localhost:8080` instead of `window.location.origin`
- Set the main window size to 800x600

## Dev

```
$ npm install
```

### Run

```
$ npm start
```

### Build

```
$ npm run build
```

Builds the app for macOS, Linux, and Windows, using [electron-packager](https://github.com/electron-userland/electron-packager).


## License

MIT © [<%= name %>](<%= website %>)
