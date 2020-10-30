import React, { useState } from 'react';
import styled from 'styled-components';

import { Fonts, fadeIn } from "../../helpers";
import { NextProps, Title, typewriteByLetter } from "./helpers";

const titleText = "게임 2개 있어요";
const titleDuration = titleText.length * 100;
const gameOptionTwoDelay = titleDuration + 750;
const gameOptionThreeDelay = titleDuration + (750 * 2);

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
const GameOption = styled.h2`
  font-family: ${Fonts.playfair};
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

function LandingTwo(props: NextProps) {
  const [title, setTitle] = useState("");
  typewriteByLetter(titleText, [title, setTitle]);

  setTimeout(() => {
    props.onFinish();
  }, titleDuration + gameOptionTwoDelay + gameOptionThreeDelay);

  return (
    <main>
      <Title>{title}</Title>

      <Container>
        <GameOption>Pop</GameOption>
        <GameDesc>Type the floating words to avoid the bubbles from hitting the ground</GameDesc>
      </Container>

      <ContainerTwo>
        <GameOption>Jump</GameOption>
        <GameDesc>Type the words on the closest platform to escape the burning fire</GameDesc>
      </ContainerTwo>
    </main>
  );
}

export default LandingTwo;