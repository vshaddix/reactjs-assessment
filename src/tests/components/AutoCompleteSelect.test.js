import React from 'react';
import { create } from "react-test-renderer";
import AutoCompleteSelect from '../../components/AutoCompleteSelect/AutoCompleteSelect';
import { shallow } from 'enzyme';

const values = [
  {
    id: 1,
    text: '1'
  },
  {
    id: 2,
    text: '2'
  }
];

it('renders (snapshot test)', () => {
  const component = create(<AutoCompleteSelect />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders correctly when values are passed', () => {
  const component = create(<AutoCompleteSelect values={values} />);

  expect(component.toJSON()).toMatchSnapshot();
});

it('renders calls the passed onInput closure', () => {
  const onInput = jest.fn();
  const component = shallow(<AutoCompleteSelect values={values} onInput={onInput} />);
  component.find('input').simulate('input', { target: { value: 'inputtedValue' }});

  expect(onInput.mock.calls.length).toEqual(1);
});
