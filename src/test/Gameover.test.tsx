jest.mock("../components/game/Score");

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ type: "pop" }),
    useHistory: () => ({ push: mockHistoryPush }),
  };
});

import 'jest-styled-components';
import React from 'react';
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import renderer from 'react-test-renderer';

import Gameover from "../components/game/Gameover";
import Score from "../components/game/Score";

describe("<Gameover/>", () => {
  const reset = jest.fn();
  // @ts-ignore
  Score.mockImplementation(() => {
    return {
      increase: () => { },
      get: () => 0,
      reset,
    }
  });

  it('renders correctly', () => {
    const score = Score();
    const tree = renderer
      .create(
        <BrowserRouter>
          <Gameover score={score} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("button", () => {
    const score = Score();
    let container: HTMLElement;

    beforeAll(() => {
      container = document.createElement("div");
      ReactTestUtils.act(() => {
        ReactDOM.render((
          <BrowserRouter>
            <Gameover score={score} />
          </BrowserRouter>
        ), container);
      });
    });

    it("calls reset() upon click", () => {
      const button = container.querySelector("#tryAgain");
      ReactTestUtils.Simulate.click(button!);
      expect(score.reset).toBeCalled();
    });

    it("pushes to history to navigate to game", () => {
      const button = container.querySelector("#tryAgain");
      ReactTestUtils.Simulate.click(button!);
      expect(mockHistoryPush).toBeCalledWith("/game/pop");
    });
  });
});
