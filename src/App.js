import React, { Component } from "react";
import OpenAQService from './services/OpenAQService';

import MeasurementCell from './components/MeasurementCell/MeasurementCell';

class App extends Component {
  constructor() {
    super();
    this.state = { cities: [], singleMeasurements: { parameter: null, value: null, unit: null } };
  }

  async componentDidMount() {
    const service = new OpenAQService();

    let cities = await service.getCities();
    if (cities.meta && cities.meta.found > 100) {
      cities = await service.getCities({ limit: cities.meta.found });
    }

    const firstCity = cities.results[0];
    const cityMeasurements = await service.getLatestMeasurements({ city: firstCity.city, country: firstCity.country});
    this.setState({
      cities: cities.results,
      singleMeasurements: cityMeasurements.results[0].measurements[0]
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MeasurementCell
            parameter={this.state.singleMeasurements.parameter}
            unit={this.state.singleMeasurements.unit}
            value={this.state.singleMeasurements.value}
          />
        </header>
      </div>
    );
  }
}

export default App;
