import React from "react";
import { useHistory, useParams, } from "react-router-dom";
import styled from "styled-components";

import { Fonts, Game, Sizes, fadeIn } from "../../helpers";
import * as Common from "../common";
import { Score } from "./Score";

interface GameoverProps {
  score: Score;
}
interface Params {
  type: Game;
}

const Header = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 95vw;
`;
const Logo = styled(Common.Logo)`
  align-self: flex-start;
`;
const MenuBtn = styled(Common.MenuBtn)`
  display: block;
  position: absolute;
  right: 1vw;
  top: calc(50% - 50px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: ${Fonts.playfair};
`;
const Box = styled.div`
  border: 1px solid black;
  width: calc(250px + (500 - 250) * ((100vw - 300px) / (1440 - 300)));
  padding: 2rem;
  margin-bottom: 2rem;
  box-sizing: border-box;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
const SecondaryBox = styled(Box)`
  animation: ${fadeIn} 2s ease;
`;
const Title = styled.h1`
  margin-top: 0;
`;
const Button = styled.button`
  border: none;
  background-color: black;
  color: white;
  padding: 1rem 3rem;
  font-family: ${Fonts.nanum};
  font-size: ${Sizes.variable.font.medium};

  &:focus, &:hover {
    background-color: transparent;
    color: black;
    border: 1px solid white;
    transition: all 150ms ease-out;
  }
`;
const ButtonHeader = styled.h3`
  margin-top: 0;
  font-size: ${Sizes.variable.font.small};
`;
const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ScoreText = styled.h2`
  display: inline-block;
  margin-right: 8vmin;
  margin-top: 0;
  margin-bottom: 0;
  font-size: ${Sizes.variable.font.medium};
`;


function Gameover(props: GameoverProps) {
  const { score } = props;
  const { type } = useParams() as Params;
  const history = useHistory();
  const prevGameScore = score.get();
  score.reset();

  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <MenuBtn />

      <Box>
        <Title>Game Over</Title>
        <ScoreText>Your score</ScoreText>
        <span>{prevGameScore}</span>
      </Box>

      <SecondaryBox>
        <Centered>
          <ButtonHeader>Try Again</ButtonHeader>
          <Button
            id="tryAgain"
            onClick={() => {
              history.push(`/game/${type}`);
              history.go(0);
            }}>
            다시 해봐
            </Button>
        </Centered>
      </SecondaryBox>
    </Container>
  );
}

export default Gameover;