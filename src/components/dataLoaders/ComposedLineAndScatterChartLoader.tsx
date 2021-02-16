import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getExternalOrLocalContentURL } from '../../utils/routeUtils';
import ComposedLineAndScatterChart, { ChartConfig } from '../charts/ComposedLineAndScatterChart';


interface ComposedLineAndScatterChartLoaderProps {
  dataUrl: string;
}

const ComposedLineAndScatterChartLoader: React.FC<ComposedLineAndScatterChartLoaderProps> = (props) => {
  const [data, setData] = useState<ChartConfig | undefined>();
  const { i18n } = useTranslation();

  useEffect(() => {
    fetch(getExternalOrLocalContentURL(props.dataUrl))
      .then(res => res.json())
      .then(json => {
        console.log(json)
        const chartData: ChartConfig = json;
        setData(chartData);
      })
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataUrl]);


  const loadingContent = () => <div
    className="d-flex align-items-center bg-secondary justify-content-center my-2"
    style={{ minHeight: 400 }}
  >
    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>

  if (!data) {
    return loadingContent();
  }

  return (
    <ComposedLineAndScatterChart
      chart={data}
      locale={i18n.language}
    />
  );
};

export default ComposedLineAndScatterChartLoader;
