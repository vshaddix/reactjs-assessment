import React from "react";
import './MeasurementCell.scss';
import LoadingContent from '../LoadingContent/LoadingContent';

export default ({ parameter, unit, value }) => {
  if (!parameter) {
    return <LoadingContent linesCount={1} />;
  }

  const displayValue = !value ? (<span>-</span>) : (<span>{value} {unit}</span>);

  return (
    <div>
      <span>{parameter}</span>: {displayValue}
    </div>
  );
};
