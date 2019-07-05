import React from 'react';
import { create } from "react-test-renderer";
import LoadingContent from '../../components/LoadingContent/LoadingContent';

it('renders (snapshot test)', () => {
  const component = create(<LoadingContent />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders the component correctly when passed N lines as argument', () => {
  const component = create(<LoadingContent lines={5} />);

  expect(component.toJSON()).toMatchSnapshot();
});
