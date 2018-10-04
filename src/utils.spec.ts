import dayjs = require('dayjs');
import * as _ from 'lodash';
import { DateRange } from './utility.types';
import { calc454JanuaryLength, calcFirst454Day, get454Calendar, MONTH454 } from './utils';

describe('calcFirst454Day', () => {
  it('should return a saturday', () => {
    const years = _.times(50, i => `${2018 + i}`); // 50 years starting in 2018

    const resultDays = _.map(years, year => calcFirst454Day(year).day());

    expect(_.every(resultDays, (res: number) => res === 6)).toBe(true);
  });
  it('should return the first saturday on or before February 1 for a given year', () => {
    const year = '2018';

    const result = calcFirst454Day(year);

    expect(result.format('MM/DD/YYYY')).toBe('01/27/2018');
  });
  it('should return Feb 1 if Feb 1 is a saturday', () => {
    const year = '2025';

    const result = calcFirst454Day(year);

    expect(result.format('MM/DD/YYYY')).toBe('02/01/2025');
  });
});

describe('calc454JanuaryLength', () => {
  it('should change january to five weeks if the last day of january is not the day before the next year', () => {
    const year = '2019';
    const months = _.times(12, () => ({ startDate: dayjs('12/28/2019'), endDate: dayjs('01/24/2020') }));
    const dateFormat = 'MM/DD/YYYY';

    const result = calc454JanuaryLength(year, months);

    const jan = result[MONTH454.JANUARY];
    const fiveWeeksBeforeJanEnd = jan.endDate
      .subtract(5, 'week')
      .add(1, 'day')
      .format(dateFormat);
    const janStartDate = jan.startDate.format(dateFormat);
    expect(fiveWeeksBeforeJanEnd).toBe(janStartDate);
  });
  it('should not manipulate the months passed in', () => {
    const year = '2019';
    const months = _.times(12, () => ({ startDate: dayjs('12/28/2019'), endDate: dayjs('01/24/2020') }));
    const monthsBefore = _.cloneDeep(months);

    calc454JanuaryLength(year, months);

    expect(months).toEqual(monthsBefore);
  });
});

describe('get454Calendar', () => {
  it('should return an array of 12 months', () => {
    const years = _.times(50, i => `${2018 + i}`); // 50 years starting in 2018

    const resultingCalendars = _.map(years, get454Calendar);

    expect(_.every(resultingCalendars, calendar => _.size(calendar) === 12)).toBe(true);
  });
  it('should have a start and end date for each month', () => {
    const years = _.times(50, i => `${2018 + i}`); // 50 years starting in 2018

    const resultingMonths = _.flatMap(years, get454Calendar);

    expect(_.every(resultingMonths, month => !!month.startDate && !!month.endDate)).toBe(true);
  });
  it('should follow the 4 5 4 pattern for numbers of weeks in each month', () => {
    const years = _.times(50, i => `${2018 + i}`); // 50 years starting in 2018
    const yearPattern = [4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4];
    const isFourFiveFourYear = (
      calendar: DateRange[], // Calculates if a calendar is a four five four year
    ) =>
      _.every(calendar, (month, index) => {
        const endDateMinusNumWeeks = month.endDate.subtract(yearPattern[index], 'week').add(1, 'day');
        const isJanuary = index === MONTH454.JANUARY;

        if (isJanuary) {
          const endDateMinusExtraWeek = endDateMinusNumWeeks.subtract(1, 'week');

          return month.startDate.isSame(endDateMinusNumWeeks) || month.startDate.isSame(endDateMinusExtraWeek);
        }

        return month.startDate.isSame(endDateMinusNumWeeks);
      });

    const resultingCalendars = _.map(years, get454Calendar);

    expect(_.every(resultingCalendars, isFourFiveFourYear)).toBe(true);
  });
});
