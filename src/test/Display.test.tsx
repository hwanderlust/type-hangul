import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';

import Display from "../components/game/Display";

describe("<Display/>", () => {
  it("renders correctly for 'run'", () => {
    const tree = renderer
      .create(
        <Display game="run" objects={[]} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly for 'pop'", () => {
    const tree = renderer
      .create(
        <Display game="pop" objects={[]} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly for 'jump'", () => {
    const tree = renderer
      .create(
        <Display game="jump" objects={[]} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
