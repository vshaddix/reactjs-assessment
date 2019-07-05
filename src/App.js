import React, { Component } from "react";
import OpenAQService from './services/OpenAQService';

import CitiesList from './components/CitiesList/CitiesList';
import AutoComplete from './components/AutoCompleteSelect/AutoCompleteSelect';

class App extends Component {
  constructor() {
    super();

    this.openAQService = new OpenAQService();
    this.state = {
      cities: [],
      autoCompleteCities: [],
    };

    this.onCityAutocompleteInput = this.onCityAutocompleteInput.bind(this);
    this.onCitySelect = this.onCitySelect.bind(this);
  }

  async componentDidMount() {
    let cities = await this.openAQService.getCities();
    if (cities.meta && cities.meta.found > 100) {
      cities = await this.openAQService.getCities({ limit: cities.meta.found });
    }

    this.setState({
      cities: cities.results,
      autoCompleteCities: cities.results
    });
  }

  getSuggestedCities(inputtedValue) {
    if (! inputtedValue) {
      return this.state.cities;
    }

    this.setState({
      autoCompleteCities: this.state.cities.filter(city => city.city.toLowerCase().indexOf(inputtedValue.toLowerCase()) !== -1)
    });
  }

  onCityAutocompleteInput(inputtedValue) {
    this.getSuggestedCities(inputtedValue);
  }

  //TODO
  onCitySelect() {}

  render() {
    const bodyStyle = {
      marginLeft: '5%',
      marginRight: '5%',
      paddingTop: '3%',
    };

    const autoCompleteCities = Array.from(new Set(this.state.autoCompleteCities.map(city => city.city)));

    return (
      <div className="App" style={bodyStyle}>
        <AutoComplete
          values={autoCompleteCities}
          onInput={this.onCityAutocompleteInput}
          onSelect={this.onCitySelect}
          placeholder="city"
        />
        <hr/>
        <CitiesList cities={this.state.cities} />
      </div>
    );
  }
}

export default App;
