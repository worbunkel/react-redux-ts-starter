import dayjs = require('dayjs');
import * as _ from 'lodash';
import { mocker } from 'mocker-data-generator';
import {
  getSalesDataFailure,
  getSalesDataRequest,
  getSalesDataSuccess,
} from '../../components/sales-chart/sales-chart.actions';
import { SalesData } from '../../components/sales-chart/sales-chart.state';
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
  payload?: ReturnType<typeof SalesForecastActions[keyof typeof SalesForecastActions]>['payload'];
};

export const getThirtyDayForecastRequest = () => ({
  type: SalesForecastActionType.GET_THIRTY_DAY_FORECAST_REQUEST,
  payload: null as never,
});

export const getThirtyDayForecastSuccess = (thirtyDayForecastData: ForecastDayDatum[] = []) => ({
  type: SalesForecastActionType.GET_THIRTY_DAY_FORECAST_SUCCESS,
  payload: thirtyDayForecastData,
});

export const getThirtyDayForecastFailure = () => ({
  type: SalesForecastActionType.GET_THIRTY_DAY_FORECAST_FAILURE,
  payload: null as never,
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

export const getSalesChartMockData = async (dispatch: RootDispatch) => {
  dispatch(getSalesDataRequest());
  const regionCount = 30;
  const weekCount = 52;
  const regionSchema = {
    virtualCounter: {
      incrementalId: 0,
      virtual: true,
    },
    id: {
      function: function() {
        return (this.object.virtualCounter % regionCount) + 1;
      },
    },
    week: {
      function: function() {
        return Math.floor(this.object.virtualCounter / regionCount) + 1;
      },
    },
    type: {
      static: 'REGION',
    },
    thisYear: {
      faker: 'random.number({"min": 400000, "max": 500000})',
    },
    lastYear: {
      faker: 'random.number({"min": 400000, "max": 500000})',
    },
    forecast: {
      faker: 'random.number({"min": 450000, "max": 550000})',
    },
    versusPlan: {
      faker: 'random.number({"min": 1000, "max": 3000})',
    },
  };

  try {
    const result: { SalesDataByRegion: SalesData['SalesDataByRegion'] } = await mocker()
      .schema('SalesDataByRegion', regionSchema, regionCount * weekCount)
      .build();
    dispatch(
      getSalesDataSuccess({
        SalesDataByRegion: result.SalesDataByRegion,
        SalesDataByCategory: [],
        SalesDataByClub: [],
        SalesDataByMarket: [],
        SalesDataBySubcategory: [],
      }),
    );
  } catch (e) {
    dispatch(getSalesDataFailure());
  }
};
