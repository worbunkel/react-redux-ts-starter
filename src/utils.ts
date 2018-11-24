import * as _ from 'lodash';
import * as NumberAbbreviator from 'number-abbreviate';

export const assertUnreachable = (_x: never) => _x;

export const boundValue = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const abbreviator = new NumberAbbreviator(['K', 'M', 'B', 'T']);

export const abbreviate = (num: number, sigFigs: number = 1) => abbreviator.abbreviate(num, sigFigs);

export const convertToCapitalized = (str, isSpaced = false) => {
  const hyphenatedStr = _.kebabCase(str);

  return _.map(_.split(hyphenatedStr, '-'), _.capitalize).join(isSpaced ? ' ' : '');
};

export const convertToAllCaps = str => _.replace(_.kebabCase(str), /-/g, '_').toUpperCase();
