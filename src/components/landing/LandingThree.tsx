import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import apeach from "../../images/apeach-btn.png";
import { Disclosure } from "../common";
import { Game, fadeIn, } from "../../helpers";

import Navigation from "./Navigation";
import { Title, typewriteByLetter } from "./helpers";

const rotate = keyframes`
  0% { transform: translateX(-25px) translateY(-50%); }
  50% { transform: translateX(-25px) translateY(-50%) rotate(5deg); }
  100% { transform: translateX(-25px) translateY(-50%); }
`;

const titleText = "어느 게임을 하고 싶어요?";
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.form`
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: ${fadeIn} 750ms ease-in;
  animation-delay: ${titleText.length * 100}ms;
  animation-fill-mode: forwards;
`;
const Radio = styled.input.attrs(props => ({
  type: "radio",
  name: "game",
}))`
  transform: translateX(-25px);

  &:not(:checked) {
    opacity: 0;
  }

  &:checked::before {
    content: "";
    position: absolute;
    transform: translateX(-25px) translateY(-50%);
    background-image: url("${apeach}");
    background-size: cover;
    height: 50px;
    width: 50px;
  }
  
  &:focus, &:active {
    &:checked::before {
      animation: ${rotate} 1s ease infinite;
    }
  }
`;
const Submit = styled.input.attrs(props => ({
  type: "submit",
}))`
  opacity: 0;
`

interface GameOptionProps {
  description: string;
}
const GameName = styled.button`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 400;
  margin: 0;
  color: #FFF;
  background-color: transparent;
  border: none;
  outline: none;

  &:hover {
    color: black;
  }
  
  &:active, &:focus {
    outline: 1px solid black;
  }

  &::after {
    content: "${(props: GameOptionProps) => props.description}";
    color: black;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    margin-left: 16px;
    position: absolute;
    transform: translateY(31px);
  }
`;

interface LandingThreeProps {
  onSelectGame: (game: Game) => void;
}
function LandingThree(props: LandingThreeProps) {
  const [title, setTitle] = useState("");
  const [selectedGame, setGame] = useState("run");
  const [showSecondaryComponents, toggleSecondaryComponents] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement | HTMLInputElement>): void {
    e.preventDefault();
    props.onSelectGame(selectedGame as Game);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setGame(e.currentTarget.value);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: Game): void {
    e.preventDefault();
    setGame(value);
    props.onSelectGame(value);
  }

  typewriteByLetter(titleText, [title, setTitle]);
  setTimeout(() => { toggleSecondaryComponents(true) }, 2000);

  return (
    <Main>
      {showSecondaryComponents && <Navigation />}

      <Title>{title}</Title>

      <Container onSubmit={handleSubmit}>
        <Submit onClick={handleSubmit} />

        <div>
          <Radio value="run" checked={selectedGame === "run"} onChange={handleChange} autoFocus />
          <GameName
            description={selectedGame === "run" ? "Type the given words to help your character clear obstacles" : ""}
            onClick={e => handleClick(e, "run")}
          >
            Run
        </GameName>
        </div>

        <div>
          <Radio value="pop" checked={selectedGame === "pop"} onChange={handleChange} />
          <GameName
            description={selectedGame === "pop" ? "Type the floating words to avoid the bubbles from hitting the ground" : ""}
            onClick={e => handleClick(e, "pop")}>
            Pop
        </GameName>
        </div>

        <div>
          <Radio value="jump" checked={selectedGame === "jump"} onChange={handleChange} />
          <GameName
            description={selectedGame === "jump" ? "Type the words on the closest platform to escape the burning fire" : ""}
            onClick={e => handleClick(e, "jump")}>
            Jump
          </GameName>
        </div>

      </Container>

      {showSecondaryComponents && <Disclosure />}

    </Main>
  );
}

export default LandingThree;