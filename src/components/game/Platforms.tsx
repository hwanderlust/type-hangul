import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { Sizes } from "../../helpers";
import { Coordinates, Word } from "./helpers";

// used to transition / animate between platforms as opposed to x and y used for actual render coordinates
interface PlatformProps extends Word, Coordinates {
  calcX: number;
  calcY: number;
}
interface PlatformTracker {
  platforms: Array<PlatformProps>;
  xSelection: Array<number>;
  levels: number;
  currentLevel: number;
  scrollCount: number;
}
interface PlatformsProps {
  words: Array<Word>;
  jumped: React.MutableRefObject<boolean>;
  ryanRef: SVGElement | undefined;
}
type DomEl = HTMLElement | null;
interface Clouds {
  1: DomEl;
  2: DomEl;
  3: DomEl;
  4: DomEl;
  5: DomEl;
  6: DomEl;
  cycle: 1 | 2 | 3 | 4 | 5 | 6;
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

function Platforms(props: PlatformsProps): JSX.Element {
  const { words, jumped, ryanRef } = props;

  const state = useRef<PlatformTracker>({
    platforms: [],
    xSelection: [],
    levels: 0,
    currentLevel: 0,
    scrollCount: 0,
  });
  const initialPlatform = useRef(true);
  const clouds = useRef<Clouds>();
  const ground = useRef<DomEl>();

  // didMount
  useEffect(() => {
    for (let xValue = 0; xValue <= (displayWidth - (isMobile ? 25 : 50)); isMobile ? xValue += 25 : xValue += 50) {
      state.current.xSelection.push(xValue);
    }

    let yValue = displayHeight - platformMargin;
    while (yValue >= 0) {
      state.current.levels += 1;
      yValue -= platformMargin;
    }

    clouds.current = {
      1: document.getElementById("cloud1"),
      2: document.getElementById("cloud2"),
      3: document.getElementById("cloud3"),
      4: document.getElementById("cloud4"),
      5: document.getElementById("cloud5"),
      6: document.getElementById("cloud6"),
      cycle: 1,
      startCycle: false,
    };
    ground.current = document.getElementById("ground");
  }, []);

  // didUpdate
  useEffect(() => {
    if (words.length !== 0 && state.current.xSelection.length) {
      const latestWord = words[words.length - 1];

      const newPlatform: PlatformProps = { ...latestWord, x: 0, y: 0, calcX: 0, calcY: 0 };
      const xIndex = Math.floor(Math.random() * (state.current.xSelection.length - 1));

      if (words.length === 1) {
        newPlatform.x = state.current.xSelection[xIndex];
        newPlatform.y = (displayHeight) - platformMargin;
      } else {
        newPlatform.x = state.current.xSelection[xIndex];
        newPlatform.y = state.current.platforms[state.current.platforms.length - 1].y - platformMargin;
      }

      state.current.platforms = [...state.current.platforms, newPlatform];
    }
  }, [words]);

  // jumped
  if (jumped.current && state.current.platforms.length >= 2) {
    const ryanJumpAnimation = document.getElementById("ryanAnimation");
    const from: PlatformProps = initialPlatform.current
      ? { id: "0", word: "", definition: "", x: 0, y: 0, calcX: 0, calcY: 0 }
      : { ...state.current.platforms[0] };
    const to = initialPlatform.current ? state.current.platforms[0] : state.current.platforms[1];

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

    if (initialPlatform.current) {
      initialPlatform.current = false;
    } else {
      state.current.platforms.shift();
    }

    state.current.currentLevel += 1;
    jumped.current = false;

    // scroll
    if (state.current.currentLevel === state.current.levels) {

      if (ground.current && ground.current.style.display !== "none") {
        ground.current.style.display = "none";
      }

      const scrollAmount = platformMargin * state.current.levels;

      if (clouds.current) {
        if (clouds.current["1"]) {
          clouds.current["1"].style.top = `${parseInt(window.getComputedStyle(clouds.current["1"]).top, 10) + scrollAmount}px`;
        }
        if (clouds.current["2"]) {
          clouds.current["2"].style.top = `${parseInt(window.getComputedStyle(clouds.current["2"]).top, 10) + scrollAmount}px`;
        }
        if (clouds.current["3"]) {
          clouds.current["3"].style.top = `${parseInt(window.getComputedStyle(clouds.current["3"]).top, 10) + scrollAmount}px`;
        }
        if (clouds.current["4"]) {
          clouds.current["4"].style.top = `${parseInt(window.getComputedStyle(clouds.current["4"]).top, 10) + scrollAmount}px`;
        }
        if (clouds.current["5"]) {
          clouds.current["5"].style.top = `${parseInt(window.getComputedStyle(clouds.current["5"]).top, 10) + scrollAmount}px`;
        }
        if (clouds.current["6"]) {
          clouds.current["6"].style.top = `${parseInt(window.getComputedStyle(clouds.current["6"]).top, 10) + scrollAmount}px`;
        }
      }

      const ryanJumpAnimation = document.getElementById("ryanAnimation");
      const head = state.current.platforms[0];
      ryanJumpAnimation?.setAttribute("values", `${head.calcX} ${platformMargin}; ${head.calcX} ${0}; ${head.calcX} ${head.calcY + (scrollAmount)}`);
      // @ts-ignore
      ryanJumpAnimation?.beginElement();

      state.current.platforms = state.current.platforms.map(c => {
        c.y += scrollAmount;
        c.calcY += scrollAmount;
        return c;
      });

      state.current.currentLevel = 0;
      state.current.scrollCount += 1;

      if (clouds.current && clouds.current.cycle % 5 === 0) {
        clouds.current.startCycle = true;
      }
      if (clouds.current && clouds.current.startCycle) {
        if (clouds.current[clouds.current.cycle]) {
          clouds.current[clouds.current.cycle]!.style.top = `-100vh`;
          clouds.current.cycle += 1;

          if (clouds.current.cycle === 7) {
            clouds.current.cycle = 1;
          }
        }
      }
    }
  }

  // @ts-ignore
  return state.current.platforms.map(platform => (
    <Platform id={platform.id} key={platform.id} x={platform.x} y={platform.y}>
      <PlatformText>{platform.word}</PlatformText>
      <PlatformLine />
    </Platform>
  ))
}

export default Platforms;