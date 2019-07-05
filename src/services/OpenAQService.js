import BaseService from './BaseService';
import config from '../config/environment';

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
      this._validateParametersForMeasurements(queryParameters.parameter);
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
   * Returns the `latest` module base url used in the OpenAQ API.
   *
   * @return {string}
   * @private
   */
  get _latestUrl() {
    return `${this.apiBaseUrl}/latest`;
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
  _allowedParameters = config.allowedParameters;

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

  _validateParametersForMeasurements(parameters) {
    if (typeof parameters === 'object') {
      parameters.forEach(param => this._validateParameterForMeasurements(param));
    } else {
      this._validateParameterForMeasurements(parameters);
    }

    return true;
  }
}

export default OpenAQService;
