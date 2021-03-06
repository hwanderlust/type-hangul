import React from "react";
import styled from "styled-components";

import { Sizes } from "../../helpers";
import { Coordinates, Word } from "./helpers";

export interface PlatformsState {
  platforms: Array<PlatformProps>;
  queued: Array<PlatformProps>;
  xSelection: Array<number>;
  levels: number;
  currentLevel: number;
  initialPlatform: boolean;
  scrollCount: number;
}
interface PlatformProps extends Word, Coordinates {
  // used to transition / animate between platforms as opposed to x and y used for actual render coordinates
  calcX: number;
  calcY: number;
}
interface Test {
  getState: () => PlatformsState;
  getRyan: () => SVGElement | undefined;
  getClouds: () => Clouds;
  getGround: () => DomEl;
}
export interface PlatformsManager {
  render: (word: Word) => void;
  jump: (word: Word) => void;
  scroll: () => boolean;
  renderAll: () => Array<JSX.Element>;
  reset: () => void;
  setRefs: (ryan: SVGElement | undefined) => void;
  getActivePlatform: () => PlatformProps | null;
  getScrollHeight: () => number;
  Test: Test;
}
type DomEl = HTMLElement | null;
type Cycle = 1 | 2 | 3 | 4 | 5 | 6;
interface Clouds {
  1: DomEl;
  2: DomEl;
  3: DomEl;
  4: DomEl;
  5: DomEl;
  6: DomEl;
  cycle: Cycle;
  startCycle: boolean;
}

const Platform = styled.div<Coordinates>`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;

  & div {
    margin: 0 auto;
  }

  & p {
    margin: 0 auto 0.5rem auto 0;
  }
`;
const PlatformLine = styled.div`
  position: relative;  
  width: calc(25px + (50 - 25) * ((100vw - 300px) / (1440 - 300)));
  height: 2px;
  background-color: black;
`;
const PlatformText = styled.p`
  position: relative;
  font-size: ${Sizes.variable.font.small}px;
`;

const isMobile = window.innerWidth < 720;
const platformMargin = 150;
const displayWidth = window.innerWidth * 0.75;
const displayHeight = window.innerHeight * 0.5;
const pTagDefaultMarginBottom = 16;

