import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export interface NextProps {
  onFinish: Dispatch<SetStateAction<boolean>>;
}

function typewriteByLetter(writeText: string, state: [string, Dispatch<SetStateAction<string>>]): void {
  const [text, setText] = state;

  for (let index = 0; index < writeText.length; index++) {
    setTimeout(() => {
      setText(text.concat(writeText.split("").splice(text.length, 1).join()));
    }, 100);
  }
}

const Title = styled.h1`
  font-family: 'Nanum Pen Script', cursive;
  font-size: 48px;
  font-weight: 200;
  margin-bottom: 0;
  text-align: center;
`;

export { Title, typewriteByLetter, };