# Chrome Extension Angular Boilerplate

Chrome Extension starter using Nx workspace and Angular.

## 📖 Table of Contents

- [Getting Started](#🚀-Getting-Started)
- [Project Structure](#🏗-Project-Structure)
- [Commands](#🕹-Commands)
- [License](#📜-License)

## 🚀 Getting Started

1. Install dependencies

```shell
yarn install
```

2. Run development live reload

```shell
yarn start:dev
```

3. Open Chrome browser
4. Go to this url: `chrome://extensions`
5. Click on `"Developer mode"`
6. Click on `"Load unpacked"`
7. Choose the `extension` directory from this root directory
8. Yay, you did it! 😏
9. Now update the code as you want! 😛

> ℹ️ More info about developing Chrome extension can be found [here](https://developer.chrome.com/docs/extensions/mv3)

## 🏗 Project Structure

So the purpose is to take the advantage of the type system of TypeScript and to use the power of Nx workspace to create multiple applications with the powerful framework Angular!

So we have 6 components:

1. Metadata (`components/metadata`) - manifest and static assets for extensions
2. Popup (`components/popup`) - used for the upper popup
3. Options (`components/options`) - used for the options page
4. DevTools Panel (`components/devtools-panel`) - used for the devtools panel
5. Background Script (`components/background-script`) - used for run background job [readmore](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers)
6. Content Script (`components/content-script`) - script run in the context of web pages [readmore](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts)

In every Chrome extension we have background script that communicate with the content scripts, which can be found in `components/background-script/src/main.ts`.

We are also can inject content script which can be found in `components/content-script/src/main.ts`.

All the applications have already the Chrome types so can just use `chrome` and the editor will recognize it.

## 🕹 Commands

Start with development configuration

```shell
yarn start:dev
```

Start with production configuration.

```shell
yarn start:prod
```

Build with development configuration.

```shell
yarn build:dev
```

Build with production configuration.

```shell
yarn build:prod
```

Run unit test

```shell
yarn test:unit
```

Run test e2e

```shell
yarn test:e2e
```

Run test on ci

```shell
yarn test:ci
```

## 📜 License

[MIT](LICENSE.txt)