function Platforms2(): PlatformsManager {

  const state: PlatformsState = {
    platforms: [],
    queued: [],
    xSelection: [],
    levels: 0,
    currentLevel: 0,
    initialPlatform: true,
    scrollCount: 0,
  };

  let ryanRef: SVGElement | undefined;
  let ground: DomEl = null;
  const clouds: Clouds = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    cycle: 1,
    startCycle: false
  };

  for (let xValue = 0; xValue <= (displayWidth - (isMobile ? 25 : 50)); isMobile ? xValue += 25 : xValue += 50) {
    state.xSelection.push(xValue);
  }

  let yValue = displayHeight - platformMargin;
  while (yValue >= 0) {
    state.levels += 1;
    yValue -= platformMargin;
  }

  return {
    render: function (word) {
      const platform: PlatformProps = { ...word, x: 0, y: 0, calcX: 0, calcY: 0 };
      const xIndex = Math.floor(Math.random() * (state.xSelection.length - 1));

      platform.x = state.xSelection[xIndex];
      if (state.platforms.length === 0) {
        platform.y = displayHeight - platformMargin;
      } else if (state.platforms.length === 9 && state.queued.length) {
        platform.y = state.queued[state.queued.length - 1].y - platformMargin;
      } else {
        platform.y = state.platforms[state.platforms.length - 1].y - platformMargin;
      }

      if (state.platforms.length === 9) {
        state.queued.push(platform);
      } else {
        state.platforms.push(platform);
      }
    },
    jump: function (word) {
      if (
        (state.initialPlatform && state.platforms.length >= 1)
        || state.platforms.length >= 2
      ) {
        const ryanJumpAnimation = document.getElementById("ryanAnimation");
        const from: PlatformProps = state.initialPlatform
          ? { ...word, x: 0, y: 0, calcX: 0, calcY: 0 }
          : { ...state.platforms[0] };
        const to = state.initialPlatform ? state.platforms[0] : state.platforms[1];

        if (from !== null && to !== null && ryanRef) {
          const initStyles = window.getComputedStyle(ryanRef);
          const top = parseInt(initStyles.top, 10);
          const left = parseInt(initStyles.left, 10);
          const width = parseInt(initStyles.width, 10);

          to.calcX = Math.ceil(to.x - left - (width / 3));
          to.calcY = Math.ceil(from.y === 0
            ? top - to.y - platformMargin + pTagDefaultMarginBottom
            : from.calcY - platformMargin
          );

          ryanJumpAnimation?.setAttribute("values", `${from.calcX} ${from.calcY}; ${to.calcX} ${to.calcY - 100}; ${to.calcX} ${to.calcY}`);
        }

        // @ts-ignore
        ryanJumpAnimation?.beginElement();

        if (state.initialPlatform) {
          state.initialPlatform = false;
          state.currentLevel += 1;
          return
        }

        if (state.platforms.length <= 9 && !state.queued.length) {
          state.platforms.shift();
          state.currentLevel += 1;
          return;
        }

        if (state.platforms.length === 9 && state.queued.length) {
          state.platforms.shift();
          const queued = state.queued.shift()!;
          state.platforms.push(queued);
          state.currentLevel += 1;
        }
      }
    },
    scroll: function () {
      if (state.currentLevel >= state.levels) {
        if (ground && ground.style.display !== "none") {
          ground.style.display = "none";
        }

        const scrollAmount = platformMargin * state.levels;

        const ryanJumpAnimation = document.getElementById("ryanAnimation");
        const head = state.platforms[0];
        ryanJumpAnimation?.setAttribute("values", `${head.calcX} ${platformMargin}; ${head.calcX} ${0}; ${head.calcX} ${head.calcY + (scrollAmount)}`);
        // @ts-ignore
        ryanJumpAnimation?.beginElement();

        if (clouds["1"]) {
          clouds["1"].style.top = `${parseInt(window.getComputedStyle(clouds["1"]).top, 10) + scrollAmount}px`;
        }
        if (clouds["2"]) {
          clouds["2"].style.top = `${parseInt(window.getComputedStyle(clouds["2"]).top, 10) + scrollAmount}px`;
        }
        if (clouds["3"]) {
          clouds["3"].style.top = `${parseInt(window.getComputedStyle(clouds["3"]).top, 10) + scrollAmount}px`;
        }
        if (clouds["4"]) {
          clouds["4"].style.top = `${parseInt(window.getComputedStyle(clouds["4"]).top, 10) + scrollAmount}px`;
        }
        if (clouds["5"]) {
          clouds["5"].style.top = `${parseInt(window.getComputedStyle(clouds["5"]).top, 10) + scrollAmount}px`;
        }
        if (clouds["6"]) {
          clouds["6"].style.top = `${parseInt(window.getComputedStyle(clouds["6"]).top, 10) + scrollAmount}px`;
        }

        state.platforms = state.platforms.map(c => {
          c.y += scrollAmount;
          c.calcY += scrollAmount;
          return c;
        });
        if (state.queued.length) {
          state.queued = state.queued.map(c => {
            c.y += scrollAmount;
            c.calcY += scrollAmount;
            return c;
          });
        }

        state.currentLevel = 0;
        state.scrollCount += 1;

        if (state.scrollCount % 5 === 0) {
          clouds.startCycle = true;
        }
        if (clouds && clouds.startCycle) {
          if (clouds[clouds.cycle]) {
            clouds[clouds.cycle]!.style.top = `-100vh`;
            clouds.cycle = (clouds.cycle === 6 ? 1 : clouds.cycle + 1) as Cycle;
          }
        }

        return true;
      }

      return false;
    },
    renderAll: function () {
      return state.platforms.map(platform => (
        <Platform id={platform.id} key={platform.id} x={platform.x} y={platform.y}>
          <PlatformText>{platform.word}</PlatformText>
          <PlatformLine />
        </Platform>
      ));
    },
    reset: function () {
      state.currentLevel = 0;
      state.platforms = [];
      state.queued = [];
      state.initialPlatform = true;
      state.scrollCount = 0;
    },
    setRefs: function (ryan) {
      ryanRef = ryan;
      ground = document.getElementById("ground");
      clouds[1] = document.getElementById("cloud1");
      clouds[2] = document.getElementById("cloud2");
      clouds[3] = document.getElementById("cloud3");
      clouds[4] = document.getElementById("cloud4");
      clouds[5] = document.getElementById("cloud5");
      clouds[6] = document.getElementById("cloud6");
    },
    getActivePlatform: function () {
      if (!state.platforms.length) return null;
      return state.platforms[0];
    },
    getScrollHeight: function () {
      return state.scrollCount * platformMargin * state.levels;
    },
    Test: {
      getState: function () {
        return { ...state };
      },
      getRyan: function () {
        return ryanRef;
      },
      getClouds: function () {
        return { ...clouds };
      },
      getGround: function () {
        return ground;
      }
    }
  }
}

export default Platforms2;