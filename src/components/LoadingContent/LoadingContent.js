import React from "react";

export default ({ linesCount = 1 }) => {
  const lines = [];

  for(let x = 0; x < linesCount; x++) {
    lines.push(<div className={"line"}/>);
  }

  return (
    <div className="ui placeholder">
      {lines}
    </div>
  );
};
