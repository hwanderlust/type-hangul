import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';

import Disclosure from "../components/common/Disclosure";

describe("<Disclosure/>", () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Disclosure />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
