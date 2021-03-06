import React from "react";
import styled from "styled-components";

import { Fonts, Sizes, StyledProps, fadeIn, } from "../../helpers";

const Container = styled.footer`
  margin-top: 10vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 4000ms ease-in;
  align-items: center;
`;
const Line = styled.div`
  align-self: center;
  width: 30vw;
  height: 1px;
  background-color: black;
`;
const Text = styled.p`
  font-family: ${Fonts.roboto};
  font-size: ${Sizes.variable.font.xSmall};
  font-style: italic;
  padding: 2vw;
  
  @media screen only and (max-width: 720px) {
    max-width: 500px;
  }
`;

function Disclosure(props: StyledProps) {
  return (
    <Container {...props}>
      <Line></Line>
      <Text>Disclosure: The use of Kakao characters and images are not intended for commercial use and only for educational purposes. No intentions of copyright infingement whatsoever.</Text>
    </Container>
  );
}

export default Disclosure;