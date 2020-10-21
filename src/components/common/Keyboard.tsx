import React, { useState } from "react";
import styled from "styled-components";

import { Fonts, KeyType, Sizes, StyledProps } from "../../helpers";

const topRow: Array<KeyType> = [
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
const midRow: Array<KeyType> = [
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
const botRow: Array<KeyType> = [
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

const pressed = { backgroundColor: "#FF7D7D", color: "black", border: "1px solid black" };

function KeyboardRow(props: ({ rowLetters: Array<KeyType>, pressedKey: string })): JSX.Element {
  return (
    <Row numOfEl={props.rowLetters.length}>
      {props.rowLetters.map((key, index) => (
        <Key key={`${key}${index}`} style={props.pressedKey.localeCompare(key.eng) === 0 ? pressed : {}}>
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

interface KeyboardProps extends StyledProps {
  onSubmit: (key: string) => void;
}
function Keyboard(props: KeyboardProps) {
  const [word, setWord] = useState("");
  const [pressedKey, setPressedKey] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPressedKey(e.target.value.substr(-1));
    setWord(e.target.value);
    setTimeout(() => { setPressedKey("") }, 100);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    props.onSubmit(word);
    setPressedKey("");
    setWord("");
  }

  // TODO: update when I update the design for the form input
  return (
    <Container className={props.className}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={word}
          autoFocus />
      </form>
      <KeyboardRow rowLetters={topRow} pressedKey={pressedKey} />
      <KeyboardRow rowLetters={midRow} pressedKey={pressedKey} />
      <KeyboardRow rowLetters={botRow} pressedKey={pressedKey} />
    </Container>
  );
}

export default Keyboard;