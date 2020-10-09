import 'jest-styled-components';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import renderer from 'react-test-renderer';

import About from "../components/static/About";

describe("<About/>", () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <About />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
