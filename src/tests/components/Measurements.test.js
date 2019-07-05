import React from 'react';
import { create } from "react-test-renderer";
import Measurement from '../../components/Measurements/Measurements';

it('renders (snapshot test)', () => {
  const component = create(<Measurement />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders the component correctly when passed full data', () => {
  const measurements = [
    {
      parameter: "test",
      value: "1",
      unit: 7
    },
    {
      parameter: "test2",
      value: "2",
      unit: 2
    }
  ];

  const component = create(<Measurement measurements={measurements} />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders the component correctly when no value is passed for only one measure', () => {
  const measurements = [
    {
      parameter: "test",
      value: "1",
      unit: 7
    },
    {
      parameter: "test2",
      unit: 2
    }
  ];

  const component = create(<Measurement measurements={measurements} />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders the component correctly when empty array is passed as measurements', () => {
  const measurements = [];

  const component = create(<Measurement measurements={measurements} />);

  expect(component.toJSON()).toMatchSnapshot();
});
