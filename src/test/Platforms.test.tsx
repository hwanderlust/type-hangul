import 'jest-styled-components';
import renderer from 'react-test-renderer';

import Platforms from "../components/game/Platforms";

const words = [
  { id: "1", word: "배고프다", definition: "to be hungry", },
  { id: "2", word: "심심하다", definition: "to be bored", },
  { id: "3", word: "놀고 싶다", definition: "want to play", },
];

describe("Platforms", () => {

  describe("renders properly", () => {
    // will likely almost always fail, but if the only difference is the x then all is good and expected
    it("with words", () => {
      const manager = Platforms();
      words.forEach(manager.render);

      const tree = renderer
        // @ts-ignore
        .create(manager.renderAll())
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("inits properly", () => {
    const manager = Platforms();

    it("matches initialized values", () => {
      expect(manager.Test.getState()).toEqual({
        platforms: [],
        xSelection: expect.anything(),
        levels: expect.anything(),
        currentLevel: 0,
        initialPlatform: true,
      });
    });

    it("inits with a collection of x values to use for rendering platforms", () => {
      expect(manager.Test.getState()).toMatchObject({
        xSelection: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700],
        levels: 2,
      });
    });
  });

  describe("render()", () => {
    it("appends the word along with its corresponding coordinates of where to render", () => { });
  });

  describe("jump()", () => {
    it("doesn't crash if there's only 1 or no rendered platforms", () => { });
    it("adjusts 'initialPlatform' after jumping for the first time (after the first time invoking)", () => { });
    it("removes first platform from state", () => { });
  });

  describe("scroll()", () => {
    it("platforms' y coordinates have been increased by (# of levels * setMargin)", () => { });
    it("currentLevel is reset back to 0", () => { });
    it("clouds' startCycle is set to TRUE upon 5 scrolls", () => { });
  });

  describe("renderAll()", () => {
    it("returns an array of elements", () => { });
  });

  describe("reset()", () => {
    it("clears 'currentLevel'", () => { });
    it("clears 'platforms'", () => { });
  });

  describe("setRefs()", () => {
    it("sets 'ryan'", () => { });
    it("sets 'ground'", () => { });
    it("sets 'clouds'", () => { });
  });

});