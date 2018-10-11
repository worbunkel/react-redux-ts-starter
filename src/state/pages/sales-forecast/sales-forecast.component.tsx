import * as React from 'react';
import { connect } from 'react-redux';
import { SalesChart } from '../../components/sales-chart/sales-chart.component';
import { ThirtyDayForecast } from '../../components/thirty-day-forecast/thirty-day-forecast.component';
import { RootDispatch } from '../../root-action';
import { RootState } from '../../root-reducer';
import { getSalesChartMockData, getThirtyDayForecastMockData } from './sales-forecast.actions';
import './sales-forecast.scss';

type SalesForecastPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class SalesForecastPageComponent extends React.Component<SalesForecastPageProps> {
  componentWillMount() {
    this.props.getThirtyDayForecastData();
    this.props.getSalesChartData();
  }
  render() {
    return (
      <div className="content">
        <div className="forecast-overview">
          <div>Forecast Overview</div>
          <ThirtyDayForecast
            key={1}
            margin={{ top: 16, right: 16, bottom: 48, left: 56 }}
            height={250}
            width={1150}
            tooltipHeight={140}
            tooltipWidth={120}
            xKey={'date'}
            data={this.props.thirtyDayForecastData}
            isLoading={this.props.isLoading}
          />
          <button
            key={3}
            className="button__flat"
            onClick={() => {
              this.props.getThirtyDayForecastData();
              this.props.getSalesChartData();
            }}
          >
            Reload Data
          </button>
        </div>
        <div className="forecast-details">
          <div>Forecast Details</div>
        </div>
        <div className="analysis-and-insights">
          <div>Analysis & Insights</div>
          <SalesChart title={'Sales'} width={400} height={400} margin={{ top: 20, bottom: 40 }} />
        </div>
        <div className="supporting-information">
          <div>Supporting Information</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  ...state.salesForecast,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  getThirtyDayForecastData: () => dispatch(getThirtyDayForecastMockData),
  getSalesChartData: () => dispatch(getSalesChartMockData),
});

export const SalesForecastPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SalesForecastPageComponent);
