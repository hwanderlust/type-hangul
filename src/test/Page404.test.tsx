import 'jest-styled-components';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import renderer from 'react-test-renderer';

import Page404 from "../components/common/Page404";

describe("<Page404 />", () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Page404 />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
