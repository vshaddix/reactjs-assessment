import OpenAQService from '../../services/OpenAQService'

describe('OpenAQService tests', () => {
  let service;
  beforeEach(() => {
    service = new OpenAQService();
  });

  it('throws error if parameter is not allowed calling _validateParameterForMeasurements', () => {
    expect(() => {
      service._validateParameterForMeasurements('pm2')
    }).toThrowError(new Error(`You have included a filter by parameter which is not allowed (pm2)`));
  });

  it('throws error if parameter is empty calling _validateParameterForMeasurements', () => {
    expect(() => {
      service._validateParameterForMeasurements()
    }).toThrowError(new Error(`You have included a filter by parameter which is not allowed (undefined)`));
  });

  it('returns true if the passed parameter is in the allowed list.', () => {
    expect(service._validateParameterForMeasurements('pm25')).toBeTruthy();
  });

  it('calls the _query method with proper arguments when we request the cities', () => {
    const params = 'test value';
    service._query = jest.fn();

    service.getCities(params);

    expect(service._query).toHaveBeenCalledTimes(1);
    expect(service._query).toHaveBeenCalledWith(service._citiesUrl, params);
  });

  it('calls the _query method with proper arguments when we request the measurements', () => {
    const params = 'test value';
    service._query = jest.fn();

    service.getMeasurements(params);

    expect(service._query).toHaveBeenCalledTimes(1);
    expect(service._query).toHaveBeenCalledWith(service._measurementsUrl, params);
  });

  describe('the service will throw an error when', () => {
    const notAllowedParam = 'not allowed';

    beforeEach(() => {
      service._query = jest.fn();
    });

    describe('getMeasurements', () => {
      it('is called with an array of parameters and only one is not allowed', () => {
        expect(() => {
          service.getMeasurements({ parameter: ['pm25', 'pm10', notAllowedParam]})
        }).toThrowError(new Error(`You have included a filter by parameter which is not allowed (${notAllowedParam})`));
      });

      it('is called with only one parameter and it is not allowed', () => {
        expect(() => {
          service.getMeasurements({ parameter: notAllowedParam})
        }).toThrowError(new Error(`You have included a filter by parameter which is not allowed (${notAllowedParam})`));
      });
    });

    describe('getLatestMeasurements', () => {
      it('is called with an array of parameters and only one is not allowed', () => {
        expect(() => {
          service.getLatestMeasurements({ parameter: ['pm25', 'pm10', notAllowedParam]})
        }).toThrowError(new Error(`You have included a filter by parameter which is not allowed (${notAllowedParam})`));
      });

      it('is called with only one parameter and it is not allowed', () => {
        expect(() => {
          service.getLatestMeasurements({ parameter: notAllowedParam})
        }).toThrowError(new Error(`You have included a filter by parameter which is not allowed (${notAllowedParam})`));
      });
    });
  });
});
