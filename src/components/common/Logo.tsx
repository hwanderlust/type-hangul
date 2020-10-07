import React from "react";
import styled from "styled-components";

import img from "../../images/logo.png";

const Container = styled.div``;
const Image = styled.img``;

function Logo() {
  return (
    <Container>
      <Image src={img} alt="a 'T' with the Korean ㅎ as a logo" />
    </Container>
  );
}

export default Logo;