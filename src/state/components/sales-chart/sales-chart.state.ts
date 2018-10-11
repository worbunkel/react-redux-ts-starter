export enum SalesChartViewMode {
  AGGREGATE = 'AGGREGATE',
  WEEK = 'WEEK',
  SELECTION = 'SELECTION',
}

export enum SalesDataType {
  REGION = 'REGION',
  MARKET = 'MARKET',
  CLUB = 'CLUB',
  CATEGORY = 'CATEGORY',
}

export type SalesDatum = {
  week: number;
  id: number;
  type: SalesDataType;
  thisYear: number;
  lastYear: number;
  forecast: number;
  versusPlan: number;
};

export type SalesData = {
  SalesDataByRegion: SalesDatum[];
  SalesDataByMarket: SalesDatum[];
  SalesDataByClub: SalesDatum[];
  SalesDataByCategory: SalesDatum[];
  SalesDataBySubcategory: SalesDatum[];
};

export type SalesChartState = {
  chartName: string;
  selectedWeek: number;
  selectionId: number;
  pageNum: number;
  canPageLeft: boolean;
  canPageRight: boolean;
  isLoading: boolean;
  data: SalesData;
  graphData: SalesDatum[];
  viewMode: SalesChartViewMode;
  xKey: string;
};

export const DefaultSalesChartState = (): SalesChartState => ({
  chartName: 'Sales',
  selectedWeek: null,
  selectionId: null,
  data: {
    SalesDataByCategory: [],
    SalesDataByClub: [],
    SalesDataByMarket: [],
    SalesDataByRegion: [],
    SalesDataBySubcategory: [],
  },
  graphData: [],
  xKey: 'week',
  pageNum: 0,
  canPageLeft: false,
  canPageRight: false,
  isLoading: true,
  viewMode: SalesChartViewMode.AGGREGATE,
});
