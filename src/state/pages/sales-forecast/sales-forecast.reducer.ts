import * as _ from 'lodash';
import { assertUnreachable } from '../../../utils';
import { SalesForecastAction, SalesForecastActionType } from './sales-forecast.actions';
import { DefaultSalesForecastState, ForecastDayDatum, SalesForecastState } from './sales-forecast.state';

export const salesForecastReducer = (
  prevState = DefaultSalesForecastState(),
  action: SalesForecastAction,
): SalesForecastState => {
  switch (action.type) {
    case SalesForecastActionType.GET_THIRTY_DAY_FORECAST_REQUEST:
      return onGetThirtyDayForecastRequest(prevState);
    case SalesForecastActionType.GET_THIRTY_DAY_FORECAST_SUCCESS:
      return onGetThirtyDayForecastSuccess(prevState, action.payload as ForecastDayDatum[]);
    case SalesForecastActionType.GET_THIRTY_DAY_FORECAST_FAILURE:
      return onGetThirtyDayForecastFailure(prevState);
    case SalesForecastActionType.GET_SIXTY_DAY_FORECAST_REQUEST:
      return prevState; // TODO
    case SalesForecastActionType.GET_SIXTY_DAY_FORECAST_SUCCESS:
      return prevState; // TODO
    case SalesForecastActionType.GET_SIXTY_DAY_FORECAST_FAILURE:
      return prevState; // TODO
    case SalesForecastActionType.GET_NINETY_DAY_FORECAST_REQUEST:
      return prevState; // TODO
    case SalesForecastActionType.GET_NINETY_DAY_FORECAST_SUCCESS:
      return prevState; // TODO
    case SalesForecastActionType.GET_NINETY_DAY_FORECAST_FAILURE:
      return prevState; // TODO
    default:
      assertUnreachable(action.type);

      return prevState;
  }
};

const onGetThirtyDayForecastRequest = (prevState: SalesForecastState) => ({
  ...prevState,
  isLoading: true,
});

const onGetThirtyDayForecastSuccess = (
  prevState: SalesForecastState,
  thirtyDayForecastData: ForecastDayDatum[] = [],
) => ({
  ...prevState,
  isLoading: false,
  thirtyDayForecastData,
});

const onGetThirtyDayForecastFailure = (prevState: SalesForecastState) => ({
  ...prevState,
  isLoading: false,
});
