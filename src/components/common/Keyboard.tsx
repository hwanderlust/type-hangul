import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Fonts, Sizes, StyledProps } from "../../helpers";

interface Key {
  eng: string;
  shift: string;
  kor: string;
}
const topRow: Array<Key> = [
  { eng: "q", shift: "ㅃ", kor: "ㅂ" },
  { eng: "w", shift: "ㅉ", kor: "ㅈ" },
  { eng: "e", shift: "ㄸ", kor: "ㄷ" },
  { eng: "r", shift: "ㄲ", kor: "ㄱ" },
  { eng: "t", shift: "ㅆ", kor: "ㅅ" },
  { eng: "y", shift: "", kor: "ㅛ" },
  { eng: "u", shift: "", kor: "ㅕ" },
  { eng: "i", shift: "", kor: "ㅑ" },
  { eng: "o", shift: "ㅒ", kor: "ㅐ" },
  { eng: "p", shift: "ㅖ", kor: "ㅔ" },
];
const midRow: Array<Key> = [
  { eng: "a", shift: "", kor: "ㅁ" },
  { eng: "s", shift: "", kor: "ㄴ" },
  { eng: "d", shift: "", kor: "ㅇ" },
  { eng: "f", shift: "", kor: "ㄹ" },
  { eng: "g", shift: "", kor: "ㅎ" },
  { eng: "h", shift: "", kor: "ㅗ" },
  { eng: "j", shift: "", kor: "ㅓ" },
  { eng: "k", shift: "", kor: "ㅏ" },
  { eng: "l", shift: "", kor: "ㅣ" },
];
const botRow: Array<Key> = [
  { eng: "z", shift: "", kor: "ㅋ" },
  { eng: "x", shift: "", kor: "ㅌ" },
  { eng: "c", shift: "", kor: "ㅊ" },
  { eng: "v", shift: "", kor: "ㅍ" },
  { eng: "b", shift: "", kor: "ㅠ" },
  { eng: "n", shift: "", kor: "ㅜ" },
  { eng: "m", shift: "", kor: "ㅡ" },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
interface RowProps {
  numOfEl: number;
}
const Row = styled.div<RowProps>`
  display: inline-flex;
  justify-content: space-between;
  margin-bottom: calc(4px + (8 - 4) * ((100vw - 300px) / (1440 - 300)));

  &:last-of-type {
    margin-bottom: 0;
  }
`;
const Key = styled.div`
  background-color: black;
  width: calc(25px + (75 - 25) * ((100vw - 300px) / (1440 - 300)));
  height: calc(40px + (75 - 40) * ((100vw - 300px) / (1440 - 300)));
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-right: calc(4px + (8 - 4) * ((100vw - 300px) / (1440 - 300)));

  &:last-of-type {
    margin-right: 0;
  }

  @media only screen and (max-width: 700px) {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
const Contents = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;

  @media only screen and (max-width: 700px) {
    justify-content: flex-end;
    align-items: center;
  }
`;
const Bottom = styled.div`
  align-self: flex-end;

  @media only screen and (max-width: 700px) {
    align-self: center;
  }
`;
const Letter = styled.span`
  font-family: ${Fonts.roboto};
  font-size: ${Sizes.variable.font.small};
  color: white;
  text-transform: uppercase;
`;
const LetterSmall = styled(Letter)`
  font-size: ${Sizes.variable.font.xSmall};
`;
const LetterEng = styled(Letter)`
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

// https://stackoverflow.com/questions/29069639/listen-to-keypress-for-document-in-reactjs
function useEventListener(eventName: string, handler: (e: KeyboardEvent) => void, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    // @ts-ignore
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      // @ts-ignore
      const eventListener = event => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};

const pressed = { backgroundColor: "pink", color: "black" };

function KeyboardRow(props: ({ rowLetters: Array<Key>, pressedKeys: Array<string> })): JSX.Element {
  return (
    <Row numOfEl={props.rowLetters.length}>
      {props.rowLetters.map((key, index) => (
        <Key key={`${key}${index}`} style={props.pressedKeys.length && props.pressedKeys.find(el => el.localeCompare(key.eng) === 0) !== undefined ? pressed : {}}>
          <Contents>

            <Top>
              <LetterEng>
                {key.eng}
              </LetterEng>
              <LetterSmall>
                {key.shift}
              </LetterSmall>
            </Top>

            <Bottom>
              <Letter>
                {key.kor}
              </Letter>
            </Bottom>

          </Contents>
        </Key>
      ))}
    </Row>
  )
}

function Keyboard(props: StyledProps) {
  const [pressedKeys, setKeys] = useState([] as Array<string>);

  function handleDown(e: KeyboardEvent) {
    if (!pressedKeys.find(el => el.localeCompare(e.key) === 0)) {
      setKeys([...pressedKeys, e.key]);
    }
  }

  function handleUp(e: KeyboardEvent) {
    const index = pressedKeys.findIndex(el => el.localeCompare(e.key) === 0);
    if (index !== -1) {
      const copied = [...pressedKeys];
      copied.splice(index, 1);
      setKeys(copied);
    }
  }

  useEventListener("keydown", handleDown);
  useEventListener("keyup", handleUp);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pressedKeys.length) {
        console.debug(`resetting array`);
        setKeys([]);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [pressedKeys]);

  return (
    <Container {...props}>
      <KeyboardRow rowLetters={topRow} pressedKeys={pressedKeys} />
      <KeyboardRow rowLetters={midRow} pressedKeys={pressedKeys} />
      <KeyboardRow rowLetters={botRow} pressedKeys={pressedKeys} />
    </Container>
  );
}

export default Keyboard;