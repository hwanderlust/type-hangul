import 'jest-styled-components';
import React from 'react';
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import renderer from 'react-test-renderer';

import Keyboard, { Test } from "../components/common/Keyboard";

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

describe("Keyboard helpers", () => {
  const { isEnglish, isLowercaseEnglish, isUppercaseEnglish } = Test;

  describe("isLowercaseEnglish()", () => {
    it("detects if a word is a lowercase English letter by the first character only", () => {
      expect(isLowercaseEnglish("a그래")).toBe(true);
      expect(isLowercaseEnglish("gㅋㅋㅋ")).toBe(true);
      expect(isLowercaseEnglish("그래z")).toBe(false);
      expect(isLowercaseEnglish("그123")).toBe(false);
    });
    it("doesn't consider numerical values as 'English'", () => {
      expect(isLowercaseEnglish("123")).toBe(false);
      expect(isLowercaseEnglish("0")).toBe(false);
      expect(isLowercaseEnglish("7asdf")).toBe(false);
      expect(isLowercaseEnglish("666ㅋㅋ")).toBe(false);
    });
  });

  describe("isUppercaseEnglish()", () => {
    it("detects if a word is a uppercase English letter by the first character only", () => {
      expect(isUppercaseEnglish("A그래")).toBe(true);
      expect(isUppercaseEnglish("Gㅋㅋㅋ")).toBe(true);
      expect(isUppercaseEnglish("그래Z")).toBe(false);
      expect(isUppercaseEnglish("그123")).toBe(false);
    });
    it("doesn't consider numerical values as 'English'", () => {
      expect(isUppercaseEnglish("123")).toBe(false);
      expect(isUppercaseEnglish("0")).toBe(false);
      expect(isUppercaseEnglish("7ASDF")).toBe(false);
      expect(isUppercaseEnglish("666ㅋㅋ")).toBe(false);
    });
  });

  describe("isEnglish()", () => {
    it("doesn't error out and returns FALSE if a nullish value", () => {
      expect(isEnglish(undefined)).toBe(false);
      expect(isEnglish(null)).toBe(false);
      expect(isEnglish("")).toBe(false);
    });
    it("detects if a given word is 'English' by its first character only", () => {
      expect(isEnglish("I am a 바보")).toBe(true);
      expect(isEnglish("바보 I am")).toBe(false);
      expect(isEnglish("what is a 바보?")).toBe(true);
      expect(isEnglish("내가!")).toBe(false);
      expect(isEnglish("!!!")).toBe(false);
      expect(isEnglish("! oops")).toBe(false);
    });
  });
});
