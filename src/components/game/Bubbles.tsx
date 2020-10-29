import React from "react";
import styled, { keyframes } from "styled-components";

import { Sizes } from "../../helpers";
import bubblePng from "../../images/bubble.png";
import { Coordinates, Word } from "./helpers";

export interface BubblesState {
  available: Array<number>;
  recent: [number?, number?, number?];
}
interface Test {
  getState: () => BubblesState;
}
export interface BubblesManager {
  render: (word: Word) => JSX.Element;
  pop: (word: Word) => void;
  setGameover: (callback: () => void) => void;
  reset: () => void;
  Test: Test;
}

function fallDown(props: Coordinates) {
  const waver = window.innerWidth < 720 ? [10, 20, 30] : [30, 40, 50];
  const side = ["left", "right"][Math.round(Math.random())];
  const operation = ["+", "-"][Math.round(Math.random())];
  const waverAmt = waver[Math.floor(Math.random() * (waver.length - 1))];

  return keyframes`
  from { top: ${window.innerWidth < 720 ? -49 : -99}px; }
  to { 
    top: calc(50vh - ${window.innerWidth < 720 ? 50 : 100}px); 
    ${side}: calc(${props.x}px ${operation} ${waverAmt}px);
  }
`;
}

const Bubble = styled.div<Coordinates>`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  background-image: url(${bubblePng});
  background-size: cover;
  width: calc(60px + (100 - 60) * ((100vw - 300px) / (1440 - 300)));
  height: calc(60px + (100 - 60) * ((100vw - 300px) / (1440 - 300)));
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: ${fallDown};
  animation-duration: 12000ms;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
`;
const BubbleText = styled.span`
  font-size: ${Sizes.variable.font.small};
`;

function render(vocab: Word, xValue: number, toggleGameover: () => void): JSX.Element {
  return (
    <Bubble
      id={vocab.id} key={vocab.id}
      x={xValue}
      y={window.innerWidth < 720 ? -49 : -99}
      onAnimationEnd={toggleGameover}
    >
      <BubbleText>{vocab.word}</BubbleText>
    </Bubble>
  );
}

function Bubbles(): BubblesManager {
  const isMobile = window.innerWidth < 720;
  const bubbles: BubblesState = { available: [], recent: [], };
  let gameover: () => void;

  for (let xValue = 0; xValue <= (window.innerWidth * 0.75 - (isMobile ? 50 : 100)); isMobile ? xValue += 50 : xValue += 100) {
    bubbles.available.push(xValue);
  }

  return {
    render: function (word): JSX.Element {
      const index = Math.floor(Math.random() * (bubbles.available.length - 1));
      const updatedAvailable = bubbles.available.slice();
      const x = updatedAvailable.splice(index, 1)[0];
      bubbles.available = updatedAvailable;

      const updatedRecent = bubbles.recent.slice() as [number?, number?, number?];
      updatedRecent.push(x);
      bubbles.recent = updatedRecent;

      if (bubbles.recent.length > 3) {
        const x = bubbles.recent.shift();
        if (x) {
          bubbles.available.push(x);
        }
      }

      if (!gameover) {
        console.error("Gameover callback was never set.");
        return <></>;
      }

      return render(word, x, gameover);
    },
    pop: function (word: Word): void {
      const element = document.getElementById(word.id);
      if (element) {
        element.style.transform = "scale(0)";
        element.style.transition = "transform 150ms ease";
      }
    },
    setGameover: function (callback) {
      gameover = callback;
    },
    reset: function (): void {
      if (bubbles.recent.length) {
        bubbles.recent.forEach(_ => {
          const removedX = bubbles.recent.shift()!;
          bubbles.available.push(removedX);
        });
      }
    },
    Test: {
      getState: function () {
        return { ...bubbles };
      },
    }
  }
}

export default Bubbles;