import React from 'react';
import { create } from "react-test-renderer";
import CitiesList from '../../components/CitiesList/CitiesList';

jest.mock('../../services/MeasurementsService', () => {
  return function () {
    return {
      getMeasurementsForACity: () => {
        return new Promise(resolve => resolve([]))
      }
    }
  };
});

it('renders (snapshot test)', () => {
  const component = create(<CitiesList />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders correctly when at least one object with city and country are passed', () => {
  const cities = [
    {
      city: "Sofiq",
      country: "Bulgaria"
    },
    {
      city: "Plovediv",
      country: "Bulgaria"
    }
  ];
  const parametersToDisplay = ['pm25'];
  const component = create(<CitiesList cities={cities} parametersToDisplay={parametersToDisplay} />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders correctly when a count is passed', () => {
  const cities = [
    {
      city: "Sofiq",
      country: "Bulgaria"
    },
    {
      city: "Plovediv",
      country: "Bulgaria"
    }
  ];
  const parametersToDisplay = ['pm25'];
  const component = create(<CitiesList cities={cities} parametersToDisplay={parametersToDisplay} count={1}/>);

  expect(component.toJSON()).toMatchSnapshot();
});
