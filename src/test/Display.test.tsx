import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';

import Display from "../components/game/Display";

describe("<Display/>", () => {
  const ryanRef = () => document.createElementNS("http://www.w3.org/2000/svg", "svg");

  it("renders correctly for 'pop'", () => {
    const tree = renderer
      .create(
        <Display game="pop" ryanRef={ryanRef}>
          <div></div>
        </Display>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly for 'jump'", () => {
    const tree = renderer
      .create(
        <Display game="jump" ryanRef={ryanRef} >
          <div></div>
        </Display>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
