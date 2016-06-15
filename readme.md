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

Issues:

Actionhero doesn't work when using ASAR packaging for two reasons
- [Bug in electron](https://github.com/electron/electron/issues/5454) when actionhero lists files in an ASAR
subdirectory with a trailing separator.  Example: /foo/app.asar/bar/, electron produces a listing of /foo/app.asar
https://github.com/evantahler/actionhero/pull/870
- Actionhero tries to create its log directory during config loading.  It loads its default config first, and tries
to create a log directory there, even if that's not where the log will ultimately be written.  If Actionhero is
installed on a read-only filesystem, like an ASAR, this causes a crash.
https://github.com/evantahler/actionhero/pull/871

I'm working with the Actionhero community to resolve these issues.

## Dev

```
$ npm install
```

### Run

```
$ npm start
```

### Build

Package without using ASAR (works)

```
$ npm run build
```

Package using ASAR (broken)

```
$ npm run build-asar
```


Builds the app for macOS, Linux, and Windows, using [electron-packager](https://github.com/electron-userland/electron-packager).


## License

MIT © [Louis Zuckerman](http://github.com/semiosis)
