import { AxisBottom } from '@vx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { BarGroup } from '@vx/shape';
import * as _ from 'lodash';
import { ArrowBackIcon, MoreVertIcon } from 'mdi-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Color } from '../../../color';
import { Margin } from '../../../utility.types';
import { RootDispatch } from '../../root-action';
import { RootState } from '../../root-reducer';
import {
  backOutOfSelection,
  backOutOfWeek,
  drillIntoSelection,
  drillIntoWeek,
  pageLeft,
  pageRight,
} from './sales-chart.actions';
import './sales-chart.scss';
import { SalesChartViewMode } from './sales-chart.state';

type SalesChartProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> & {
    width: number;
    height: number;
    title: string;
    margin: Margin;
  };

const SalesChartComponent = ({
  width,
  height,
  title,
  drillIntoWeek,
  drillIntoSelection,
  backOutOfWeek,
  backOutOfSelection,
  viewMode,
  pageLeft,
  pageRight,
  xKey,
  canPageLeft,
  canPageRight,
  graphData,
  margin,
}: SalesChartProps) => {
  console.log({ graphData });
  const keys = _.filter(_.keys(graphData[0]), key => key !== xKey && _.isNumber(graphData[0][key]));
  console.log({ keys });

  const x0 = d => d[xKey];

  const x0Scale = scaleBand({
    rangeRound: [0, height],
    domain: graphData.map(x0),
    padding: 0.2,
  });
  const x1Scale = scaleBand({
    rangeRound: [0, x0Scale.bandwidth()],
    domain: keys,
    padding: 0,
  });
  const maxY = _.max(_.map(graphData, d => _.max(_.values(_.pick(d, keys)))));
  console.log(maxY);
  const graphPixelHeight = height - margin.top - margin.bottom;
  const yScale = scaleLinear({
    rangeRound: [graphPixelHeight, 0],
    domain: [0, maxY],
  });
  const zScale = scaleOrdinal({
    domain: keys,
    range: [Color.SamsLightBlue, Color.SamsLightBlueLightest],
  });

  return (
    <div className="sales-chart">
      <div className="chart-header">
        {viewMode !== SalesChartViewMode.AGGREGATE && (
          <button
            onClick={viewMode === SalesChartViewMode.WEEK ? backOutOfWeek : backOutOfSelection}
            className="button__flat icon-button"
          >
            <ArrowBackIcon />
          </button>
        )}
        <div className="chart-title">{title}</div>
        <button className="button__flat icon-button">
          <MoreVertIcon />
        </button>
      </div>
      <div className="chart-content">
        <button className="button__flat icon-button" disabled={!canPageLeft} onClick={pageLeft}>
          {'<'}
        </button>
        <svg width={width} height={height}>
          <BarGroup
            data={graphData}
            keys={keys}
            top={margin.top}
            height={height - margin.top - margin.bottom}
            x0={x0}
            x0Scale={x0Scale}
            x1Scale={x1Scale}
            yScale={yScale}
            zScale={zScale}
            rx={0}
            onClick={clickData => () => {
              viewMode === SalesChartViewMode.AGGREGATE
                ? drillIntoWeek(clickData.data.week)
                : drillIntoSelection(clickData.data.id);
            }}
          />
          <AxisBottom
            scale={x0Scale}
            top={height - margin.bottom}
            stroke={Color.SamsDarkBlue}
            tickStroke={Color.SamsDarkBlue}
            tickFormat={value => `${viewMode === SalesChartViewMode.WEEK ? 'Region' : 'Week'} ${value}`}
            hideTicks={true}
            tickLabelProps={() => ({
              fill: Color.black,
              fontSize: 12,
              textAnchor: 'middle',
            })}
          />
        </svg>
        <button className="button__flat icon-button" disabled={!canPageRight} onClick={pageRight}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  ...state.salesChart,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  drillIntoWeek: (weekNum: number) => dispatch(drillIntoWeek(weekNum)),
  drillIntoSelection: (selectionId: number) => dispatch(drillIntoSelection(selectionId)),
  backOutOfWeek: () => dispatch(backOutOfWeek()),
  backOutOfSelection: () => dispatch(backOutOfSelection()),
  pageRight: () => dispatch(pageRight()),
  pageLeft: () => dispatch(pageLeft()),
});

export const SalesChart = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SalesChartComponent);
