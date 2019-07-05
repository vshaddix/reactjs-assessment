import React from 'react';
import { create } from "react-test-renderer";
import CityCard from '../../components/CityCard/CityCard';

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
  const component = create(<CityCard />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders correctly when city and country are passed', () => {
  const component = create(<CityCard city={"Sofiq"} country={"Bulgaria"} />);

  expect(component.toJSON()).toMatchSnapshot();
});
