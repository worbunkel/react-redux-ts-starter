import * as dayjs from 'dayjs';
import { DateRange } from '../../../utility.types';
import { get454Calendar } from '../../../utils';

export type ForecastDayDatum = {
  day: number;
  date: number;
  thisYearActual?: number;
  lastYearActual: number;
  forecast: number;
  versusPlan: number;
  compPercent: number;
};

export type SalesForecastState = {
  isLoading: boolean;
  thirtyDayForecastData: ForecastDayDatum[];
  sixtyDayForecastData: ForecastDayDatum[];
  ninetyDayForecastData: ForecastDayDatum[];
  dateRanges: {
    calendar: DateRange[];
    fourFiveFour: DateRange[];
  };
  selectedDateRange: DateRange;
};

export const DefaultSalesForecastState = (currentYear: string = `${dayjs().year}`): SalesForecastState => ({
  isLoading: true,
  thirtyDayForecastData: [],
  sixtyDayForecastData: [],
  ninetyDayForecastData: [],
  dateRanges: {
    calendar: [],
    fourFiveFour: get454Calendar(currentYear),
  },
  selectedDateRange: null,
});
