import React from 'react';
import { create } from "react-test-renderer";
import MeasurementCell from '../../components/MeasurementCell/MeasurementCell';

it('renders (snapshot test)', () => {
  const component = create(<MeasurementCell />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders the component correctly when passed full data', () => {
  const component = create(<MeasurementCell parameter="test" unit="test-unit" value={21} />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders the component correctly when no value is passed', () => {
  const component = create(<MeasurementCell parameter="test" unit="test-unit" />);

  expect(component.toJSON()).toMatchSnapshot();
});

