import React from "react";
import styled from "styled-components";

import { Sizes } from "../../helpers";
import { Coordinates, Word } from "./helpers";

interface PlatformsState {
  platforms: Array<PlatformProps>;
  xSelection: Array<number>;
  levels: number;
  currentLevel: number;
  initialPlatform: boolean;
}
interface PlatformProps extends Word, Coordinates {
  // used to transition / animate between platforms as opposed to x and y used for actual render coordinates
  calcX: number;
  calcY: number;
}
interface Test {
  getState: () => PlatformsState;
  getRyan: () => SVGElement | undefined;
}
interface PlatformsManager {
  render: (word: Word) => void;
  jump: (word: Word) => void;
  scroll: () => void;
  renderAll: () => Array<JSX.Element>;
  reset: () => void;
  setRefs: (ryan: SVGElement | undefined) => void;
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

// This one is faster with each jump but the scroll lags a tad bit
// whereas the other lags with each jump but the scrolling is faster
function Platforms2(): PlatformsManager {

  const state: PlatformsState = {
    platforms: [],
    xSelection: [],
    levels: 0,
    currentLevel: 0,
    initialPlatform: true,
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
      platform.y = state.platforms.length === 0 ? displayHeight - platformMargin : state.platforms[state.platforms.length - 1].y - platformMargin;

      state.platforms.push(platform);
    },
    jump: function (word) {
      if (state.platforms.length >= 2) {
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
        } else {
          state.platforms.shift();
        }

        state.currentLevel += 1;
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

        state.currentLevel = 0;

        if (clouds.cycle % 5 === 0) {
          clouds.startCycle = true;
        }
        if (clouds && clouds.startCycle) {
          if (clouds[clouds.cycle]) {
            clouds[clouds.cycle]!.style.top = `-100vh`;
            clouds.cycle = (clouds.cycle === 6 ? 1 : clouds.cycle + 1) as Cycle;
          }
        }
      }
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
    Test: {
      getState: function () {
        return { ...state };
      },
      getRyan: function () {
        return ryanRef;
      }
    }
  }
}

export default Platforms2;