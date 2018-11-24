# React Redux Typescript Starter

- **[React](https://facebook.github.io/react/)** (16.x)
- **[Webpack](https://webpack.js.org/)** (4.x)
- **[Typescript](https://www.typescriptlang.org/)** (3.x)
- **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** using [React Hot Loader](https://github.com/gaearon/react-hot-loader) (4.x)
- [Babel](http://babeljs.io/) (7.x)
- [SASS](http://sass-lang.com/)
- [Jest](https://facebook.github.io/jest/) - Testing framework for React applications
- Production build script
- Image loading/minification using [Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader)
- Typescript compiling using [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader) (5.x)
- [Prettier](https://github.com/prettier/prettier)
- Code quality (linting) for Typescript and SASS/CSS.
- [Husky](https://github.com/typicode/husky) for git hooks.

## Installation

1. Clone/download repo
2. `brew install watchman`
3. `npm install`
4. Install prettier for VS Code
5. Set VS Code to format on save

## Usage

**Development**

`npm run start`

- Build app continuously (HMR enabled)
- App served @ `http://localhost:8080`

### Generating Redux Files

```
// Basic Usage
npm run gen branchOfStateName actionName

// For components/pages:
npm run gen components/componentName actionName

// Create multiple actions at once:
npm run gen branchOfState actionOne actionTwo actionThree
```

**Production**

`npm run start-prod`

- Build app once (HMR disabled)
- App served @ `http://localhost:3000`

---

### Forked from https://github.com/vikpe/react-webpack-typescript-starter
