import 'jest-styled-components';
import React from 'react';
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import renderer from 'react-test-renderer';

import Keyboard from "../components/common/Keyboard";

const noOp = () => { };

describe("<Keyboard/>", () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Keyboard onKeyPress={noOp} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes pressed key up to parent upon keydown event", () => {
    interface EventListeners {
      error?: EventListenerOrEventListenerObject;
      keydown?: EventListenerOrEventListenerObject;
      keyup?: EventListenerOrEventListenerObject;
    }
    type Event = "error" | "keydown" | "keyup";
    const map: EventListeners = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[(event as Event)] = cb;
    });
    const onKeyPress = jest.fn();

    const container = document.createElement("div");
    ReactTestUtils.act(() => {
      ReactDOM.render(<Keyboard onKeyPress={onKeyPress} />, container);
    });
    ReactTestUtils.act(() => {
      if (map.keydown) {
        // @ts-ignore
        map.keydown({ key: "KeyA" })
      }
      expect(onKeyPress).toBeCalledWith("KeyA");
    });
  });
});
