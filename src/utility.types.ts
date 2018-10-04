import * as dayjs from 'dayjs';

export type NumericObject = {
  [s: string]: number;
};

export type Size = {
  width: number;
  height: number;
};

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void)
  ? I
  : never;

export type DateRange = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};
