import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory, useParams, } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { Game, } from "../../helpers";
import firePng from "../../images/fire.png";
import { Keyboard, MenuBtn, Page404 } from "../common";
import Bubbles from "./Bubbles";
import Display from "./Display";
import Platforms from "./Platforms";
import { Score } from "./Score";
import { gameTypeChanged, isNotAGame, wordManager } from "./helpers";

interface GameProps {
  score: Score;
}
interface Params {
  type: Game;
}
interface FireProps {
  scrollCount: number;
  rate: number;
}

const raiseFireImg = keyframes`
  from { height: 5px; }
  to { height: 100px; }
`;

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

const Fire = styled.div<FireProps>`
  position: absolute;
  bottom: ${props => 0 - (props.scrollCount * 150) + props.rate}px;
  width: 100%;
`;
const FirePic = styled.img`
  width: 100%;
  height: 5px;
  transform: translateY(4px);
  animation: ${raiseFireImg} 1s ease-in forwards;
`;
const FirePit = styled.div`
  width: 100%;
  height: 0px; // TODO: after optimizing rendering of all platforms via virtualization or something
  background-color: blue;
`;

const bubblesManager = Bubbles();
const platformsManager = Platforms();
const wordTracker = wordManager();

function Controller(props: GameProps) {
  const { score } = props;
  const params: Params = useParams();
  const game = params.type.toLowerCase() as Game;
  const history = useHistory();

  const [words, setWords] = useState([wordTracker.select()]);
  const [prevGame, setGame] = useState(game);
  const [isGameOver, toggleGameOver] = useState(false);
  const [rerender, toggleRerender] = useState(0);
  const [rate, setRate] = useState(game === "pop" ? 3 : 1);
  const [count, setCount] = useState(0);
  const [didMount, toggleDidMount] = useState(false);
  const [showFire, toggleFire] = useState(false);

  const gameObjects = useRef<Array<JSX.Element>>([]);
  const wordIndex = useRef(0);
  const fireStartingCount = useRef(0);

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
      bubblesManager.setGameover(() => toggleGameOver(true));
    }

  }, [count, rate, didMount]);

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

  useEffect(() => {
    const fireY = 0 - (platformsManager.getScrollCount() * 150) + (count * 5);
    const ryanY = platformsManager.getRyanLocation()?.top;

    // the latter calc = ryan is in fire
    if (showFire && !!ryanY && Math.abs((window.innerHeight * 0.5) - fireY - parseInt(ryanY, 10)) <= 5) {
      toggleGameOver(true);
    }
  }, [rerender, count]);

  useEffect(() => {
    if (isGameOver) {
      history.push(`/gameover/${game}`);
    }
  }, [isGameOver]);

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
    score.reset();
  }

  function handleSubmit(enteredWord: string): void {
    switch (game) {
      case "pop": {
        const word = words.find(w => w.word.localeCompare(enteredWord) === 0);
        if (word) {
          bubblesManager.pop(word);
          const gameObjIndex = gameObjects.current.findIndex(go => (go.props.id as string).localeCompare(word.id) === 0);
          gameObjects.current.splice(gameObjIndex, 1); // removes from DOM
          score.increase();
          break;
        }
      }
      case "jump":
        const nextPlatformWord = words[wordIndex.current];

        if (nextPlatformWord.word.localeCompare(enteredWord) === 0) {
          platformsManager.jump(nextPlatformWord);

          if (!showFire) {
            toggleFire(true);
            fireStartingCount.current = count;
          }
          if (platformsManager.scroll()) {
            toggleRerender(prev => prev + 1);
          }

          wordIndex.current += 1;
          score.increase();
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
        {game === "pop" ? gameObjects.current : (
          <>
            {platformsManager.renderAll()}
            {showFire && (
              <Fire scrollCount={platformsManager.getScrollCount()} rate={(count - fireStartingCount.current) * 5}>
                <FirePic src={firePng} />
                <FirePit />
              </Fire>
            )}
          </>
        )}
      </Display>
      <Keyboard onSubmit={handleSubmit} />

      <MenuBtnFloating />
    </Container>
  );
}

export default Controller;