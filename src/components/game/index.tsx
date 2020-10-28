import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Game, } from "../../helpers";
import { Keyboard, MenuBtn, Page404 } from "../common";
import Display from "./Display";
import Platforms from "./Platforms";
import { gameTypeChanged, isNotAGame, wordManager } from "./helpers";
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
const platformsManager = Platforms();
const wordTracker = wordManager();

function Controller() {
  const params: Params = useParams();
  const game = params.type.toLowerCase() as Game;

  const [words, setWords] = useState([wordTracker.select()]);
  const [prevGame, setGame] = useState(game);
  const [isGameOver, toggleGameOver] = useState(false);
  const [rerender, toggleRerender] = useState(0);
  const [rate, setRate] = useState(game === "pop" ? 3 : 1);
  const [count, setCount] = useState(0);
  const [didMount, toggleDidMount] = useState(false);

  const gameObjects = useRef<Array<JSX.Element>>([]);
  const wordIndex = useRef(0);

  const ryanRef = useCallback((node) => {
    platformsManager.setRefs(node);
  }, []);

  useEffect(() => {
    if (didMount) {
      const timeout = setTimeout(() => {
        const nextWord = wordTracker.select();
        setWords(prevWords => [...prevWords, nextWord]);
        setCount(prev => {
          if ((prev + 1) % 5 === 0) {
            setRate(prev => {
              if (game === "jump") return prev;

              if (parseFloat((prev - 0.1).toFixed(1)) === 0.1) {
                return prev;
              }
              return parseFloat((prev - 0.1).toFixed(1));
            });
          }
          return prev + 1;
        });
      }, rate * 1000);

      return () => clearTimeout(timeout);
    }

    if (!didMount) {
      toggleDidMount(true);
    }

  }, [isGameOver, count, rate, didMount]);

  useEffect(() => {
    switch (game) {
      case "pop":
        gameObjects.current = [...gameObjects.current, bubblesManager.render(words[words.length - 1])];
        break;
      case "jump":
        platformsManager.render(words[words.length - 1]);
        break;
    }
  }, [words]);

  if (isNotAGame(params.type)) {
    return <Page404 />;
  }

  if (gameTypeChanged(prevGame, game)) {
    bubblesManager.reset();
    platformsManager.reset();
    gameObjects.current = [];
    wordTracker.reset();
    setGame(game);
    setRate(game === "pop" ? 3 : 1);
    setWords([wordTracker.select()]);
    toggleDidMount(false);
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
        const nextPlatformWord = words[wordIndex.current];

        if (nextPlatformWord.word.localeCompare(enteredWord) === 0) {
          platformsManager.jump(nextPlatformWord);
          if (platformsManager.scroll()) {
            toggleRerender(prev => prev + 1);
          }
          wordIndex.current += 1;
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
        {game !== "jump" ? gameObjects.current : platformsManager.renderAll()}
      </Display>
      <Keyboard onSubmit={handleSubmit} />

      <MenuBtnFloating />
    </Container>
  );
}

export default Controller;