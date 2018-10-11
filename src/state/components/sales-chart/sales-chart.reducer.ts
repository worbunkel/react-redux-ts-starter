import * as _ from 'lodash';
import { assertUnreachable, boundValue } from '../../../utils';
import { SalesChartAction, SalesChartActionType } from './sales-chart.actions';
import {
  DefaultSalesChartState,
  SalesChartState,
  SalesChartViewMode,
  SalesData,
  SalesDatum,
} from './sales-chart.state';

export const salesChartReducer = (prevState = DefaultSalesChartState(), action: SalesChartAction): SalesChartState => {
  switch (action.type) {
    case SalesChartActionType.DRILL_INTO_WEEK:
      return onDrillIntoWeek(prevState, action.payload as number);
    case SalesChartActionType.DRILL_INTO_SELECTION:
      return onDrillIntoSelection(prevState, action.payload as number);
    case SalesChartActionType.BACK_OUT_OF_WEEK:
      return onBackOutOfWeek(prevState);
    case SalesChartActionType.BACK_OUT_OF_SELECTION:
      return onBackOutOfSelection(prevState);
    case SalesChartActionType.PAGE_LEFT:
      return onPageLeft(prevState);
    case SalesChartActionType.PAGE_RIGHT:
      return onPageRight(prevState);
    case SalesChartActionType.GET_SALES_DATA_REQUEST:
      return onGetSalesDataRequest(prevState);
    case SalesChartActionType.GET_SALES_DATA_SUCCESS:
      return onGetSalesDataSuccess(prevState, action.payload as SalesData);
    case SalesChartActionType.GET_SALES_DATA_FAILURE:
      return onGetSalesDataFailure(prevState);
    default:
      assertUnreachable(action.type);

      return prevState;
  }
};

const onDrillIntoWeek = (prevState: SalesChartState, payload: number): SalesChartState =>
  filterGraphDataOnChange({
    ...prevState,
    selectedWeek: payload,
    viewMode: SalesChartViewMode.WEEK,
    pageNum: 0,
  });

const onDrillIntoSelection = (prevState: SalesChartState, payload: number): SalesChartState =>
  filterGraphDataOnChange({
    ...prevState,
    selectionId: payload,
    viewMode: SalesChartViewMode.SELECTION,
    pageNum: 0,
  });

const onBackOutOfWeek = (prevState: SalesChartState): SalesChartState =>
  filterGraphDataOnChange({
    ...prevState,
    selectedWeek: null,
    viewMode: SalesChartViewMode.AGGREGATE,
    pageNum: 0,
  });

const onBackOutOfSelection = (prevState: SalesChartState): SalesChartState =>
  filterGraphDataOnChange({
    ...prevState,
    selectionId: null,
    viewMode: SalesChartViewMode.WEEK,
    pageNum: 0,
  });

const onPageLeft = (prevState: SalesChartState): SalesChartState =>
  filterGraphDataOnChange({
    ...prevState,
    pageNum: prevState.pageNum - 1,
  });

const onPageRight = (prevState: SalesChartState): SalesChartState =>
  filterGraphDataOnChange({
    ...prevState,
    pageNum: prevState.pageNum + 1,
  });

const onGetSalesDataRequest = (prevState: SalesChartState): SalesChartState => ({
  ...prevState,
  isLoading: true,
});

const onGetSalesDataSuccess = (prevState: SalesChartState, data: SalesData): SalesChartState => ({
  ...filterGraphDataOnChange({
    ...prevState,
    data,
  }),
  isLoading: false,
});

const onGetSalesDataFailure = (prevState: SalesChartState): SalesChartState => ({
  ...prevState,
  isLoading: false,
});

const filterGraphDataOnChange = (state: SalesChartState): SalesChartState => {
  const stateAfterViewModeFilter = filterGraphDataToViewMode(state);

  return filterGraphDataToPage(stateAfterViewModeFilter);
};

const filterGraphDataToViewMode = (state: SalesChartState): SalesChartState => {
  let graphData, xKey;
  switch (state.viewMode) {
    case SalesChartViewMode.AGGREGATE:
      graphData = _.map(_.groupBy(state.data.SalesDataByRegion, 'week'), group =>
        _.reduce(
          group,
          (acc, datum) => {
            const keys = _.keys(_.omit(datum, 'type'));
            _.each(keys, key => {
              acc[key] = (acc[key] || 0) + datum[key];
            });
            acc.week = datum.week;

            return acc;
          },
          {} as SalesDatum,
        ),
      );
      xKey = 'week';
      break;
    case SalesChartViewMode.WEEK:
      graphData = _.filter(state.data.SalesDataByRegion, { week: state.selectedWeek });
      xKey = 'id';
      break;
    case SalesChartViewMode.SELECTION:
      graphData = _.filter(state.data.SalesDataByRegion, { id: state.selectionId });
      xKey = 'week';
      break;
    default:
      assertUnreachable(state.viewMode);
  }

  return {
    ...state,
    graphData,
    xKey,
  };
};

const filterGraphDataToPage = (state: SalesChartState) => {
  const dataSize = _.size(_.groupBy(state.graphData, state.xKey));
  console.log({ dataSize });
  if (dataSize > 5) {
    const pageStart = boundValue(state.pageNum * 5, 0, dataSize - 5);
    const pageEnd = boundValue(state.pageNum * 5 + 5, 5, dataSize);

    return {
      ...state,
      canPageLeft: pageStart !== 0,
      canPageRight: pageEnd !== dataSize,
      graphData: _.slice(state.graphData, pageStart, pageEnd),
    };
  }

  return state;
};
