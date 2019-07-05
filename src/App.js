import React, { Component } from "react";
import OpenAQService from './services/OpenAQService';

import CitiesList from './components/CitiesList/CitiesList';

class App extends Component {
  constructor() {
    super();

    this.openAQService = new OpenAQService();
    this.state = {
      cities: [],
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
      marginLeft: '5%',
      marginRight: '5%',
      paddingTop: '3%',
    };

    return (
      <div className="App" style={bodyStyle}>
        <CitiesList cities={this.state.cities} />
      </div>
    );
  }
}

export default App;
