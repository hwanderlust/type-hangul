import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Game, } from "../../helpers";
import { Keyboard, MenuBtn, Page404 } from "../common";
import Display from "./Display";
import manageGameObjects from "./manager";
import { WORDS, Word } from "./helpers";

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

function gameTypeChanged(previous: Game, current: Game): boolean {
  return previous.localeCompare(current) !== 0;
}

function wordManager() {
  let usedWords: Array<number> = [];

  function select(): Word {
    const index = Math.floor(Math.random() * WORDS.length);
    const wasUsed = usedWords.find(i => i === index);

    if (wasUsed) {
      return select();
    }

    return WORDS[index];
  }

  function reset(): void {
    usedWords = [];
  }

  return {
    select,
    reset,
  }
}

interface Params {
  type: Game;
}

const manager = manageGameObjects();
const wordTracker = wordManager();
function Controller() {
  const params: Params = useParams();
  const game = params.type.toLowerCase() as Game;

  const [words, setWords] = useState([wordTracker.select()]);
  const [prevGame, setGame] = useState(game);
  const [isGameOver, toggleGameOver] = useState(false);
  const gameObjects = useRef<Array<JSX.Element>>([]);

  const rate = useRef(1); // temp? 
  const count = useRef(0); // temp?

  setInterval(() => {
    switch (game) {
      case "run": {
        // shift left / running pace
        break;
      }
      case "pop": {
        count.current = count.current + 0.2;
        break;
      }
      case "jump": {
        // raising fire pace
        break;
      }
    }
  }, 5000);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextWord = wordTracker.select();
      setWords(prevWords => [...prevWords, nextWord]);
    }, rate.current * (3000 - count.current));

    return () => clearInterval(interval);
  }, [game, isGameOver, count.current]);

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

  if (gameTypeChanged(prevGame, game)) {
    manager.reset(game);
    gameObjects.current = [];
    wordTracker.reset();
    setGame(game);
    setWords([wordTracker.select()]);
  }

  // TODO: set conditions
  // if (false) {
  //   toggleGameOver(true);
  // }

  function handleKeyPress(enteredWord: string): void {
    const word = words.find(w => w.word.localeCompare(enteredWord) === 0);
    if (word) {
      switch (game) {
        case "run":
          break;
        case "pop":
          manager.popBubble(word);
          const gameObjIndex = gameObjects.current.findIndex(go => (go.props.id as string).localeCompare(word.id) === 0);
          gameObjects.current.splice(gameObjIndex, 1); // removes from DOM
          break;
        case "jump":
          break;
      }
    }
  }

  return (
    <Container>
      <Header>
        <h1>{params.type}</h1>
        <p>Game Description</p>
      </Header>
      <Display game={params.type}>
        {gameObjects.current}
      </Display>
      <Keyboard onKeyPress={handleKeyPress} />

      <MenuBtnFloating />
    </Container>
  );
}

export default Controller;