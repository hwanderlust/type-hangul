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
  scrollHeight: number;
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
const Title = styled.h1`
  text-transform: capitalize;
  margin-bottom: 0;
`;
const Description = styled.p`
  color: white;
  font-weight: 200;
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

const Fire = styled.div.attrs<FireProps>((props) => ({
  style: { bottom: `${0 - props.scrollHeight + props.rate}px`, }
})) <FireProps>`
  position: absolute;
  width: 100%;
`;
const FirePic = styled.img`
  width: 100%;
  height: 5px;
  transform: translateY(4px);
  animation: ${raiseFireImg} 1s ease-in forwards;
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
  const [rate, setRate] = useState(game === "pop" ? 3 : 5);
  const [count, setCount] = useState(0);
  const [didMount, toggleDidMount] = useState(false);
  const [showFire, toggleFire] = useState(false);

  const gameObjects = useRef<Array<JSX.Element>>([]);
  const wordIndex = useRef(0);
  const fireStartingCount = useRef(0);
  const fireRate = (count - fireStartingCount.current) * rate;

  const ryanRef = useCallback((node) => {
    platformsManager.setRefs(node);
  }, []);

  useEffect(() => {
    let timeout: number;

    if (didMount) {
      switch (game) {
        case "pop":
          timeout = setTimeout(() => {
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
          break;

        case "jump":
          timeout = setTimeout(() => {
            const nextWord = wordTracker.select();
            setWords(prevWords => [...prevWords, nextWord]);
            setCount(prev => {
              if ((prev + 1 - fireStartingCount.current) % 5 === 0) {
                setRate(prev => parseFloat((prev + 0.05).toFixed(2)));
                return prev + 5;
              }
              return prev + 1;
            });
          }, 1000);
          break;
      }

      return () => clearTimeout(timeout);
    }


    if (!didMount) {
      toggleDidMount(true);
      bubblesManager.setGameover(() => toggleGameOver(true));
      score.reset();
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
    const fireY = 0 - platformsManager.getScrollHeight() + fireRate;
    const displayHeight = window.innerHeight * 0.5;
    const activePlatform = platformsManager.getActivePlatform()?.y || 0;
    const calc = displayHeight - fireY - activePlatform;
    const isRyanInFire = calc < 100;

    if (showFire && !!activePlatform && isRyanInFire) {
      toggleGameOver(true);
    }
  }, [rerender, count]);

  useEffect(() => {
    if (isGameOver) {
      platformsManager.reset();
      wordTracker.reset();
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
        <Title>{game}</Title>
        <Description>
          {game === "pop"
            ? "Type the words that appear to pop the bubbles before they touch the ground to save Ryan, the Kakao bear character"
            : "Type the words on the nearest platform to make Ryan, the Kakao bear character, jump up to make an escape from the engulfing fire"}
        </Description>
      </Header>
      <Display game={params.type} ryanRef={ryanRef} >
        {game === "pop" ? gameObjects.current : (
          <>
            {platformsManager.renderAll()}
            {showFire && (
              <Fire scrollHeight={platformsManager.getScrollHeight()} rate={fireRate}>
                <FirePic src={firePng} />
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