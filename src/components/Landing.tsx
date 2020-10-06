import React from 'react';
import styled from 'styled-components';

function Landing() {
  return (
    <Header>
      <Title>Welcome to Type Hangul</Title>
      <Subtitle>어서 오세요</Subtitle>
    </Header>
  )
}

const Header = styled.header``;
const Title = styled.h1`
  text-transform: uppercase;
`;
const Subtitle = styled.h2`
  color: #FFF;
`;

export default Landing;