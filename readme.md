# Electron-Actionhero

The goal of this project is to have a desktop application built with Electron where all the real work happens in the bundled Actionhero

Here's what we have so far:

- Bootstrapped this project with [electron-boilerplate](https://github.com/sindresorhus/electron-boilerplate)
- Installed [actionhero](http://www.actionherojs.com/) via NPM
- Generated the sample Actionhero project structure and moved it into the `actionhero` directory
- Added some lines to `index.js` to boot up actionhero looking in the `actionhero` directory for its configuration
- Pointed the main window at `actionhero/public/chat.html`
- Edited the resource paths in `chat.html` to be relative to that file
- Set the hostname for Actionhero server to `http://localhost:8080` in `chat.html`
- Set the main window size to 800x600
- Extract `actionhero` directory from installation bundle to user writable directory and boot actionhero from there

We can now run from an ASAR-packaged electron app.  Thanks to the actionhero team for helping fix a couple small bugs!
## Dev

```
$ npm install
```

### Run

```
$ npm start
```

### Build

Package without using ASAR

```
$ npm run build
```

Package using ASAR

```
$ npm run build-asar
```


Builds the app for macOS-x64, using [electron-packager](https://github.com/electron-userland/electron-packager).

Will expand support for Windows & Linux soon.

## License

MIT © [Louis Zuckerman](http://github.com/semiosis)
