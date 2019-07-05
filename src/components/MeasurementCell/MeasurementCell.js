import React from "react";
import './MeasurementCell.scss';
import LoadingContent from '../LoadingContent/LoadingContent';

export default ({ parameter, unit, value }) => {
  if (!parameter) {
    return <LoadingContent linesCount={1} />;
  }

  return (
    <div>
      <span>{parameter}</span> : <span>{value} {unit}</span>
    </div>
  );
};
