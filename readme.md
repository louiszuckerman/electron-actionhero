# Electron-Actionhero

## The `multithread` branch

This branch spawns multiple actionheros in background browserwindows.  They all share a single fakeredis by way of
 electron's remote module.

To facilitate running in a browserwindow I had to make changes to actionhero & node-resque...

- [actionhero change](https://github.com/semiosis/actionhero/commit/503d97b2324ec0fff8b1efc160158346181a6209) tests if we're in a browserwindow (electron render process) and if so, uses electron.remote.require to pull in the redis package
- [node-resque change](https://github.com/semiosis/node-resque/commit/095b3d8b8417f5bc6aca6222c42b6b647fe84027) explicitly loads node's timers module for setInterval, so that unref() can be called on the response.  Otherwise we get a browser setInterval which doesn't do unref().
- the `package.json` in this branch uses my forks in github for these dependencies

## Resume main readme...

The goal of this project is to have a desktop application built with Electron where all the real work happens in the bundled Actionhero

How this project was bootstrapped:

- Started with [electron-boilerplate](https://github.com/sindresorhus/electron-boilerplate)
- Installed [actionhero](http://www.actionherojs.com/) via NPM
- Generated the sample Actionhero project structure and moved it into the `actionhero` directory
- Edited the resource paths in `chat.html` to be relative to that file
- Set the hostname for Actionhero server to `http://localhost:8080` in `chat.html`

New code written to boot actionhero (in `/index.js`):

- `extractActionhero()`: extracts `/actionhero` to a user-writable folder.  see [actionhero/readme.md](actionhero#actionhero-project) for details.
- `startActionhero(callback)`: sets `PROJECT_ROOT` environment variable to extracted folder then starts up actionhero, which runs `callback` when finished booting.
- Hooked actionhero startup into the electron `ready` event and delayed creating the main window until after actionhero is started
- Pointed the main window at `actionhero/public/chat.html` in the extracted folder

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

## Acknowledgements

Many thanks to the Actionhero community.  We worked together to fix a couple bugs that had prevented actionhero from running in an ASAR package.  See [release notes](https://github.com/evantahler/actionhero/releases/tag/v13.4.3) for details.

Thanks also to Github for Electron and, well, for Github.

## License

MIT © [Louis Zuckerman](http://github.com/semiosis)
