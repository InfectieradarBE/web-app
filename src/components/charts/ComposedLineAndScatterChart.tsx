import React from 'react';
import {
  XAxis,
  YAxis,
  ZAxis,
  Label,
  CartesianGrid,
  ResponsiveContainer, Tooltip, ComposedChart, Line, Scatter
} from 'recharts';

interface ComposedLineAndScatterChartProps {
  chart: ChartConfig;
  locale: string;
}

export interface ChartConfig {
  properties: ChartProperties;
  series: Array<Series>
}

export interface Series {
  config: {
    type: 'scatter' | 'line';
    color: string;
    name: string;
  },
  data: Array<{ date: number; value: number; }>;
}

export interface ChartProperties {
  title: string;
  yUnit: string;
  yLabel: string;
  xLabel: string;
  dateToUnixTsFactor: number;
}

const dotSize = 30;
const dateFmtOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

const ComposedLineAndScatterChart: React.FC<ComposedLineAndScatterChartProps> = (props) => {
  const dateFormatter = (value: number): string => {
    const d = new Date(value * props.chart.properties.dateToUnixTsFactor * 1000);
    return d.toLocaleDateString(props.locale, dateFmtOptions);
  }

  const prepareData = (dataObj: ChartConfig): Array<any> => {
    const formattedData: Array<any> = [];
    dataObj.series.forEach((series, index) => {
      const s = series.data.map(d => { return { date: d.date, [index.toString()]: d.value } });
      formattedData.push(...s);
    });
    return formattedData;
  }

  return (
    <div className="py-3 px-2" >
      < h5 className="text-center" >
        {props.chart.properties.title}
      </h5 >
      <ResponsiveContainer minHeight={450}>
        <ComposedChart data={prepareData(props.chart)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            type="number"
            // domain={['auto', 'dateMax - 86400']}
            tickCount={8}
            domain={['dataMin', 'dataMax']}
            height={50}
            tickFormatter={dateFormatter}
          >
            <Label
              position="insideBottom"
              value={props.chart.properties.xLabel}
              style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: '0.8rem' }}
            />
          </XAxis>
          <YAxis
            unit={props.chart.properties.yUnit}
            width={props.chart.properties.yLabel ? 70 : undefined}
          // domain={['auto', 'auto']}
          //label={{ value: dataObj.infos.yLabel, angle: -90, textAnchor: 'middle', position: 'insideLeft' }}
          >
            {props.chart.properties.yLabel ? <Label
              angle={-90}
              direction=""
              position="insideLeft"
              value={props.chart.properties.yLabel}
              style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: '0.8rem' }}
            /> : null}
          </YAxis>
          <ZAxis range={[dotSize, dotSize]} />
          <Tooltip
            labelFormatter={(value) => {
              return [dateFormatter(value as number)]
            }}
          />

          {
            props.chart.series.map((series, index) => {
              switch (series.config.type) {
                case 'scatter':
                  return <Scatter
                    key={index.toString()}
                    dataKey={index.toString()}
                    fill={series.config.color}
                    name={series.config.name}
                  />
                case 'line':
                  return <Line
                    key={index.toString()}
                    type="linear"
                    dot={false}
                    dataKey={index.toString()}
                    name={series.config.name}
                    strokeWidth={2}
                    stroke={series.config.color} />
                default:
                  console.error(`unknown data series type ${series.config.type}`);
                  return null;
              }
            })
          }
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComposedLineAndScatterChart;
