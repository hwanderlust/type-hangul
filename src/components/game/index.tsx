import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Game, } from "../../helpers";
import { Keyboard, MenuBtn, Page404 } from "../common";
import Display from "./Display";
import Platforms from "./Platforms";
import { Word, gameTypeChanged, isNotAGame, wordManager } from "./helpers";
import Bubbles from "./Bubbles";

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


interface Params {
  type: Game;
}

const bubblesManager = Bubbles();
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
  const ryan = useRef<SVGElement>();
  const prevWord = useRef<Word>();
  const wordIndex = useRef(0);
  const jumped = useRef(false);

  const ryanRef = useCallback((node) => {
    ryan.current = node;
  }, []);

  setInterval(() => {
    switch (game) {
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
      case "pop":
        gameObjects.current = [...gameObjects.current, bubblesManager.render(words[words.length - 1])];
        break;
      case "jump":
        break;
    }
  }, [gameObjects.current]);

  if (isNotAGame(params.type)) {
    return <Page404 />;
  }

  if (gameTypeChanged(prevGame, game)) {
    bubblesManager.reset();
    gameObjects.current = [];
    wordTracker.reset();
    setGame(game);
    setWords([wordTracker.select()]);
  }

  // TODO: set conditions
  // if (false) {
  //   toggleGameOver(true);
  // }

  function handleSubmit(enteredWord: string): void {
    switch (game) {
      case "pop": {
        const word = words.find(w => w.word.localeCompare(enteredWord) === 0);
        if (word) {
          bubblesManager.pop(word);
          const gameObjIndex = gameObjects.current.findIndex(go => (go.props.id as string).localeCompare(word.id) === 0);
          gameObjects.current.splice(gameObjIndex, 1); // removes from DOM
          break;
        }
      }
      case "jump":
        if (ryan.current) {
          const nextPlatformWord = words[wordIndex.current];
          if (nextPlatformWord.word.localeCompare(enteredWord) === 0) {
            jumped.current = true;
            prevWord.current = nextPlatformWord;
            wordIndex.current += 1;
          }
        }
        break;
    }
  }

  return (
    <Container>
      <Header>
        <h1>{params.type}</h1>
        <p>Game Description</p>
      </Header>
      <Display game={params.type} ryanRef={ryanRef} >
        {game !== "jump" ? gameObjects.current : <Platforms words={words} jumped={jumped} ryanRef={ryan.current} />}
      </Display>
      <Keyboard onSubmit={handleSubmit} />

      <MenuBtnFloating />
    </Container>
  );
}

export default Controller;