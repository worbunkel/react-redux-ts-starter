const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const {
  convertToCamelCase,
  convertToCapitalized,
  convertToHyphenated,
  convertToLowerCaseSpaced,
  convertToAllCaps,
  insertInPositionAfterLine,
} = require('./generate.utils');

const generateAction = (newActionName, pathToFile, nameParam) => {
  const hyphenatedNameParam = convertToHyphenated(nameParam);
  const capitalizedNameParam = convertToCapitalized(nameParam);
  const camelCaseNameParam = convertToCamelCase(nameParam);
  const lowerCaseSpacedNameParam = convertToLowerCaseSpaced(nameParam);
  const upperCaseNameParam = convertToAllCaps(nameParam);

  const hyphenatedActionName = convertToHyphenated(newActionName);
  const capitalizedActionName = convertToCapitalized(newActionName);
  const camelCaseActionName = convertToCamelCase(newActionName);
  const lowerCaseSpacedActionName = convertToLowerCaseSpaced(newActionName);
  const upperCaseActionName = convertToAllCaps(newActionName);

  // ACTIONS FILE
  const actionsFilePath = path.join(
    process.cwd(),
    `${pathToFile}${hyphenatedNameParam}/${hyphenatedNameParam}.actions.ts`,
  );
  const actionsFileText = fs.readFileSync(actionsFilePath, 'utf-8');
  let actionsFileTextLines = _.split(actionsFileText, '\n');

  actionsFileTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line =>
      _.orderBy([line.trim(), upperCaseActionName])[0] === upperCaseActionName || _.includes(line, '}'),
    findStartSearchLine: lines => _.findIndex(lines, line => _.includes(line, `${capitalizedNameParam}ActionType`)),
    insertText: `  ${upperCaseActionName} = '${camelCaseNameParam}/${upperCaseActionName}',`,
    lines: actionsFileTextLines,
  });

  const exportLine = `const ${camelCaseActionName} = () => ({`;
  actionsFileTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line =>
      (_.orderBy([line.trim(), exportLine])[0] === exportLine && _.includes(line, 'const')) ||
      _.includes(line, `export const ${capitalizedNameParam}Actions`),
    findStartSearchLine: lines => _.findIndex(lines, line => _.includes(line, `${capitalizedNameParam}Actions`)),
    insertText: `${exportLine}
  type: ${capitalizedNameParam}ActionType.${upperCaseActionName},
  payload: null as never,
});
`,
    lines: actionsFileTextLines,
  });

  actionsFileTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line => _.orderBy([line.trim(), camelCaseActionName])[0] === camelCaseActionName,
    findStartSearchLine: lines =>
      _.findIndex(lines, line => _.includes(line, `export const ${capitalizedNameParam}Actions`)),
    insertText: `  ${camelCaseActionName},`,
    lines: actionsFileTextLines,
  });

  fs.writeFileSync(actionsFilePath, actionsFileTextLines.join('\n'), 'utf-8');

  // COMPONENT FILE
  const componentFilePath = path.join(
    process.cwd(),
    `${pathToFile}${hyphenatedNameParam}/${hyphenatedNameParam}.component.tsx`,
  );
  const componentFileText = fs.readFileSync(componentFilePath, 'utf-8');
  let componentFileTextLines = _.split(componentFileText, '\n');

  componentFileTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line =>
      _.orderBy([line.trim(), camelCaseActionName])[0] === camelCaseActionName || _.includes(line, '}'),
    findStartSearchLine: lines => _.findIndex(lines, line => _.includes(line, `const mapDispatchToProps`)),
    insertText: `  ${camelCaseActionName}: () => dispatch(${capitalizedNameParam}Actions.${camelCaseActionName}()),`,
    lines: componentFileTextLines,
  });

  componentFileTextLines = _.join(componentFileTextLines, '\n')
    .split('\n\n\n')
    .join('\n\n')
    .split('\n');

  fs.writeFileSync(componentFilePath, componentFileTextLines.join('\n'), 'utf-8');

  // REDUCER FILE
  const reducerFilePath = path.join(
    process.cwd(),
    `${pathToFile}${hyphenatedNameParam}/${hyphenatedNameParam}.reducer.ts`,
  );
  const reducerFileText = fs.readFileSync(reducerFilePath, 'utf-8');
  let reducerFileTextLines = _.split(reducerFileText, '\n');

  reducerFileTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line => _.includes(line, 'default:'),
    findStartSearchLine: lines =>
      _.findIndex(lines, line => _.includes(line, `export const ${camelCaseNameParam}Reducer`)),
    insertText: `    case ${capitalizedNameParam}ActionType.${upperCaseActionName}:
      return on${capitalizedActionName}(prevState, action);`,
    lines: reducerFileTextLines,
  });

  reducerFileTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: () => true,
    findStartSearchLine: lines => _.size(lines) - 1,
    insertText: `
const on${capitalizedActionName} = (prevState: ${capitalizedNameParam}State, action: ${capitalizedNameParam}Action): ${capitalizedNameParam}State => ({
  ...prevState,
});`,
    lines: reducerFileTextLines,
  });

  reducerFileTextLines = _.join(reducerFileTextLines, '\n')
    .split('\n\n\n')
    .join('\n\n')
    .split('\n');

  fs.writeFileSync(reducerFilePath, reducerFileTextLines.join('\n'), 'utf-8');

  // REDUCER SPEC FILE
  const reducerSpecFilePath = path.join(
    process.cwd(),
    `${pathToFile}${hyphenatedNameParam}/${hyphenatedNameParam}.reducer.spec.ts`,
  );
  const reducerSpecFileText = fs.readFileSync(reducerSpecFilePath, 'utf-8');
  let reducerSpecFileTextLines = _.split(reducerSpecFileText, '\n');

  reducerSpecFileTextLines = insertInPositionAfterLine({
    shouldInsertBeforeLine: line => line === '});',
    findStartSearchLine: lines => 0,
    insertText: `
  describe(\`on \${ ${capitalizedNameParam}ActionType.${upperCaseActionName}\}\`, () => {
    it('should ', () => {
      const prevState = Default${capitalizedNameParam}State();
      const testAction = ${capitalizedNameParam}Actions.${camelCaseActionName}();

      const newState = ${camelCaseNameParam}Reducer(prevState, testAction);

      expect(newState).toEqual(prevState);
    });
  });`,
    lines: reducerSpecFileTextLines,
  });

  reducerSpecFileTextLines = _.join(reducerSpecFileTextLines, '\n')
    .split('\n\n\n')
    .join('\n\n')
    .split('\n');

  fs.writeFileSync(reducerSpecFilePath, reducerSpecFileTextLines.join('\n'), 'utf-8');
};

module.exports = {
  generateAction,
};
