import React, { useState } from 'react';
import styled from 'styled-components';

import { fadeIn } from "../../helpers";
import { NextProps, Title, typewriteByLetter } from "./helpers";

const titleText = "게임 3개 있어요";
const titleDuration = titleText.length * 100;
const gameOptionTwoDelay = titleDuration + 750;
const gameOptionThreeDelay = titleDuration + (750 * 2);

const Main = styled.main``;
const Container = styled.div`
  display: flex;
  align-items: flex-end;
  opacity: 0;
  animation: ${fadeIn} 750ms ease-in;
  animation-delay: ${titleDuration}ms;
  animation-fill-mode: forwards;
`;
const ContainerTwo = styled(Container)`
  animation-delay: ${gameOptionTwoDelay}ms;
`;
const ContainerThree = styled(Container)`
  animation-delay: ${gameOptionThreeDelay}ms;
`;
const GameOption = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 400;
  margin: 0;
  color: #FFF;
`;
const GameDesc = styled.p`
  font-size: 16px;
  margin-top: 0;
  margin-left: 16px;
`;

// TODO: skip altogether? or add a skip button or add a next button and remove timer
function LandingTwo(props: NextProps) {
  const [title, setTitle] = useState("");
  typewriteByLetter(titleText, [title, setTitle]);

  setTimeout(() => {
    props.onFinish(true);
  }, titleDuration + gameOptionTwoDelay + gameOptionThreeDelay);

  return (
    <Main>
      <Title>{title}</Title>

      <Container>
        <GameOption>Run</GameOption>
        <GameDesc>Type the given words to help your character clear obstacles</GameDesc>
      </Container>

      <ContainerTwo>
        <GameOption>Pop</GameOption>
        <GameDesc>Type the floating words to avoid the bubbles from hitting the ground</GameDesc>
      </ContainerTwo>

      <ContainerThree>
        <GameOption>Jump</GameOption>
        <GameDesc>Type the words on the closest platform to escape the burning fire</GameDesc>
      </ContainerThree>
    </Main>
  );
}

export default LandingTwo;