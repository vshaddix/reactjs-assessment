import BaseService from './BaseService';

/**
 * Class for communication with the OpenAQ Api.
 */
class OpenAQService extends BaseService {
  /**
   *
   * @param queryParameters
   * @return {Promise}
   */
  getCities(queryParameters = { limit: 100 }) {
    return this._query(this._citiesUrl, queryParameters);
  }

  /**
   *
   * @param queryParameters
   * @return {Promise}
   */
  getMeasurements(queryParameters = {}) {
    if (queryParameters.parameter) {
      if (typeof queryParameters.parameter === 'object') {
        queryParameters.parameter.forEach(param => this._validateParameterForMeasurements(param));
      } else {
        this._validateParameterForMeasurements(queryParameters.parameter);
      }
    }

    return this._query(this._measurementsUrl, queryParameters);
  }

  /**
   * Returns the `cities` module base url used in the OpenAQ API.
   *
   * @return {string}
   * @private
   */
  get _citiesUrl() {
    return `${this.apiBaseUrl}/cities`;
  }

  /**
   * Returns the `measurements` module base url used in the OpenAQ API.
   *
   * @return {string}
   * @private
   */
  get _measurementsUrl() {
    return `${this.apiBaseUrl}/measurements`;
  }

  /**
   * The allowed parameters for checking measurements.
   *
   * @type {[string,string,string,string,string,string,string]}
   */
  _allowedParameters = ['pm25', 'pm10', 'so2', 'no2', 'o3', 'co', 'bc'];

  /**
   * If the passed parameter is not found in the allowed parameters for the API, the function will throw an error.
   *
   * @param parameter {String}
   * @throws Error
   * @returns {Boolean}
   * @private
   */
  _validateParameterForMeasurements(parameter) {
    if (!this._allowedParameters.includes(parameter))
      throw new Error(`You have included a filter by parameter which is not allowed (${parameter})`);

    return true;
  }
}

export default OpenAQService;
