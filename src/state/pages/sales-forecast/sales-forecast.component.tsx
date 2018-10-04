import * as React from 'react';
import { connect } from 'react-redux';
import { ThirtyDayForecast } from '../../components/thirty-day-forecast/thirty-day-forecast.component';
import { RootDispatch } from '../../root-action';
import { RootState } from '../../root-reducer';
import { getThirtyDayForecastMockData } from './sales-forecast.actions';

type SalesForecastPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class SalesForecastPageComponent extends React.Component<SalesForecastPageProps> {
  componentWillMount() {
    this.props.getThirtyDayForecastData();
  }
  render() {
    return (
      <div className="content">
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
        <button key={3} className="button__flat" onClick={this.props.getThirtyDayForecastData}>
          Reload Data
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  ...state.salesForecast,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  getThirtyDayForecastData: () => dispatch(getThirtyDayForecastMockData),
});

export const SalesForecastPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SalesForecastPageComponent);
