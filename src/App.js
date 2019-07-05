import React, { Component } from "react";
import OpenAQService from './services/OpenAQService';
import MeasurementsService from './services/MeasurementsService';

import CityCard from './components/CityCard/CityCard';

class App extends Component {
  constructor() {
    super();

    this.openAQService = new OpenAQService();
    this.measurementsService = new MeasurementsService();
    this.state = {
      cities: [],
      displayCities: [],
    };
  }

  async componentDidMount() {
    let cities = await this.openAQService.getCities();
    if (cities.meta && cities.meta.found > 100) {
      cities = await this.openAQService.getCities({ limit: cities.meta.found });
    }

    this.setState({
      cities: cities.results,
    });
  }

  render() {
    const bodyStyle = {
      marginLeft: '20%',
      marginRight: '20%',
      paddingTop: '3%',
    };

    const size = 20;
    const items = this.state.cities.slice(0, size).map(city => {
      return (
        <CityCard
          key={city.city + city.country}
          city={city.city}
          country={city.country}
        />
      );
    });
    return (
      <div className="App" style={bodyStyle}>
        <div>
          {items}
        </div>
      </div>
    );
  }
}

export default App;
