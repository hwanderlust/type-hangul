import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { NextProps, typewriteByLetter } from './helpers';

const Main = styled.main``;
const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0;
`;
const Subtitle = styled.h2`
  font-family: 'Nanum Pen Script', cursive;
  font-size: 48px;
  font-weight: 200;
  color: #FFF;
  margin-top: 0;
  width: 200px;
`;

const titleText = "Welcome to Type Hangul";
const subtitleText = "어서 오세요";

function LandingOne(props: NextProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  typewriteByLetter(titleText, [title, setTitle]);

  useEffect(() => {
    if (title.length === titleText.length) {
      typewriteByLetter(subtitleText, [subtitle, setSubtitle]);
    }

    if (subtitle.length === subtitleText.length) {
      setTimeout(() => {
        props.onFinish(true);
      }, 500);
    }
  }, [title, subtitle]);

  return (
    <Main>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Main>
  );
}

export default LandingOne;