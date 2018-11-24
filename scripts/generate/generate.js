const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const {
  convertToCamelCase,
  convertToCapitalized,
  convertToHyphenated,
  convertToLowerCaseSpaced,
  insertInPositionAfterLine,
} = require('./generate.utils');

const { generateAction } = require('./generate-action');

const thisFilePath = _.initial(_.split(_.nth(process.argv, 1), '/')).join('/');
const pathArg = 'src/state/' + _.nth(process.argv, 2);
const actions = _.slice(process.argv, 3);

if (_.size(actions) === 0) {
  throw new Error('No action names passed in.\nUsage: npm run gen path/to/newFolder actionName');
}

const pathToFile = _.initial(_.split(pathArg, '/')).join('/') + '/';
const nameParam = _.last(_.split(pathArg, '/'));
const relativePath = _.initial(_.slice(_.split(pathArg, '/'), 2))
  .map(val => val + '/')
  .join('/');

const hyphenatedNameParam = convertToHyphenated(nameParam);
const capitalizedNameParam = convertToCapitalized(nameParam);
const camelCaseNameParam = convertToCamelCase(nameParam);
const lowerCaseSpacedNameParam = convertToLowerCaseSpaced(nameParam);

let pathToTemplates = path.join(thisFilePath, 'templates') + '/';
let actionsTemplate;
try {
  actionsTemplate = fs.readFileSync(`${pathToTemplates}actions.ts.template`, 'utf-8');
} catch (e) {
  console.error(e);
  try {
    pathToTemplates = './node_modules/generate-redux-ts/dist/templates/';
    fs.readFileSync(`${pathToTemplates}actions.ts.template`, 'utf-8');
    actionsTemplate = fs;
  } catch (e) {
    console.error(e);
    throw new Error('Error reading files');
  }
}

const reducerSpecTemplate = fs.readFileSync(`${pathToTemplates}reducer.spec.ts.template`, 'utf-8');
const reducerTemplate = fs.readFileSync(`${pathToTemplates}reducer.ts.template`, 'utf-8');
const stateTemplate = fs.readFileSync(`${pathToTemplates}state.ts.template`, 'utf-8');
const componentTemplate = fs.readFileSync(`${pathToTemplates}component.tsx.template`, 'utf-8');
const styleTemplate = fs.readFileSync(`${pathToTemplates}style.scss.template`, 'utf-8');

const templates = [
  { name: 'actions.ts', template: actionsTemplate },
  { name: 'reducer.spec.ts', template: reducerSpecTemplate },
  { name: 'reducer.ts', template: reducerTemplate },
  { name: 'state.ts', template: stateTemplate },
  { name: 'component.tsx', template: componentTemplate },
  { name: 'scss', template: styleTemplate },
];

const replaceTemplates = templateObj => {
  const { template } = templateObj;
  let resTemplate = _.replace(template, /<grts-hyphenated>/g, hyphenatedNameParam);
  resTemplate = _.replace(resTemplate, /<grts-c>/g, capitalizedNameParam);
  resTemplate = _.replace(resTemplate, /<grts-cc>/g, camelCaseNameParam);
  resTemplate = _.replace(resTemplate, /<grts-lc-spaced>/g, lowerCaseSpacedNameParam);
  resTemplate = _.replace(
    resTemplate,
    /<grts-relative-depth>/g,
    _.times(_.size(_.split(relativePath, '/')) - 1, () => '../'),
  );
  return { name: templateObj.name, template: resTemplate };
};

const resultTemplates = _.map(templates, replaceTemplates);

const generateFiles = () => {
  _.each(resultTemplates, resTemplate => {
    try {
      const folders = _.split(pathToFile + hyphenatedNameParam, '/');
      folders.forEach((_folder, index) => {
        try {
          fs.mkdirSync('./' + _.slice(folders, 0, index + 1).join('/'));
        } catch (e) {
          if (!_.isEqual(e.code, 'EEXIST')) {
            console.error(e);
            throw new Error('Error creating folders');
          }
        }
      });
      fs.writeFileSync(
        path.join(process.cwd(), pathToFile, hyphenatedNameParam, hyphenatedNameParam + '.' + resTemplate.name),
        resTemplate.template,
        {
          encoding: 'utf-8',
          flag: 'wx',
        },
      );
    } catch (e) {
      if ((_.isEqual(e.code), 'EEXIST')) {
        throw e;
      }
      console.error(e);
      throw new Error('Error writing files');
    }
  });

  const rootReducerFilePath = path.join(process.cwd(), 'src/state/root-reducer.ts');
  const rootReducerText = fs.readFileSync(rootReducerFilePath, 'utf-8');
  let rootReducerTextLines = _.split(rootReducerText, '\n');

  const importText = `import { ${capitalizedNameParam}State } from './${relativePath}${hyphenatedNameParam}/${hyphenatedNameParam}.state';
import { ${camelCaseNameParam}Reducer } from './${relativePath}${hyphenatedNameParam}/${hyphenatedNameParam}.reducer';`;

  rootReducerTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line => true,
    findStartSearchLine: lines => _.findLastIndex(lines, line => _.includes(line, 'import')),
    insertText: importText,
    lines: rootReducerTextLines,
  });

  rootReducerTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line => _.orderBy([line.trim(), camelCaseNameParam])[0] === camelCaseNameParam,
    findStartSearchLine: lines => _.findIndex(lines, line => _.includes(line, 'interface RootState')),
    insertText: `  ${camelCaseNameParam}: ${capitalizedNameParam}State;`,
    lines: rootReducerTextLines,
  });

  rootReducerTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line => _.orderBy([line.trim(), camelCaseNameParam])[0] === camelCaseNameParam,
    findStartSearchLine: lines => _.findIndex(lines, line => _.includes(line, 'combineReducers(')),
    insertText: `  ${camelCaseNameParam}: ${camelCaseNameParam}Reducer,`,
    lines: rootReducerTextLines,
  });

  fs.writeFileSync(rootReducerFilePath, rootReducerTextLines.join('\n'), 'utf-8');

  const rootActionFilePath = path.join(process.cwd(), 'src/state/root-action.ts');
  const rootActionText = fs.readFileSync(rootActionFilePath, 'utf-8');
  let rootActionTextLines = _.split(rootActionText, '\n');

  const actionsImportText = `import { ${capitalizedNameParam}Actions } from './${relativePath}${hyphenatedNameParam}/${hyphenatedNameParam}.actions';`;

  rootActionTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line => true,
    findStartSearchLine: lines => _.findLastIndex(lines, line => _.includes(line, 'import')),
    insertText: actionsImportText,
    lines: rootActionTextLines,
  });

  rootActionTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line => _.orderBy([line.trim(), camelCaseNameParam])[0] === camelCaseNameParam,
    findStartSearchLine: lines => _.findIndex(lines, line => _.includes(line, 'export const actions')),
    insertText: `  ${camelCaseNameParam}: ${capitalizedNameParam}Actions,`,
    lines: rootActionTextLines,
  });

  fs.writeFileSync(rootActionFilePath, rootActionTextLines.join('\n'), 'utf-8');
};

try {
  generateFiles();
  console.log('Folder and files generated, continuing to generate any actions.');
} catch (e) {
  if (!_.isEqual(e.code, 'EEXIST')) {
    console.error(e);
    throw new Error('ERROR GENERATING FILES');
  }
  console.log('Files already exist, continuing to generate any actions.');
}

_.each(actions, action => generateAction(action, pathToFile, nameParam));
