import {
  backOutOfSelection,
  backOutOfWeek,
  drillIntoSelection,
  drillIntoWeek,
  pageLeft,
  pageRight,
  SalesChartActionType,
} from './sales-chart.actions';
import { salesChartReducer } from './sales-chart.reducer';
import { DefaultSalesChartState, SalesChartViewMode } from './sales-chart.state';

describe('salesChartReducer', () => {
  describe('on uncaught action', () => {
    it('should return the state', () => {
      const prevState = DefaultSalesChartState();
      const testAction: any = { type: '', payload: {} };

      const newState = salesChartReducer(prevState, testAction);

      expect(newState).toEqual(prevState);
    });
  });

  describe(`on ${SalesChartActionType.DRILL_INTO_WEEK}`, () => {
    it('should set the selectedWeek', () => {
      const prevState = DefaultSalesChartState();
      const selectedWeek = 1;
      const drillIntoWeekAction = drillIntoWeek(selectedWeek);

      const newState = salesChartReducer(prevState, drillIntoWeekAction);

      expect(newState.selectedWeek).toBe(selectedWeek);
    });

    it('should set the viewMode to week', () => {
      const prevState = DefaultSalesChartState();
      const drillIntoWeekAction = drillIntoWeek(1);

      const newState = salesChartReducer(prevState, drillIntoWeekAction);

      expect(newState.viewMode).toBe(SalesChartViewMode.WEEK);
    });

    it('should reset the pageNum', () => {
      const prevState = {
        ...DefaultSalesChartState(),
        pageNum: 3,
      };
      const drillIntoWeekAction = drillIntoWeek(1);

      const newState = salesChartReducer(prevState, drillIntoWeekAction);

      expect(newState.pageNum).toBe(0);
    });
  });

  describe(`on ${SalesChartActionType.DRILL_INTO_SELECTION}`, () => {
    it('should set the selectionId', () => {
      const prevState = DefaultSalesChartState();
      const selectionId = 1;
      const drillIntoSelectionAction = drillIntoSelection(selectionId);

      const newState = salesChartReducer(prevState, drillIntoSelectionAction);

      expect(newState.selectionId).toBe(selectionId);
    });

    it('should set the viewMode to selection', () => {
      const prevState = DefaultSalesChartState();
      const drillIntoSelectionAction = drillIntoSelection(1);

      const newState = salesChartReducer(prevState, drillIntoSelectionAction);

      expect(newState.viewMode).toBe(SalesChartViewMode.SELECTION);
    });

    it('should reset the pageNum', () => {
      const prevState = {
        ...DefaultSalesChartState(),
        pageNum: 3,
      };
      const drillIntoSelectionAction = drillIntoSelection(1);

      const newState = salesChartReducer(prevState, drillIntoSelectionAction);

      expect(newState.pageNum).toBe(0);
    });
  });

  describe(`on ${SalesChartActionType.BACK_OUT_OF_WEEK}`, () => {
    it('should set the selectedWeek to null', () => {
      const prevState = {
        ...DefaultSalesChartState(),
        selectedWeek: 1,
      };
      const backOutOfWeekAction = backOutOfWeek();

      const newState = salesChartReducer(prevState, backOutOfWeekAction);

      expect(newState.selectedWeek).toBe(null);
    });

    it('should set the view mode to aggregate', () => {
      const prevState = {
        ...DefaultSalesChartState(),
        viewMode: SalesChartViewMode.WEEK,
      };
      const backOutOfWeekAction = backOutOfWeek();

      const newState = salesChartReducer(prevState, backOutOfWeekAction);

      expect(newState.viewMode).toBe(SalesChartViewMode.AGGREGATE);
    });

    it('should reset the pageNum', () => {
      const prevState = {
        ...DefaultSalesChartState(),
        pageNum: 3,
      };
      const backOutOfWeekAction = backOutOfWeek();

      const newState = salesChartReducer(prevState, backOutOfWeekAction);

      expect(newState.pageNum).toBe(0);
    });
  });

  describe(`on ${SalesChartActionType.BACK_OUT_OF_SELECTION}`, () => {
    it('should set the selectionId to null', () => {
      const prevState = {
        ...DefaultSalesChartState(),
        selectionId: 1,
      };
      const backOutOfSelectionAction = backOutOfSelection();

      const newState = salesChartReducer(prevState, backOutOfSelectionAction);

      expect(newState.selectionId).toBe(null);
    });

    it('should set the view mode to week', () => {
      const prevState = {
        ...DefaultSalesChartState(),
        viewMode: SalesChartViewMode.SELECTION,
      };
      const backOutOfSelectionAction = backOutOfSelection();

      const newState = salesChartReducer(prevState, backOutOfSelectionAction);

      expect(newState.viewMode).toBe(SalesChartViewMode.WEEK);
    });

    it('should reset the pageNum', () => {
      const prevState = {
        ...DefaultSalesChartState(),
        pageNum: 3,
      };
      const backOutOfSelectionAction = backOutOfSelection();

      const newState = salesChartReducer(prevState, backOutOfSelectionAction);

      expect(newState.pageNum).toBe(0);
    });
  });

  describe(`on ${SalesChartActionType.PAGE_LEFT}`, () => {
    it('should decrement pageNum by 1', () => {
      const prevState = {
        ...DefaultSalesChartState(),
        pageNum: 1,
      };
      const pageLeftAction = pageLeft();

      const newState = salesChartReducer(prevState, pageLeftAction);

      expect(newState.pageNum).toBe(0);
    });
  });

  describe(`on ${SalesChartActionType.PAGE_RIGHT}`, () => {
    it('should increment pageNum by 1', () => {
      const prevState = {
        ...DefaultSalesChartState(),
        pageNum: 1,
      };
      const pageRightAction = pageRight();

      const newState = salesChartReducer(prevState, pageRightAction);

      expect(newState.pageNum).toBe(2);
    });
  });
});
