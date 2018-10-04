import dayjs = require('dayjs');
import * as _ from 'lodash';
import { mocker } from 'mocker-data-generator';
import { RootDispatch } from '../../root-action';
import { ForecastDayDatum } from './sales-forecast.state';

export enum SalesForecastActionType {
  'GET_THIRTY_DAY_FORECAST_FAILURE' = 'salesForecastPage/GET_THIRTY_DAY_FORECAST_FAILURE',
  'GET_THIRTY_DAY_FORECAST_REQUEST' = 'salesForecastPage/GET_THIRTY_DAY_FORECAST_REQUEST',
  'GET_THIRTY_DAY_FORECAST_SUCCESS' = 'salesForecastPage/GET_THIRTY_DAY_FORECAST_SUCCESS',
  'GET_SIXTY_DAY_FORECAST_FAILURE' = 'salesForecastPage/GET_SIXTY_DAY_FORECAST_FAILURE',
  'GET_SIXTY_DAY_FORECAST_REQUEST' = 'salesForecastPage/GET_SIXTY_DAY_FORECAST_REQUEST',
  'GET_SIXTY_DAY_FORECAST_SUCCESS' = 'salesForecastPage/GET_SIXTY_DAY_FORECAST_SUCCESS',
  'GET_NINETY_DAY_FORECAST_FAILURE' = 'salesForecastPage/GET_NINETY_DAY_FORECAST_FAILURE',
  'GET_NINETY_DAY_FORECAST_REQUEST' = 'salesForecastPage/GET_NINETY_DAY_FORECAST_REQUEST',
  'GET_NINETY_DAY_FORECAST_SUCCESS' = 'salesForecastPage/GET_NINETY_DAY_FORECAST_SUCCESS',
}

export type SalesForecastAction = {
  type: SalesForecastActionType;
  payload?: {
    thirtyDayForecastData?: ForecastDayDatum[];
    sixtyDayForecastData?: ForecastDayDatum[];
    ninetyDayForecastData?: ForecastDayDatum[];
  };
};

export const getThirtyDayForecastRequest = () => ({
  type: SalesForecastActionType.GET_THIRTY_DAY_FORECAST_REQUEST,
});

export const getThirtyDayForecastSuccess = (thirtyDayForecastData: ForecastDayDatum[] = []) => ({
  type: SalesForecastActionType.GET_THIRTY_DAY_FORECAST_SUCCESS,
  payload: {
    thirtyDayForecastData,
  },
});

export const getThirtyDayForecastFailure = () => ({
  type: SalesForecastActionType.GET_THIRTY_DAY_FORECAST_FAILURE,
});

export const SalesForecastActions = {
  getThirtyDayForecastFailure,
  getThirtyDayForecastRequest,
  getThirtyDayForecastSuccess,
};

export const getThirtyDayForecastMockData = async (dispatch: RootDispatch) => {
  dispatch(getThirtyDayForecastRequest());
  const compDaySchema: { [key in keyof (ForecastDayDatum & { 'object.day<=22,thisYearActual': any })]: any } = {
    day: {
      incrementalId: 1,
    },
    date: {
      function: function() {
        return dayjs(`01/${_.padStart(this.object.day, 2, '0')}/2019`).format('MM/DD/YYYY');
      },
    },
    compPercent: {
      faker: 'random.number({"min": -100, "max": 100})',
    },
    'object.day<=22,thisYearActual': {
      faker: 'random.number({"min": -200, "max": 1000})',
    },
    lastYearActual: {
      faker: 'random.number({"min": -200, "max": 1000})',
    },
    forecast: {
      faker: 'random.number({"min": -200, "max": 1000})',
    },
    versusPlan: {
      faker: 'random.number({"min": -200, "max": 1000})',
    },
  };
  try {
    const result: { thirtyDayForecastData: ForecastDayDatum[] } = await mocker()
      .schema('thirtyDayForecastData', compDaySchema, 30)
      .build();
    dispatch(getThirtyDayForecastSuccess(result.thirtyDayForecastData));
  } catch (e) {
    dispatch(getThirtyDayForecastFailure());
  }
};
