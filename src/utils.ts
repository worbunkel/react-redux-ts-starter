import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import { DateRange } from './utility.types';

export const assertUnreachable = (_x: never) => _x;

export const calcFirst454Day = (year: string) => {
  const firstOfFebruary = dayjs(`${year}-02-01`);
  const isSaturday = firstOfFebruary.day() === WEEKDAY.SATURDAY;

  return isSaturday ? firstOfFebruary : firstOfFebruary.startOf('week').subtract(1, 'day');
};

export const calc454JanuaryLength = (year: string, months: DateRange[]) => {
  const lastEndDate = _.last(months).endDate;
  const isLastEndDateTheDayBeforeNextYear = _.isEqual(
    lastEndDate.add(1, 'day'),
    calcFirst454Day(`${parseInt(year) + 1}`),
  );
  const newMonths = _.cloneDeep(months);
  if (!isLastEndDateTheDayBeforeNextYear) {
    newMonths[_.size(newMonths) - 1].endDate = _.last(newMonths).endDate.add(1, 'week');
  }

  return newMonths;
};

export const get454Calendar = (year: string) => {
  const firstDay = calcFirst454Day(year);
  const quarterPattern = [4, 5, 4];
  const yearPattern = _.concat(quarterPattern, quarterPattern, quarterPattern, quarterPattern);
  const months = _.times(12, monthNum => ({
    startDate: firstDay.add(_.sum(_.slice(yearPattern, 0, monthNum)), 'week'),
    endDate: firstDay.add(_.sum(_.slice(yearPattern, 0, monthNum + 1)), 'week').subtract(1, 'day'),
  }));

  const finalMonths = calc454JanuaryLength(year, months);

  return finalMonths;
};

export enum MONTH {
  JANUARY = 0,
  FEBRUARY = 1,
  MARCH = 2,
  APRIL = 3,
  MAY = 4,
  JUNE = 5,
  JULY = 6,
  AUGUST = 7,
  SEPTEMBER = 8,
  OCTOBER = 9,
  NOVEMBER = 10,
  DECEMBER = 11,
}

export enum MONTH454 {
  FEBRUARY = 0,
  MARCH = 1,
  APRIL = 2,
  MAY = 3,
  JUNE = 4,
  JULY = 5,
  AUGUST = 6,
  SEPTEMBER = 7,
  OCTOBER = 8,
  NOVEMBER = 9,
  DECEMBER = 10,
  JANUARY = 11,
}

export enum WEEKDAY {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export enum WEEKDAY454 {
  SATURDAY = 0,
  SUNDAY = 1,
  MONDAY = 2,
  TUESDAY = 3,
  WEDNESDAY = 4,
  THURSDAY = 5,
  FRIDAY = 6,
}
