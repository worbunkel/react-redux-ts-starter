import { AxisBottom, AxisLeft } from '@vx/axis';
import { curveLinear } from '@vx/curve';
import { GlyphDot } from '@vx/glyph';
import { Group } from '@vx/group';
import { scaleLinear, scaleTime } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { Tooltip, withTooltip } from '@vx/tooltip';
import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import * as React from 'react';
import { Color } from '../../../color';
import { extent } from '../../graph.utils';
import { ForecastDayDatum } from '../../pages/sales-forecast/sales-forecast.state';
import './thirty-day-forecast.scss';

type Props = {
  data: ForecastDayDatum[];
  height: number;
  hideTooltip?: (options: any) => void;
  isLoading: boolean;
  margin: { top: number; right: number; bottom: number; left: number };
  showTooltip?: (options: any) => void;
  tooltipData?: { datum: ForecastDayDatum; tooltipMainKey: keyof ForecastDayDatum };
  tooltipHeight: number;
  tooltipLeft?: number;
  tooltipOpen?: boolean;
  tooltipTop?: number;
  tooltipWidth: number;
  width: number;
  xKey: keyof ForecastDayDatum;
};

const ThirtyDayForecastNoTooltip = ({
  data,
  height,
  hideTooltip,
  isLoading,
  margin,
  showTooltip,
  tooltipData,
  tooltipHeight,
  tooltipLeft,
  tooltipOpen,
  tooltipTop,
  tooltipWidth,
  width,
  xKey,
}: Props) => {
  if (!data || isLoading) {
    return <div style={{ width, height, backgroundColor: Color.SamsDarkGrayLightest }}>Loading...</div>;
  }

  const x = d => dayjs(d[xKey]).toDate();
  const yCreator = (key: keyof ForecastDayDatum) => (d: ForecastDayDatum) => d[key];

  const graphPixelWidth = width - margin.left - margin.right;
  const graphPixelHeight = height - margin.top - margin.bottom;

  const yValues = _.flatMap(data, d => _.values(_.omit(d, 'day', 'date')));

  const xScale = scaleTime({
    range: [0, graphPixelWidth],
    domain: [dayjs(_.first(data).date).toDate(), dayjs(_.last(data).date).toDate()],
  });
  const yScale = scaleLinear({
    range: [graphPixelHeight, 0],
    domain: extent(yValues, (d: string) => parseInt(d, 10), 0.05),
  });

  const getXAxisNumTicks = (forecastData: ForecastDayDatum[], width: number, tickWidth: number = 24) => {
    const count = _.size(forecastData);
    if (width / count > tickWidth) {
      return count;
    } else {
      return Math.floor(width / tickWidth);
    }
  };

  const allKeys = _.uniq(_.flatMap(data, data => _.keys(_.omit(data, 'day', 'date')) as Array<keyof ForecastDayDatum>));

  return [
    <svg key={1} width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {_.map(allKeys, (key, index) => (
          <LinePath
            key={`line-path-${key}`}
            data={_.filter(data, key)}
            x={x}
            y={yCreator(key)}
            xScale={xScale}
            yScale={yScale}
            curve={curveLinear}
            style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
            className={`graph-theme-${index + 1}`}
            glyph={(datum, circleIndex) =>
              datum[key] && (
                <g key={`line-point-${key}-${circleIndex}`}>
                  <GlyphDot
                    cx={xScale(x(datum))}
                    cy={yScale(yCreator(key)(datum))}
                    className={`graph-circle graph-theme-${index + 1}-circle`}
                    onMouseOver={(event: { target: SVGElement }) => {
                      const xValue = xScale(x(datum));
                      const yValue = yScale(yCreator(key)(datum));
                      const tooltipLeft = Math.min(
                        Math.max(xValue + margin.left - tooltipWidth / 2, margin.left),
                        graphPixelWidth - margin.left,
                      );
                      let tooltipTop = yValue + margin.top - tooltipHeight - 10;
                      tooltipTop = tooltipTop > 0 ? tooltipTop : yValue + margin.top + 10;
                      showTooltip({
                        tooltipLeft,
                        tooltipTop,
                        tooltipData: { datum, tooltipMainKey: key },
                      });
                      event.target.classList.add('graph-circle--state-hover');
                    }}
                    onMouseLeave={event => {
                      hideTooltip({});
                      event.target.classList.remove('graph-circle--state-hover');
                    }}
                  />
                </g>
              )
            }
          />
        ))}
      </Group>
      <Group left={margin.left} top={margin.top}>
        <AxisLeft
          scale={yScale}
          label={'$USD'}
          left={0}
          labelProps={{
            fill: '#000',
            textAnchor: 'middle',
            fontSize: 12,
          }}
          stroke="#000"
          hideAxisLine={true}
          hideTicks={true}
        />
        <AxisBottom
          top={height - margin.bottom - margin.top}
          left={0}
          scale={xScale}
          tickFormat={value => dayjs(value).format('DD')}
          numTicks={getXAxisNumTicks(data, width)}
          hideAxisLine={true}
          hideTicks={true}
        />
      </Group>
    </svg>,
    tooltipOpen && (
      <Tooltip
        key={2}
        top={tooltipTop}
        left={tooltipLeft}
        className="thirty-day-forecast-tooltip"
        style={{
          minWidth: tooltipWidth,
          maxWidth: tooltipWidth,
          minHeight: tooltipHeight,
          maxHeight: tooltipHeight,
          // Overwrite props that should be set in css
          backgroundColor: '',
          borderRadius: '',
          boxSizing: '',
          color: '',
          fontSize: '',
          padding: '',
        }}
      >
        <div key="date">
          <strong>{dayjs(tooltipData.datum.date).format('MMM DD, YYYY')}</strong>
        </div>
        <div key={tooltipData.tooltipMainKey}>
          <small>
            <strong>
              {tooltipData.tooltipMainKey}: {tooltipData.datum[tooltipData.tooltipMainKey]}
            </strong>
          </small>
        </div>
        {_.map(_.omit(tooltipData.datum, 'day', 'date', tooltipData.tooltipMainKey), (value, key) => (
          <div key={key}>
            <small>
              {key}: {value}
            </small>
          </div>
        ))}
      </Tooltip>
    ),
  ];
};

export const ThirtyDayForecast: React.ComponentType<Props> = withTooltip(ThirtyDayForecastNoTooltip);
