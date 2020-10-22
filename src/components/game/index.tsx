import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Game, } from "../../helpers";
import { Keyboard, MenuBtn, Page404 } from "../common";
import Display from "./Display";
import { Word, gameTypeChanged, isNotAGame, wordManager } from "./helpers";
import manageGameObjects from "./manager";

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
  const ryan = useRef<SVGElement>();
  const prevWord = useRef<Word>();
  const wordIndex = useRef(0);

  const ryanRef = useCallback((node) => {
    ryan.current = node;
  }, []);

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
      if (gameObjects.current.length <= 3) {
        const nextWord = wordTracker.select();
        setWords(prevWords => [...prevWords, nextWord]);
      }
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

  useEffect(() => {
    const cloud1Interval = setInterval(() => {
      const cloud1 = document.getElementById("cloud1");
      if (cloud1) {
        cloud1.style.top = `-200px`;
      }
    }, 20000);
    const cloud2Interval = setInterval(() => {
      const cloud2 = document.getElementById("cloud2");
      if (cloud2) {
        cloud2.style.top = `-200px`;
      }
    }, 25000);
    const cloud3Interval = setInterval(() => {
      const cloud3 = document.getElementById("cloud3");
      if (cloud3) {
        cloud3.style.top = `-200px`;
      }
    }, 30000);
    const cloud4Interval = setInterval(() => {
      const cloud4 = document.getElementById("cloud4");
      if (cloud4) {
        cloud4.style.top = `-200px`;
      }
    }, 42000);
    const cloud5Interval = setInterval(() => {
      const cloud5 = document.getElementById("cloud5");
      if (cloud5) {
        cloud5.style.top = `-200px`;
      }
    }, 50000);
    const cloud6Interval = setInterval(() => {
      const cloud6 = document.getElementById("cloud6");
      if (cloud6) {
        cloud6.style.top = `-200px`;
      }
    }, 61000);

    return () => {
      clearInterval(cloud1Interval);
      clearInterval(cloud2Interval);
      clearInterval(cloud3Interval);
      clearInterval(cloud4Interval);
      clearInterval(cloud5Interval);
      clearInterval(cloud6Interval);
    }
  }, [])

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

  function handleSubmit(enteredWord: string): void {
    switch (game) {
      case "run":
        break;
      case "pop": {
        const word = words.find(w => w.word.localeCompare(enteredWord) === 0);
        if (word) {
          manager.popBubble(word);
          const gameObjIndex = gameObjects.current.findIndex(go => (go.props.id as string).localeCompare(word.id) === 0);
          gameObjects.current.splice(gameObjIndex, 1); // removes from DOM
          break;
        }
      }
      case "jump":
        if (ryan.current) {
          const nextPlatformWord = words[wordIndex.current];
          if (nextPlatformWord.word.localeCompare(enteredWord) === 0) {
            manager.jumpToPlatform(ryan.current);

            if (prevWord.current) {
              const platform = document.getElementById(prevWord.current.id);
              if (platform) {
                platform.style.transition = "opacity 150ms ease"
                platform.style.opacity = "0";
              }
              const gameObjIndex = gameObjects.current.findIndex(go => (go.props.id as string).localeCompare(prevWord.current?.id!) === 0);
              gameObjects.current.splice(gameObjIndex, 1); // removes from DOM
            }

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
        {gameObjects.current}
      </Display>
      <Keyboard onSubmit={handleSubmit} />

      <MenuBtnFloating />
    </Container>
  );
}

export default Controller;