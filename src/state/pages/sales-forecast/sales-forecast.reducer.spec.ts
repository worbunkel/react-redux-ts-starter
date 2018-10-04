import * as dayjs from 'dayjs';
import {
  getThirtyDayForecastFailure,
  getThirtyDayForecastRequest,
  getThirtyDayForecastSuccess,
} from './sales-forecast.actions';
import { salesForecastReducer } from './sales-forecast.reducer';
import { DefaultSalesForecastState, ForecastDayDatum } from './sales-forecast.state';

describe('salesForecastReducer', () => {
  describe('on uncaught action', () => {
    it('should return the state', () => {
      const prevState = DefaultSalesForecastState();
      const testAction: any = { type: 'asdf', payload: {} };

      const newState = salesForecastReducer(prevState, testAction);

      expect(newState).toEqual(prevState);
    });
  });

  describe('on GET_THIRTY_DAY_FORECAST_REQUEST', () => {
    it('should set isLoading to true', () => {
      const prevState = DefaultSalesForecastState();
      prevState.isLoading = false;

      const newState = salesForecastReducer(prevState, getThirtyDayForecastRequest());

      expect(newState.isLoading).toEqual(true);
    });
  });

  describe('on GET_THIRTY_DAY_FORECAST_SUCCESS', () => {
    it('should set isLoading to false', () => {
      const prevState = DefaultSalesForecastState();
      const thirtyDayForecastData: ForecastDayDatum[] = [
        {
          day: 1,
          date: dayjs().unix(),
          compPercent: 100,
          forecast: 20,
          lastYearActual: 30,
          thisYearActual: 50,
          versusPlan: 20,
        },
      ];

      const newState = salesForecastReducer(prevState, getThirtyDayForecastSuccess(thirtyDayForecastData));

      expect(newState.isLoading).toEqual(false);
    });
    it('should set thirtyDayForecastData', () => {
      const prevState = DefaultSalesForecastState();
      const thirtyDayForecastData: ForecastDayDatum[] = [
        {
          day: 1,
          date: dayjs().unix(),
          compPercent: 100,
          forecast: 20,
          lastYearActual: 30,
          thisYearActual: 50,
          versusPlan: 20,
        },
      ];

      const newState = salesForecastReducer(prevState, getThirtyDayForecastSuccess(thirtyDayForecastData));

      expect(newState.thirtyDayForecastData).toEqual(thirtyDayForecastData);
    });
  });

  describe('on GET_THIRTY_DAY_FORECAST_FAILURE', () => {
    it('should set isLoading to false', () => {
      const prevState = DefaultSalesForecastState();

      const newState = salesForecastReducer(prevState, getThirtyDayForecastFailure());

      expect(newState.isLoading).toEqual(false);
    });
    it('should return the state', () => {
      const prevState = DefaultSalesForecastState();
      prevState.isLoading = false;

      const newState = salesForecastReducer(prevState, getThirtyDayForecastFailure());

      expect(newState).toEqual(prevState);
    });
  });
});
