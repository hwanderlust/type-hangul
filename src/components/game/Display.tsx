import React from "react";
import styled from "styled-components";

import { Game } from "../../helpers";

import cloud1Png from "../../images/cloud1.png";
import cloud2Png from "../../images/cloud2.png";
import cloud3Png from "../../images/cloud3.png";
import groundPng from "../../images/ground.png";

// const ryansWidthToHeightRatio = 1.8;

interface RyanProps {
  position: "left" | "center";
}

const Container = styled.div`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin-bottom: 1vmin;
  width: 75vw;
  height: 50vh;
  position: relative;
  overflow: hidden;
`;
const leftCalc = "calc(10px + (50 - 10) * ((100vw - 300px) / (1440 - 300)))";
const centerCalc = "calc(50% - (25px + (100 - 50) * ((100vw - 300px) / (1440 - 300))))";
const regHeight = "calc(90px + (180 - 90) * ((100vw - 300px) / (1440 - 300)))";
const jumpHeight = "calc(90px + (100 - 90) * ((100vw - 300px) / (1440 - 300)))";
const Ryan = styled.svg<RyanProps>`
  position: absolute;
  top: ${props => props.position === "left" ? `calc(100% - (100px + ${regHeight}))` : `calc(100% - (1vh + ${jumpHeight}))`};
  left: ${props => props.position === "left" ? leftCalc : centerCalc};
  height: ${props => props.position === "left" ? regHeight : jumpHeight};
  width: calc(50px + (100 - 50) * ((100vw - 300px) / (1440 - 300)));
`;
const Cloud = styled.img`
  opacity: 0.7;
`;
const Cloud1 = styled(Cloud)`
  position: absolute;
  top: 2vh;
  left: 5vw;
`;
const Cloud2 = styled(Cloud)`
  position: absolute;
  top: 10vh;
  left: 35vw;
`;
const Cloud3 = styled(Cloud)`
  position: absolute;
  top: 4vh;
  left: 60vw;
`;
const Ground = styled.img`
  position: absolute;
  bottom: 2vh;
  width: 100%;
`;

interface DisplayProps {
  game: Game;
  className?: string;
  objects: Array<JSX.Element>;
}

function Display(props: DisplayProps) {
  const { className, objects } = props;
  const game = props.game.toLowerCase();

  return (
    <Container className={className}>

      <Cloud1 src={cloud1Png} />
      <Cloud2 src={cloud2Png} />
      <Cloud3 src={cloud3Png} />
      <Ground src={groundPng} />

      <Ryan
        id="ryan"
        position={game === "run" ? "left" : "center"}
        width="100"
        height="185"
        viewBox="0 0 100 185"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <animateTransform
          id="ryanAnimation"
          attributeName="transform"
          attributeType="XML"
          type="translate"
          dur="500ms"
          fill="freeze" />
        <path d="M84 86H16C16 86 2.50001 116 0.500014 122.5C-1.49999 129 6.50012 132 9.00001 126.5C11.4999 121 16 114 19.5 107C23 100 19.5 143 19.5 152C19.5 161 39.5 162 40.5 152C40.5 147 60 147 60 152C61 161.5 80 161 82 152C84 143 82 112.5 82 107C82 101.5 86.5 122 90.5 126.5C94.5 131 99.5 127.5 99.5 122.5C99.5 117.5 84 86 84 86Z" fill="#E28F2C" />
        <path id="legRight" d="M82.1666 178.056C83.6665 168.556 82.1666 156.111 82.1666 151.556C82.1666 147 61 147.5 60.6666 151.556C60.3332 155.611 59.1665 171.056 60.6666 178.056C62.1667 185.056 80.6667 187.556 82.1666 178.056Z" fill="#E28F2C" />
        <path id="legLeft" d="M19.6666 178.056C18.1667 168.556 19.6666 151.556 19.6666 151.556C19.6666 151.556 41.1666 148.056 41.1666 151.556C41.1666 155.056 42.6667 171.056 41.1666 178.056C39.6665 185.056 21.1666 187.556 19.6666 178.056Z" fill="#E28F2C" />
        <circle cx="19" cy="10" r="9.5" fill="#E28F2C" stroke="#A56820" />
        <circle cx="83" cy="10" r="9.5" fill="#E28F2C" stroke="#A56820" />
        <circle cx="50" cy="50" r="49.5" fill="#E28F2C" stroke="#A56820" />
        <circle cx="32" cy="38" r="5" fill="black" />
        <circle cx="66" cy="38" r="5" fill="black" />
        <path d="M41 70.5C44.4952 70.5 47.5914 68.7923 49.5 66.1657C51.4086 68.7923 54.5048 70.5 58 70.5C63.799 70.5 68.5 65.799 68.5 60C68.5 54.201 63.799 49.5 58 49.5C54.5048 49.5 51.4086 51.2077 49.5 53.8343C47.5914 51.2077 44.4952 49.5 41 49.5C35.201 49.5 30.5 54.201 30.5 60C30.5 65.799 35.201 70.5 41 70.5Z" fill="white" stroke="black" />
        <path d="M54.7051 50C52.7049 55 50.7053 55 49.7051 55C48.7049 55 47.2049 55 44.7051 50C42.2053 45 46.9437 45 49.7051 45C52.4665 45 56.7053 45 54.7051 50Z" fill="black" />
        <rect x="24.958" y="27.3939" width="15" height="2" rx="1" transform="rotate(-3 24.958 27.3939)" fill="black" />
        <rect x="59.1047" y="27" width="15" height="2" rx="1" transform="rotate(3 59.1047 27)" fill="black" />
        <path fillRule="evenodd" clipRule="evenodd" d="M37.998 105H38L44.3084 111.25L50.5 105.116L56.6916 111.25L62.5606 105.435C67.0982 109.102 70 114.712 70 121C70 132.046 61.0457 141 50 141C38.9543 141 30 132.046 30 121C30 114.458 33.1414 108.649 37.998 105Z" fill="white" />
      </Ryan>

      {objects}

    </Container >
  );
}

export default Display;