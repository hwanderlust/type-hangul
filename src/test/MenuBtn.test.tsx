import 'jest-styled-components';
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import MenuBtn from "../components/common/MenuBtn";

describe("<MenuBtn/>", () => {
  it("renders correctly in its closed state", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <MenuBtn />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly in its opened state", () => {
    const container = document.createElement("div");
    ReactTestUtils.act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <MenuBtn />
        </BrowserRouter>, container);
    });

    const button = container.querySelector("button");
    if (button) {
      ReactTestUtils.Simulate.click(button);
      expect(container.innerHTML).toMatchSnapshot();
    }
  });
});
