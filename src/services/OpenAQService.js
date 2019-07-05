import config from '../config/environment';

class OpenAQService {
  /**
   * @type {string}
   */
  apiBaseUrl = config.apiBaseUrl;

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
      throw new Error(`You have included a filter by parameter which is not allowed (${parameter}) `);

    return true;
  }

  /**
   * Query method for fetching data.
   *
   * @param url {String}
   * @param queryParameters {Object}
   * @return {Promise}
   * @private
   */
  _query(url, queryParameters) {
    return this._fetch(url, {
      method: 'GET',
      params: queryParameters
    });
  }

  /**
   * Creates the sub string for the get url used in _fetch.
   * TODO: try to refactor it using the URL and URLSearchString Javascript APIs.
   *
   * @param queryParams {Object}
   * @return {string}
   * @private
   */
  _constructQueryParamsString(queryParams = {}) {
    return Object.keys(queryParams)
      .map(key => {
        if (typeof queryParams[key] === 'object') {
          return queryParams[key].map(value => `${encodeURIComponent(key)}[]=${encodeURIComponent(value)}`).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key])
      })
      .join('&');
  }

  /**
   * Private method used to make a request to the API.
   * Creates and formats the url based on the options passed.
   *  -params (or query parameters)
   *
   *  Uses the Javascript native fetch API.
   *
   * @param url {String}
   * @param options {Object}
   * @private
   */
  _fetch(url, options = {}) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (options.params) {
      url = `${url}?${this._constructQueryParamsString(options.params)}`;
    }
    return fetch(url, {
      headers
    })
    .then(response => response.json())
  }
}

export default OpenAQService;
