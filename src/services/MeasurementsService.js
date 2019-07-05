import OpenAQService from "./OpenAQService";

class MeasurementsService extends OpenAQService {
  /**
   * Returns an array of objects. For each measurement available and the corresponding data for the passed city.
   *
   * @param city
   * @param country
   * @return {Promise.<TResult>}
   */
  getMeasurementsForACity(city, country) {
    const allowedParameters = this._allowedParameters;


    const promises = [];
    allowedParameters.forEach(parameter => {
      promises.push(this.getMeasurements({ city, country, parameter }));
    });

    return Promise.all(promises).then(measurements => {
      const result = [];
      const foundMeasures = new Set();

      measurements.forEach(measurement => {
        if (measurement.results.length === 0) return;

        const measure = measurement.results[0];
        foundMeasures.add(measure.parameter);

        result.push({
          parameter: measure.parameter,
          value: measure.value,
          unit: measure.unit,
        })
      });

      allowedParameters.forEach(parameter => {
        if(! foundMeasures.has(parameter)) {
          result.push({
            parameter: parameter,
            value: null,
            unit: null,
          })
        }
      });

      return result;
    });
  }
}

export default MeasurementsService;
