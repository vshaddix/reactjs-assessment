import React from "react";
import CityCard from '../CityCard/CityCard';

export default ({ cities, parametersToDisplay, count = 20 }) => {
  if (!cities) {
    return <div class="ui loader" />;
  }

  const items = cities.slice(0, count).map(city => {
    return (
      <CityCard
        key={city.city + city.country}
        city={city.city}
        country={city.country}
        parametersToDisplay={parametersToDisplay}
      />
    );
  });


  return (
    <div className="ui cards">
      {items}
    </div>
  );
};
