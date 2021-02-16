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
  infos: ChartProperties;
  line: Array<{ date: number; value: number; }>;
  points: Array<{ date: number; value: number; }>;
}

export interface ChartProperties {
  title: string;
  dotName: string;
  dotColor: string;
  lineName: string;
  lineColor: string;
  yUnit: string;
  yLabel: string;
  xLabel: string;
  dateToUnixTsFactor: number;
}

const dotSize = 30;
const dateFmtOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

const ComposedLineAndScatterChart: React.FC<ComposedLineAndScatterChartProps> = (props) => {
  console.log(props.chart)
  const dateFormatter = (value: number): string => {
    const d = new Date(value * props.chart.infos.dateToUnixTsFactor * 1000);
    return d.toLocaleDateString(props.locale, dateFmtOptions);
  }

  const prepareData = (dataObj: ChartConfig): Array<{ date: number; line?: number; dot?: number; }> => {
    return [
      ...dataObj.line.map(d => { return { date: d.date, line: d.value } }),
      ...dataObj.points.map(d => { return { date: d.date, dot: d.value } }),
    ];
  }

  return (
    <div className="py-3 px-2" >
      < h5 className="text-center" >
        {props.chart.infos.title}
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
              value={props.chart.infos.xLabel}
              style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: '0.8rem' }}
            />
          </XAxis>
          <YAxis
            unit={props.chart.infos.yUnit}
            width={props.chart.infos.yLabel ? 70 : undefined}
          // domain={['auto', 'auto']}
          //label={{ value: dataObj.infos.yLabel, angle: -90, textAnchor: 'middle', position: 'insideLeft' }}
          >
            {props.chart.infos.yLabel ? <Label
              angle={-90}
              direction=""
              position="insideLeft"
              value={props.chart.infos.yLabel}
              style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: '0.8rem' }}
            /> : null}
          </YAxis>
          <ZAxis range={[dotSize, dotSize]} />
          <Tooltip
            labelFormatter={(value) => {
              return [dateFormatter(value as number)]
            }}
          />

          <Line
            type="linear"
            dot={false}
            dataKey="line"
            name={props.chart.infos.lineName}
            strokeWidth={2}
            stroke={props.chart.infos.lineColor} />
          <Scatter
            dataKey="dot"
            fill={props.chart.infos.dotColor}
            name={props.chart.infos.dotName}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>

  );
};

export default ComposedLineAndScatterChart;
