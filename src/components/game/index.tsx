import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Game, } from "../../helpers";
import { Keyboard, MenuBtn, Page404 } from "../common";
import Display from "./Display";
import manageGameObjects from "./manager";
import { WORDS } from "./helpers";

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

function isNotAGame(param: string): boolean {
  const type = param.toLowerCase();
  return type.localeCompare("run") !== 0
    && type.localeCompare("pop") !== 0
    && type.localeCompare("jump") !== 0;
}

interface Params {
  type: Game;
}

const manager = manageGameObjects();
function Controller() {
  const params: Params = useParams();
  const game = params.type.toLowerCase() as Game;

  const [words, setWords] = useState([WORDS[0]]);
  const [prevGame, setGame] = useState(game);
  const [isGameOver, toggleGameOver] = useState(false);
  const gameObjects = useRef<Array<JSX.Element>>([]);

  // TODO remove when implement dynamic word generation / collection
  useEffect(() => {
    const interval = setInterval(() => {
      const nextWord = WORDS[Math.floor(Math.random() * WORDS.length)];
      setWords(prevWords => [...prevWords, nextWord]);
    }, 1000);

    return () => clearInterval(interval);
  }, [game, isGameOver]);

  useEffect(() => {
    switch (game) {
      case "run":
        gameObjects.current = [...gameObjects.current, manager.renderCon(words[words.length - 1])];
        break;
      case "pop":
        gameObjects.current = [...gameObjects.current, manager.renderBubble(words[words.length - 1])];
        break;
      case "jump":
        gameObjects.current = [...gameObjects.current, manager.renderPlatform(words[words.length - 1])];
        break;
    }
  }, [gameObjects.current]);

  if (isNotAGame(params.type)) {
    return <Page404 />;
  }

  if (prevGame.localeCompare(game) !== 0) {
    setGame(game);
    setWords([WORDS[0]]);
    manager.reset(game);
    gameObjects.current = [];
  }

  // TODO: set conditions
  // if (false) {
  //   toggleGameOver(true);
  // }

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
      <Display
        game={params.type}
        objects={gameObjects.current}
      />
      <Keyboard onKeyPress={noOp} />

      <MenuBtnFloating />
    </Container>
  );
}

export default Controller;