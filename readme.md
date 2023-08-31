## Basic steps to implement this repo:

**Step-1:** Git clone

**Step-2:** Run command "npm i" in root folder

**Step-3:** Run command "npm run dev" to run the typescript file.

Works Fine.. DB gets connected and the localhost:5000 can be hit and recieve a response


************

## Error explanation:

**Step-1:** Run "npx tsc" to compile the TS files to JS. Since the outDir is set "./dist", the compiled files are found in "./dist" folder.

**Step-2:** Run "npm start" command to run the compiled JS file in the "./dist/workspaces/package2/index.js" (js version of ./workspaces/package2/index.ts)

**Error:** Here it throws an error ->

*Cannot find module '/Users/jayasurya.karthikeyan/Desktop/Node/TS-monorepo/node_modules/@ts-monorepo/package1/index.js'. Please verify that the package.json has a valid "main" entry

    at Object.<anonymous> (/Users/jayasurya.karthikeyan/Desktop/Node/TS-monorepo/dist/workspaces/package2/index.js:17:36)
    at Module._compile (node:internal/modules/cjs/loader:1256:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
    at Module.load (node:internal/modules/cjs/loader:1119:32) {

code: 'MODULE_NOT_FOUND',
path: '/Users/jayasurya.karthikeyan/Desktop/Node/TS-monorepo/node_modules/@ts-monorepo/package1/package.json',
requestPath: '@ts-monorepo/package1'
}*

:(