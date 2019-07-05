import React, { Component } from "react";
import OpenAQService from './services/OpenAQService';

import CitiesList from './components/CitiesList/CitiesList';
import CityCard from './components/CityCard/CityCard';
import AutoComplete from './components/AutoCompleteSelect/AutoCompleteSelect';

class App extends Component {
  constructor() {
    super();

    this.openAQService = new OpenAQService();
    this.state = {
      cities: [],
      autoCompleteCities: [],
      selectedCity: null,
    };

    this.onCityAutocompleteInput = this.onCityAutocompleteInput.bind(this);
    this.onCitySelect = this.onCitySelect.bind(this);
  }

  async componentDidMount() {
    let cities = await this.openAQService.getCities();
    if (cities.meta && cities.meta.found > 100) {
      cities = await this.openAQService.getCities({ limit: cities.meta.found });
    }

    let id = 0;
    cities = cities.results.map(res => { return { ...res, id: ++id, text: res.city } });
    this.setState({
      cities,
      autoCompleteCities: cities
    });
  }

  getSuggestedCities(inputtedValue) {
    if (! inputtedValue) {
      this.setState({
        autoCompleteCities: this.state.cities
      });
    }

    this.setState({
      autoCompleteCities: this.state.cities.filter(city => city.city.toLowerCase().indexOf(inputtedValue.toLowerCase()) !== -1)
    });
  }

  onCityAutocompleteInput(inputtedValue) {
    this.getSuggestedCities(inputtedValue);
  }

  onCitySelect(value) {
    this.setState({
      selectedCity: this.state.cities.find(city => city.id === parseInt(value))
    });
  }

  render() {
    const bodyStyle = {
      marginLeft: '5%',
      marginRight: '5%',
      paddingTop: '3%',
    };

    const selectedCity = this.state.selectedCity ? (
      <div>
        <CityCard
          key={this.state.selectedCity.id}
          city={this.state.selectedCity.city}
          country={this.state.selectedCity.country}
        />
        <hr/>
      </div>
    ) : '';
    
    return (
      <div className="App" style={bodyStyle}>
        <AutoComplete
          values={this.state.autoCompleteCities}
          onInput={this.onCityAutocompleteInput}
          onSelect={this.onCitySelect}
          placeholder="city"
        />
        <hr/>
        {selectedCity}
        <CitiesList cities={this.state.cities} />
      </div>
    );
  }
}

export default App;
