import React, { Component } from 'react';
import LoadingContent from '../LoadingContent/LoadingContent';
import Measurements from '../Measurements/Measurements';
import MeasurementsService from '../../services/MeasurementsService';

class CityCard extends Component {
  constructor(props) {
    super();

    this.measurementsService = new MeasurementsService();
    this.state = {
      city: props.city,
      country: props.country,
      measurements: null
    };
  }

  componentDidMount() {
    this.measurementsService.getMeasurementsForACity(this.state.city, this.state.country).then(result => {
      this.setState({
        measurements: result,
      });
    });
  }

  render() {
    if (!this.state.city) {
      return <LoadingContent linesCount={3} />;
    }

    return (
      <div className="ui card">
        <div className="content">
          <div className="header">{this.state.city}</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Measurements</h4>
          <Measurements measurements={this.state.measurements} />
        </div>
      </div>
    );
  }
}

export default CityCard;
