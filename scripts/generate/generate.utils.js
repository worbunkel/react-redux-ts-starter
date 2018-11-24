const _ = require('lodash');

const convertToHyphenated = str => {
  if (_.includes(str, '-')) {
    return str.toLowerCase();
  }
  if (_.includes(str, '_')) {
    return str
      .split('_')
      .join('-')
      .toLowerCase();
  }
  const letters = _.split(str, '');
  const firstLetter = _.first(letters).toLowerCase();
  const camelCaseStr = _.concat(firstLetter, _.tail(letters)).join('');
  return _.replace(camelCaseStr, /([A-Z])/g, '-$1').toLowerCase();
};

const convertToCapitalized = str => {
  const hyphenatedStr = convertToHyphenated(str);
  return _.map(_.split(hyphenatedStr, '-'), _.capitalize).join('');
};

const convertToCamelCase = str => {
  const hyphenatedStr = convertToHyphenated(str);
  return _.map(_.split(hyphenatedStr, '-'), (val, index) => (_.isEqual(index, 0) ? val : _.capitalize(val))).join('');
};

const convertToLowerCaseSpaced = str => _.replace(convertToHyphenated(str), /-/g, ' ');

const convertToAllCaps = str => _.replace(convertToHyphenated(str), /-/g, '_').toUpperCase();

const insertInPositionAfterLine = insertArgs => {
  const { findStartSearchLine, insertText, lines, shouldInsertBeforeLine } = insertArgs;
  const afterLine = findStartSearchLine(lines);

  const insertLine = _.findIndex(lines, shouldInsertBeforeLine, afterLine + 1);

  lines.splice(insertLine, 0, insertText);
  return lines;
};

module.exports = {
  convertToCamelCase,
  convertToCapitalized,
  convertToHyphenated,
  convertToLowerCaseSpaced,
  convertToAllCaps,
  insertInPositionAfterLine,
};
