import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Sizes } from "../../helpers";
import { Word } from "./helpers";

interface Coordinates {
  x: number;
  y: number;
}
interface Current extends Word, Coordinates {
  calcX: number;
  calcY: number;
}
interface PlatformTracker {
  current: Array<Current>;
  xSelection: Array<number>;
  levels: number;
  currentLevel: number;
}
interface PlatformsProps {
  words: Array<Word>;
  jumped: React.MutableRefObject<boolean>;
  ryanRef: SVGElement | undefined;
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

  // switch to useRef? 
  // no, use setState to trigger rerender when shifting display view / scrolling effect
  const [state, setState] = useState<PlatformTracker>({
    current: [],
    xSelection: [],
    levels: 0,
    currentLevel: 1,
  });
  const initialPlatform = useRef(true);

  // didMount
  useEffect(() => {
    for (let xValue = 0; xValue <= (displayWidth - (isMobile ? 25 : 50)); isMobile ? xValue += 25 : xValue += 50) {
      state.xSelection.push(xValue);
    }

    let yValue = (displayHeight) - 200;
    while (yValue >= 0) {
      state.levels += 1;
      yValue -= platformMargin;
    }
  }, []);

  // didUpdate
  useEffect(() => {
    if (words.length !== 0 && state.xSelection.length) {
      const latestWord = words[words.length - 1];

      const currentPlatform: Current = { ...latestWord, x: 0, y: 0, calcX: 0, calcY: 0 };
      const xIndex = Math.floor(Math.random() * (state.xSelection.length - 1));

      if (words.length === 1) {
        currentPlatform.x = state.xSelection[xIndex];
        currentPlatform.y = (displayHeight) - platformMargin;
      } else {
        currentPlatform.x = state.xSelection[xIndex];
        currentPlatform.y = state.current[state.current.length - 1].y - platformMargin;
      }

      state.current = [...state.current, currentPlatform];
    }
  }, [words]);

  // jumped
  if (jumped.current && state.current.length >= 2) {
    if (state.currentLevel === state.levels) {
      state.currentLevel = 0;
    }

    const ryanJumpAnimation = document.getElementById("ryanAnimation");
    const from: Current = initialPlatform.current
      ? { id: "0", word: "", definition: "", x: 0, y: 0, calcX: 0, calcY: 0 }
      : { ...state.current[0] };
    const to = initialPlatform.current ? state.current[0] : state.current[1];

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
      state.current.shift();
    }

    state.currentLevel += 1;
    jumped.current = false;
  }

  // @ts-ignore
  return state.current.map(platform => (
    <Platform id={platform.id} x={platform.x} y={platform.y}>
      <PlatformText>{platform.word}</PlatformText>
      <PlatformLine />
    </Platform>
  ))
}

export default Platforms;