import 'jest-styled-components';
import React from 'react';
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import renderer from 'react-test-renderer';

import Keyboard from "../components/common/Keyboard";

const noOp = () => { };

describe("<Keyboard/>", () => {
  let container: HTMLDivElement;
  let onSubmit: (word: string) => void;

  beforeAll(() => {
    container = document.createElement("div");
    onSubmit = jest.fn();
    ReactDOM.render(<Keyboard onSubmit={onSubmit} />, container);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<Keyboard onSubmit={noOp} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("doesn't pass up the typed word when typing", () => {
    const input = container.querySelector("input");
    if (input) {
      input.value = "바보";
      ReactTestUtils.Simulate.change(input);
      expect(onSubmit).not.toBeCalled();
    }
  });

  it("passes up the typed word when hitting 'Enter' and input value is cleared", () => {
    const input = container.querySelector("input");
    const form = container.querySelector("form");
    if (input && form) {
      input.value = "바보";
      ReactTestUtils.Simulate.change(input);
      ReactTestUtils.Simulate.submit(form);

      expect(onSubmit).toBeCalledWith("바보");
      expect(input.value).toBe("");
    }
  });
});
