import React from "react";
import styled from "styled-components";

import { fadeIn } from "../../helpers";

const Container = styled.footer`
  position: absolute;
  bottom: 3vh;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 500ms ease-in;
`;
const Line = styled.div`
  align-self: center;
  width: 30vw;
  height: 1px;
  background-color: black;
`;
const Text = styled.p`
  font-family: "Roboto", serif;
  font-size: 12px;
  font-style: italic;
  text-align: center;
`;

function Disclosure() {
  return (
    <Container>
      <Line></Line>
      <Text>Disclosure: The use of Kakao characters and images are not intended for commercial use and only for educational purposes. No intentions of copyright infingement whatsoever.</Text>
    </Container>
  );
}

export default Disclosure;