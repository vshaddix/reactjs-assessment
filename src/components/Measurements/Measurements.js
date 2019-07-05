import React from 'react';
import LoadingContent from '../LoadingContent/LoadingContent';
import MeasurementCell from '../MeasurementCell/MeasurementCell';

export default ({ measurements }) => {
  if (!measurements) {
    return <LoadingContent linesCount={7} />;
  }

  const measures = [];
  measurements.forEach(measure => measures.push(<MeasurementCell
    key={measure.parameter}
    parameter={measure.parameter}
    unit={measure.unit}
    value={measure.value} />));

  return (
    <div className="event">
      <div className="content">
        <div className="summary">
          {measures}
        </div>
      </div>
    </div>
  );
};
