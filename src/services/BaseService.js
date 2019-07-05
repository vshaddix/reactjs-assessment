import config from '../config/environment';

class BaseService {
  /**
   * @type {string}
   */
  apiBaseUrl = config.apiBaseUrl;

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

export default BaseService;
