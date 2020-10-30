import 'jest-styled-components';
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import renderer from 'react-test-renderer';

import Platforms, { PlatformsManager, PlatformsState } from "../components/game/Platforms";

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
        queued: [],
        xSelection: expect.anything(),
        levels: expect.anything(),
        currentLevel: 0,
        initialPlatform: true,
        scrollCount: 0,
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
    const manager = Platforms();

    afterEach(() => {
      manager.reset();
    });

    it("appends the word along with its corresponding coordinates of where to render", () => {
      manager.render(words[0]);
      const state = manager.Test.getState();
      expect(state.platforms[0]).toMatchObject({
        ...words[0],
        x: expect.anything(),
        y: 234,
        calcX: 0,
        calcY: 0,
      });
    });

    it("queues up the next platform if there are already 9 rendered platforms", () => {
      words.forEach(manager.render);
      words.forEach(manager.render);
      words.forEach(manager.render);
      manager.render(words[0]);
      expect(manager.Test.getState().platforms.length).toBe(9);
      expect(manager.Test.getState().queued.length).toBe(1);
      expect(manager.Test.getState().queued[0].id).toBe(words[0].id);
    });

    it("references the last queued platform to calc the y when >9 rendered and we have queued platforms", () => {
      words.forEach(manager.render);
      words.forEach(manager.render);
      words.forEach(manager.render);
      manager.render(words[0]);
      expect(manager.Test.getState().queued[0].y).toBe(-1116);
      manager.render(words[1]);
      expect(manager.Test.getState().queued[1].y).toBe(-1116 - 150);
    });
  });

  describe("jump()", () => {
    const manager = Platforms();

    afterEach(() => {
      manager.reset();
    });

    it("doesn't crash if there are no rendered platforms", () => {
      manager.jump(words[0]);
    });

    it("doesn't crash if there's only 1 rendered platforms", () => {
      manager.render(words[0]);
      manager.jump(words[0]);
    });

    it("doesn't crash if there are 2 rendered platforms", () => {
      manager.render(words[0]);
      manager.render(words[1]);
      manager.jump(words[0]);
    });

    it("adjusts 'initialPlatform' after jumping for the first time (after the first time invoking)", () => {
      const before = manager.Test.getState();
      manager.render(words[0]);
      manager.jump(words[0]);
      const after = manager.Test.getState();

      expect(before.initialPlatform).toBe(true);
      expect(after.initialPlatform).toBe(false);
    });

    it("doesn't remove the first platform from state just after jumping", () => {
      manager.render(words[0]);
      const before = manager.Test.getState();
      manager.jump(words[0]);
      const after = manager.Test.getState();

      expect(before.platforms.length).toBe(1);
      expect(after.platforms.length).toBe(1);
    });

    it("removes first platform from state after jumping away from it", () => {
      manager.render(words[0]);
      const before = manager.Test.getState();
      manager.jump(words[0]);
      manager.render(words[1]);
      manager.jump(words[1]);
      const after = manager.Test.getState();

      expect(before.platforms.length).toBe(1);
      expect(after.platforms.length).toBe(1);
    });

    it("shifts a queued platform to be rendered if there are and if there are 9 rendered platforms", () => {
      words.forEach(manager.render);
      words.map(w => {
        w.id += 4;
        return w;
      }).forEach(manager.render);
      words.map(w => {
        w.id += 8;
        return w;
      }).forEach(manager.render);
      manager.render({
        ...words[0],
        id: "10",
      });
      manager.render({
        ...words[1],
        id: "11",
      });

      expect(manager.Test.getState().platforms.length).toBe(9);
      expect(manager.Test.getState().queued.length).toBe(2);

      manager.jump(words[0]);
      expect(manager.Test.getState().platforms.length).toBe(9);
      expect(manager.Test.getState().queued.length).toBe(2);

      manager.jump(words[1]);
      expect(manager.Test.getState().platforms.length).toBe(9);
      expect(manager.Test.getState().queued.length).toBe(1);
      expect(manager.Test.getState().platforms[8].id).toBe("10");
    });
  });

  describe("scroll()", () => {
    const setMargin = 150;
    const beforePlatforms = [84, -66, -216, -366, -516];
    let manager: PlatformsManager;
    let before: PlatformsState;

    beforeEach(() => {
      manager = Platforms();
      words.forEach(manager.render);
      words.forEach(manager.render);
      manager.jump(words[0]);
      manager.jump(words[1]);
      before = manager.Test.getState();
    });

    it("rendered platforms' y coordinates have been increased by (# of levels * setMargin)", () => {
      expect(before.platforms.map(platform => platform.y)).toEqual(beforePlatforms);

      const result = manager.scroll();
      const after = manager.Test.getState(); // 384, 234, 84, -66, -216

      expect(result).toBe(true);
      expect(after.platforms.map(platform => platform.y)).toEqual(beforePlatforms.map(y => y + (after.levels * setMargin)));
    });

    it("queued platforms' y coordinates have been increased by (# of levels * setMargin) if there are some", () => {
      words.forEach(manager.render);
      words.forEach(manager.render);
      const before = [-1266, -1416];

      expect(manager.Test.getState().queued.map(p => p.y)).toEqual(before);

      const result = manager.scroll();
      const after = manager.Test.getState(); // 384, 234, 84, -66, -216

      expect(result).toBe(true);
      expect(after.queued.map(platform => platform.y)).toEqual(before.map(y => y + (after.levels * setMargin)));
    });

    it("currentLevel is reset back to 0", () => {
      manager.scroll();
      const after = manager.Test.getState(); // 384, 234, 84, -66, -216
      expect(after.currentLevel).toBe(0);
    });

    it("tracks how many times we've scrolled", () => {
      expect(manager.Test.getState().scrollCount).toBe(0);
      manager.jump(words[0]);
      manager.jump(words[1]);
      manager.scroll();
      expect(manager.Test.getState().scrollCount).toBe(1);
    });

    it("clouds' startCycle is set to TRUE upon 5 scrolls", () => {
      const manager = Platforms();
      words.forEach(manager.render);
      words.forEach(manager.render);
      words.forEach(manager.render);
      words.forEach(manager.render);

      manager.jump(words[0]);
      manager.jump(words[1]);
      manager.scroll();
      expect(manager.Test.getState().scrollCount).toBe(1);

      manager.jump(words[2]);
      manager.jump(words[0]);
      manager.scroll();
      expect(manager.Test.getState().scrollCount).toBe(2);
      expect(manager.Test.getClouds().startCycle).toBe(false);

      manager.jump(words[1]);
      manager.jump(words[2]);
      manager.scroll();
      expect(manager.Test.getState().scrollCount).toBe(3);
      expect(manager.Test.getClouds().startCycle).toBe(false);

      manager.jump(words[0]);
      manager.jump(words[1]);
      manager.scroll();
      expect(manager.Test.getState().scrollCount).toBe(4);
      expect(manager.Test.getClouds().startCycle).toBe(false);

      manager.jump(words[2]);
      manager.jump(words[0]);
      manager.scroll();
      expect(manager.Test.getState().scrollCount).toBe(5);
      expect(manager.Test.getClouds().startCycle).toBe(true);
    });
  });

  describe("renderAll()", () => {
    it("returns an array of elements", () => {
      const manager = Platforms();
      words.forEach(manager.render);
      expect(manager.renderAll()).toHaveLength(3);
    });

    it("doesn't render any queued platforms", () => {
      const manager = Platforms();
      words.forEach(manager.render);
      words.forEach(manager.render);
      words.forEach(manager.render);
      words.forEach(manager.render);
      expect(manager.renderAll()).toHaveLength(9);
      expect(manager.Test.getState().queued.length).toBe(3);
    });
  });

  describe("reset()", () => {
    it("clears session state", () => {
      const manager = Platforms();
      words.forEach(manager.render);
      words.forEach(manager.render);
      words.forEach(manager.render);
      words.forEach(manager.render);
      words.forEach(manager.render);

      expect(manager.Test.getState().platforms.length).toBe(9);
      expect(manager.Test.getState().queued.length).toBe(6);

      manager.jump(words[0]);
      manager.jump(words[1]);
      manager.scroll();
      manager.jump(words[2]);

      expect(manager.Test.getState()).toMatchObject({
        currentLevel: 1,
        initialPlatform: false,
        scrollCount: 1,
      });
      expect(manager.Test.getState().platforms.length).toBe(9);
      expect(manager.Test.getState().queued.length).toBe(4);

      manager.reset();
      expect(manager.Test.getState()).toMatchObject({
        currentLevel: 0,
        platforms: [],
        queued: [],
        initialPlatform: true,
        scrollCount: 0,
      });
    });
  });

  describe("setRefs()", () => {
    let manager: PlatformsManager;
    let ryan: SVGElement;

    beforeEach(() => {
      manager = Platforms();
      const container = document.createElement("div");
      ryan = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      ryan.id = "ryan";
      const ground = document.createElement("div");
      ground.id = "ground";
      const cloud1 = document.createElement("div");
      cloud1.id = "cloud1";
      const cloud2 = document.createElement("div");
      cloud2.id = "cloud2";
      const cloud3 = document.createElement("div");
      cloud3.id = "cloud3";
      const cloud4 = document.createElement("div");
      cloud4.id = "cloud4";
      const cloud5 = document.createElement("div");
      cloud5.id = "cloud5";
      const cloud6 = document.createElement("div");
      cloud6.id = "cloud6";
      container.appendChild(ryan);
      container.appendChild(ground);
      container.appendChild(cloud1);
      container.appendChild(cloud2);
      container.appendChild(cloud3);
      container.appendChild(cloud4);
      container.appendChild(cloud5);
      container.appendChild(cloud6);
      ReactTestUtils.act(() => {
        document.body.appendChild(container);
      });
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("sets 'ryan'", () => {
      expect(manager.Test.getRyan()).toBe(undefined);
      manager.setRefs(ryan);
      expect(manager.Test.getRyan()).toBe(ryan);
    });

    it("sets 'ground'", () => {
      expect(manager.Test.getGround()).toBe(null);
      manager.setRefs(ryan);
      expect(manager.Test.getGround()).not.toBe(null);
    });

    it("sets 'clouds'", () => {
      expect(manager.Test.getClouds()["1"]).toBe(null);
      expect(manager.Test.getClouds()["2"]).toBe(null);
      expect(manager.Test.getClouds()["3"]).toBe(null);
      expect(manager.Test.getClouds()["4"]).toBe(null);
      expect(manager.Test.getClouds()["5"]).toBe(null);
      expect(manager.Test.getClouds()["6"]).toBe(null);

      manager.setRefs(ryan);

      expect(manager.Test.getClouds()["1"]).not.toBe(null);
      expect(manager.Test.getClouds()["2"]).not.toBe(null);
      expect(manager.Test.getClouds()["3"]).not.toBe(null);
      expect(manager.Test.getClouds()["4"]).not.toBe(null);
      expect(manager.Test.getClouds()["5"]).not.toBe(null);
      expect(manager.Test.getClouds()["6"]).not.toBe(null);
    });
  });

});