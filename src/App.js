import React, { Component } from "react";
import OpenAQService from './services/OpenAQService';
import config from './config/environment';

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
      filteredParameters: config.allowedParameters,
      citiesCount: 20,
      selectedCity: null,
    };

    this.onCityAutocompleteInput = this.onCityAutocompleteInput.bind(this);
    this.onCitySelect = this.onCitySelect.bind(this);
    this.loadMoreCities = this.loadMoreCities.bind(this);
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

    navigator.geolocation.getCurrentPosition(async position => {
      const results = await this.openAQService.getNearestCityByCoordinates(position.coords.latitude, position.coords.longitude);

      if (results.results.length) {
        const nearest = results.results[0];
        const city = this.state.cities.find(city => city.city === nearest.city && city.country === nearest.country);
        this.setState({
          selectedCity: city
        });
      }
    });
  }

  loadMoreCities() {
    this.setState({
      citiesCount: this.state.citiesCount + 20,
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

  onParametersChange(event) {
    const selectedParameters = [...event.target.children]
      .filter(option => option.selected)
      .map(option => option.value);

    if (selectedParameters.includes('all')) {
      this.setState({
        filteredParameters: config.allowedParameters
      });

      return;
    }

    this.setState({
      filteredParameters: selectedParameters
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
        <div>Selected city information</div>
        <CityCard
          key={this.state.selectedCity.id}
          city={this.state.selectedCity.city}
          country={this.state.selectedCity.country}
          parametersToDisplay={this.state.filteredParameters}
        />
        <hr/>
      </div>
    ) : '';

    const parametersOptions = config.allowedParameters.map(param => <option key={param} value={param}>{param}</option>)

    return (
      <div className="App" style={bodyStyle}>
        <AutoComplete
          values={this.state.autoCompleteCities}
          onInput={this.onCityAutocompleteInput}
          onSelect={this.onCitySelect}
          placeholder="city"
        />
        <hr/>
        <div>
          <label htmlFor="">Filter parameters.</label>
          <select onChange={e => this.onParametersChange(e)} style={{width:"200px", height:"150px"}} name="" multiple id="">
            <option key="all" value="all">All</option>
            {parametersOptions}
          </select>
          <hr/>
        </div>
        {selectedCity}
        <CitiesList
          cities={this.state.cities}
          parametersToDisplay={this.state.filteredParameters}
          count={this.state.citiesCount}
        />
        <hr/>
        <button className="massive ui button" onClick={this.loadMoreCities}>Load more</button>
      </div>
    );
  }
}

export default App;
