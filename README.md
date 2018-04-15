# Typescript - Hot Module Replacement Failure

This repo is configured to demonstrate an extremely simple example of HMR. The default state uses HMR with just JS (no loaders). It is easily reconfigured to use 2 typescript loaders, `ts-loader` and `awesome-typescript-loader`.

## Reproducing HMR failure


### JS HMR Baseline
First run the app as-is and see how HMR works with vanilla js:

1. `$ npm install && npm start`
2. Go to [http://localhost:8080](http://localhost:8080)
3. Open console in dev tools
4. Notice logging statement (`Initial value:`) and HMR init:
```
    [HMR] Waiting for update signal from WDS...
    Initial value: initial value
    [WDS] Hot Module Replacement enabled.
```
5. Change the string in `./src/exports-string.js`
6. Notice HMR update and new logged string in console (`New value:`):
```
    [WDS] App updated. Recompiling...
    [WDS] App hot update...
    [HMR] Checking for updates on the server...
    New value: new value
    [HMR] Updated modules:
    [HMR]  - ./src/exports-string.js
    [HMR] App is up to date.
```
7. Repeat steps 5 and 6 a few times to see that HMR works fine

### `awesome-typescript-loader` HMR Failure
1. Change both src `.js` file extensions to `.ts`
2. Change webpack config's entry from `./src/index.js` to `./src/index.ts`
3. Start dev server (`$ npm start`) and notice expected initial log output
4. Change the exported string in `./src/exports-string.ts`
5. Notice HMR update and that the logged value hasn't changed:
```
[WDS] App updated. Recompiling...
[WDS] App hot update...
[HMR] Checking for updates on the server...
New value: initial value
[HMR] Updated modules:
[HMR]  - ./src/exports-string.ts
[HMR] App is up to date.
```
6. Repeat steps 4 and 5 and notice the module gets updated, but the app's log statement isn't run again
```
[WDS] App updated. Recompiling...
[WDS] App hot update...
[HMR] Checking for updates on the server...
[HMR] Updated modules:
[HMR]  - ./src/exports-string.ts
[HMR] App is up to date.
```

### `ts-loader` HMR Failure
1. Change `awesome-typescript-loader` in webpack file to `ts-loader`
2. Start dev server (`npm start`) and notice same output with initial value: `Initial Value: initial value`
3. Change the export string again
4. This step seems to be inconsistently one problem or another:
  - Page reloads as if there was no acceptance of rebuilt module (more often this is the case)
  - HMR succeeds, but initial value from step 2 is logged again: `New value: initial value`
