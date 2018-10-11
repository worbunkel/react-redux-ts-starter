import * as _ from 'lodash';
import { SalesData } from './sales-chart.state';

export enum SalesChartActionType {
  DRILL_INTO_WEEK = 'salesChart/DRILL_INTO_WEEK',
  DRILL_INTO_SELECTION = 'salesChart/DRILL_INTO_SELECTION',
  BACK_OUT_OF_WEEK = 'salesChart/BACK_OUT_OF_WEEK',
  BACK_OUT_OF_SELECTION = 'salesChart/BACK_OUT_OF_SELECTION',
  PAGE_LEFT = 'salesChart/PAGE_LEFT',
  PAGE_RIGHT = 'salesChart/PAGE_RIGHT',
  GET_SALES_DATA_FAILURE = 'salesChart/GET_SALES_DATA_FAILURE',
  GET_SALES_DATA_REQUEST = 'salesChart/GET_SALES_DATA_REQUEST',
  GET_SALES_DATA_SUCCESS = 'salesChart/GET_SALES_DATA_SUCCESS',
}

export type SalesChartAction = {
  type: SalesChartActionType;
  payload: ReturnType<typeof SalesChartActions[keyof typeof SalesChartActions]>['payload'];
};

export const drillIntoWeek = (weekNum: number) => ({
  type: SalesChartActionType.DRILL_INTO_WEEK,
  payload: weekNum,
});

export const drillIntoSelection = (selectionId: number) => ({
  type: SalesChartActionType.DRILL_INTO_SELECTION,
  payload: selectionId,
});

export const backOutOfWeek = () => ({
  type: SalesChartActionType.BACK_OUT_OF_WEEK,
  payload: null as never,
});

export const backOutOfSelection = () => ({
  type: SalesChartActionType.BACK_OUT_OF_SELECTION,
  payload: null as never,
});

export const pageLeft = () => ({
  type: SalesChartActionType.PAGE_LEFT,
  payload: null as never,
});

export const pageRight = () => ({
  type: SalesChartActionType.PAGE_RIGHT,
  payload: null as never,
});

export const getSalesDataRequest = () => ({
  type: SalesChartActionType.GET_SALES_DATA_REQUEST,
  payload: null as never,
});

export const getSalesDataSuccess = (SalesData: SalesData) => ({
  type: SalesChartActionType.GET_SALES_DATA_SUCCESS,
  payload: SalesData,
});

export const getSalesDataFailure = () => ({
  type: SalesChartActionType.GET_SALES_DATA_FAILURE,
  payload: null as never,
});

export const SalesChartActions = {
  drillIntoWeek,
  drillIntoSelection,
  backOutOfWeek,
  backOutOfSelection,
  pageLeft,
  pageRight,
  getSalesDataRequest,
  getSalesDataSuccess,
  getSalesDataFailure,
};
