import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { Fonts, Game, Sizes, } from "../../helpers";
import { Keyboard, MenuBtn } from "../common";
import Display from "./Display";
import { Word, WORDS } from "./helpers";

const noOp = () => { };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1vmin;
`;
const Header = styled.section`
  align-self: flex-start;
  margin-left: 5vmin;
`;
const MenuBtnFloating = styled(MenuBtn)`
  display: block;
  position: absolute;
  right: 1vw;
  top: calc(50% - 50px);

  @media only screen and (max-width: 720px) {
    display: none;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
`;
const Item = styled.li`
  font-size: ${Sizes.variable.font.medium};
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-family: ${Fonts.playfair};

  &:focus {
    text-decoration: underline;
    text-decoration-color: black;
    outline: none;
  }

  &:hover {
    color: white;
  }
`;

function isNotAGame(param: string): boolean {
  const type = param.toLowerCase();
  return type.localeCompare("run") !== 0
    && type.localeCompare("pop") !== 0
    && type.localeCompare("jump") !== 0;
}

// TODO move to App
function Page404({ type }: { type: string }) {
  return (
    <Main>
      <h1>Oops! "{type}" isn't a game we have. Please select from one of our games below.</h1>
      <List>
        <Item><StyledLink to="/game/run">Run</StyledLink></Item>
        <Item><StyledLink to="/game/pop">Pop</StyledLink></Item>
        <Item><StyledLink to="/game/jump">Jump</StyledLink></Item>
      </List>
    </Main>
  );
}

interface Params {
  type: Game;
}

function Controller() {
  const params: Params = useParams();
  const [words, setWords] = useState([WORDS[0]]);
  const game = params.type.toLowerCase();
  const [prevGame, setGame] = useState(game);
  const [isGameOver, toggleGameOver] = useState(false);

  // TODO remove when implement dynamic word generation / collection
  useEffect(() => {
    const interval = setInterval(() => {
      setWords(prevWords => [...prevWords, WORDS[Math.floor(Math.random() * WORDS.length)]]);
    }, 1000);

    if (isGameOver) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [game, isGameOver]);

  if (isNotAGame(params.type)) {
    return <Page404 type={params.type} />;
  }

  if (prevGame.localeCompare(game) !== 0) {
    setGame(game);
    setWords([WORDS[0]]);
    // ensure the interval resets
  }

  // TODO: set conditions
  if (false) {
    toggleGameOver(true);
  }

  switch (game) {
    case "run": {
      // words
      // shift left / running pace
      break;
    }
    case "pop": {
      // words
      // render bubble pace
      break;
    }
    case "jump": {
      // words
      // raising fire pace
      break;
    }
  }

  return (
    <Container>
      <Header>
        <h1>{params.type}</h1>
        <p>Game Description</p>
      </Header>
      <Display game={params.type} words={words as Array<Word>} />
      <Keyboard onKeyPress={noOp} />

      <MenuBtnFloating />
    </Container>
  );
}

export default Controller;