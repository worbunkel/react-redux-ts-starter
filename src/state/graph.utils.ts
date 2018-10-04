import * as _ from 'lodash';
import { NumericObject } from '../utility.types';

export const extent = <T extends NumericObject>(
  arr: (T | number)[],
  accessor: (d: T | number | string) => number,
  padPercent: number = 0,
) => {
  const values = _.map(arr, accessor);
  const min: number = _.min(values);
  const max: number = _.max(values);
  const range = max - min;
  const padding = padPercent * range;

  return [min - padding, max + padding];
};
