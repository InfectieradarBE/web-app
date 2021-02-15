import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import ReactTooltip from 'react-tooltip';
import { scaleQuantize } from "d3-scale";
import clsx from 'clsx';
import Slider from '../inputs/Slider';

interface MapWithTimeSliderProps {
  seriesData: MapSeriesConfig;
  geoData: GeoData;
  language: string;
}

export interface MapSeriesConfig {
  slider: {
    minLabel: string;
    maxLabel: string;
    labels: string[];
    hideTicks: boolean;
  },
  series: Array<MapSeriesData>;
}

export interface GeoData {
  size: {
    width: number;
    height: number;
  };
  projection: {
    rotate: [number, number, number]; // three values
    scale: number;
  };
  topojson: any;
}

export interface MapSeriesData {
  name: string;
  title: string;
  colorScale: {
    min: number;
    max: number;
    hoverStrokeColor?: string;
    colors: string[];
  };
  legend: {
    show: boolean;
    position: {
      x: 'left' | 'right';
      y: 'top' | 'bottom';
    };
    title: string;
  };
  data: Array<{
    name: string;
    sequence: number[];
  }>;
};

const defaultColorScale = scaleQuantize<string>()
  .domain([0, 100])
  .range([
    "#c6b8cf",
    '#b09dbc',
    '#9f81b3',
    '#8861a0',
    '#673a84',
    '#542572',
    "#42145f"
  ]);

const MapWithTimeSlider: React.FC<MapWithTimeSliderProps> = (props) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [dataIndex, setDataIndex] = useState(props.seriesData.slider.labels.length - 1);
  const [selectedSeries, setSelectedSeries] = useState<undefined | MapSeriesData>(props.seriesData.series.length > 0 ? props.seriesData.series[0] : undefined);

  const colorScale = selectedSeries ? scaleQuantize<string>()
    .domain([selectedSeries.colorScale.min, selectedSeries.colorScale.max])
    .range(selectedSeries.colorScale.colors) : defaultColorScale;

  const localOptions = { minimumFractionDigits: 1, maximumFractionDigits: 1 };

  const seriesSelector = (data: MapWithTimeSliderProps) => <nav aria-label="plot selection">
    <ul className="pagination justify-content-center d-block d-sm-flex">
      {data.seriesData.series.map(dt =>
        <li key={dt.name}
          role="button"
          className={clsx(
            "page-item",
            { 'active': dt.name === selectedSeries?.name })}
          onClick={() => setSelectedSeries(dt)}
        >
          <span className="page-link">{dt.name}</span>
        </li>
      )}
    </ul>
  </nav>;

  const renderLegend = () => {
    if (!selectedSeries?.legend.show) {
      return null;
    }

    const items = <React.Fragment>{
      selectedSeries.colorScale.colors.slice().reverse().map((item, index) => {
        const scaleStep = (selectedSeries.colorScale.max - selectedSeries.colorScale.min) / selectedSeries.colorScale.colors.length;
        const start = selectedSeries.colorScale.max - (index + 1) * scaleStep;
        const end = start + scaleStep;
        return <div
          key={index.toString()}
          className="d-inline-flex align-items-center justify-content-start align-self-start mx-2 mx-sm-0 mb-1 mb-sm-0">
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: item
            }}>
          </div>
          <div className="ms-1">
            {start.toLocaleString(props.language, localOptions)} - {end.toLocaleString(props.language, localOptions)}
          </div>
        </div>

      })
    }</React.Fragment>;

    return <React.Fragment>
      <div className={clsx(
        "pe-none",
        "d-none d-sm-inline-block position-absolute fw-bold",
        `${selectedSeries.legend.position.y}-0`,
        {
          "text-start start-0": selectedSeries.legend.position.x === 'left',
          "text-end end-0": selectedSeries.legend.position.x === 'right',
        }
      )} style={{ fontSize: '0.8rem' }}>
        <div className="text-end mb-1 px-1">
          {selectedSeries.legend.title}
        </div>
        <div
          className="d-inline-flex flex-column px-1 py-1 align-items-start" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          {items}
        </div>
      </div>

      {/* For small screens: */}
      <div className="d-block d-sm-none fw-bold text-start" style={{ pointerEvents: 'none', top: 0, fontSize: '0.8rem' }}>
        <div className="w-100 text-start mb-1 px-1">
          {selectedSeries.legend.title}
        </div>
        <div className="d-inline-flex flex-row justify-content-evenly flex-wrap px-1 pb-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          {items}
        </div>
      </div>
    </React.Fragment>
  }

  return (
    <React.Fragment> {props.geoData ?
      <div className="w-100 text-center py-2 pb-3 px-0 px-md-2">
        {seriesSelector(props)}
        <h5>
          {selectedSeries?.title}
        </h5>
        <div
          className="position-relative"
        >
          {renderLegend()}
          <div className="ps-4 px-lg-4 px-sm-2 px-0">

            <ComposableMap
              projection="geoAzimuthalEqualArea"
              projectionConfig={{
                rotate: props.geoData.projection.rotate,
                scale: props.geoData.projection.scale
              }}
              width={props.geoData.size.width}
              height={props.geoData.size.height}
              data-tip=""
            >
              <Geographies geography={props.geoData.topojson}
                fill="#d3d3d3"
                stroke="#FFFFFF"
                strokeWidth={0.3}
              >
                {({ geographies }) => geographies.map(geo => {
                  // console.log(geo);
                  const value = selectedSeries?.data.find(d => d.name.includes(geo.properties.name))?.sequence[dataIndex];
                  return <Geography
                    fill={value ? colorScale(value) : undefined}
                    key={geo.rsmKey} geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(
                        `<span>${geo.properties.name}</span><br><span>${value?.toLocaleString(props.language, localOptions)}</span>`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    style={{
                      default: {
                        outline: 'none',
                      },
                      hover: {
                        outline: 'none',
                        stroke: selectedSeries?.colorScale.hoverStrokeColor ? selectedSeries?.colorScale.hoverStrokeColor : '#FD4',
                        strokeWidth: 5,

                      },
                      pressed: {
                        outline: 'none',
                        stroke: selectedSeries?.colorScale.hoverStrokeColor ? selectedSeries?.colorScale.hoverStrokeColor : '#FD4',
                        strokeWidth: 2,
                      }
                    }}
                  />
                }
                )}
              </Geographies>

            </ComposableMap>
          </div>
        </div>


        <div className="text-center w-100 justify-content-center">
          <div className="px-3 pb-0 mb-0">
            <div className="w-100 text-center text-primary fw-bold">
              {props.seriesData.slider.labels[dataIndex]}
            </div>
            <Slider
              id="mapSlider"
              min={0}
              max={props.seriesData.slider.labels.length - 1}
              step={props.seriesData.slider.hideTicks ? undefined : 1}
              value={dataIndex}
              onChange={(value) => {
                setDataIndex(value ? value : 0);
              }}
            />
            <div className="d-flex">
              <span className="flex-grow-1 text-start">
                {props.seriesData.slider.minLabel}
              </span>
              <span className="">
                {props.seriesData.slider.maxLabel}
              </span>
            </div>
          </div>
        </div>
        <ReactTooltip html={true}>{tooltipContent}</ReactTooltip>
      </div>
      : null}
    </React.Fragment >
  );
};

export default MapWithTimeSlider;
