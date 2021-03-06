import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Fonts } from "../../helpers";
import { NextProps, typewriteByLetter } from './helpers';

const Title = styled.h1`
  font-family: ${Fonts.playfair};
  font-weight: 400;
  margin-bottom: 0;
  `;
const Left = styled.span`
  font-size: 36px;
  color: white;
  letter-spacing: -0.05em;
  text-transform: lowercase;
  `;
const Right = styled.span`
  font-size: 72px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;
const Subtitle = styled.h2`
  font-family: ${Fonts.nanum};
  font-size: 48px;
  font-weight: 200;
  text-align: right;
  color: #FFF;
  margin-top: 0;
`;

const titleLeft = "Welcome to";
const titleRight = "Type Hangul";
const subtitleText = "어서 오세요";

function LandingOne(props: NextProps) {
  const [leftText, setLeft] = useState("");
  const [rightText, setRight] = useState("");
  const [subtitle, setSubtitle] = useState("");

  typewriteByLetter(titleLeft, [leftText, setLeft]);

  useEffect(() => {
    if (leftText.length === titleLeft.length) {
      typewriteByLetter(titleRight, [rightText, setRight]);
    }

    if (rightText.length === titleRight.length) {
      typewriteByLetter(subtitleText, [subtitle, setSubtitle]);
    }

    if (subtitle.length === subtitleText.length) {
      setTimeout(() => {
        props.onFinish();
      }, 500);
    }
  }, [props, leftText, rightText, subtitle]);

  return (
    <main>
      <Title>
        <Left>{leftText}</Left>
        <Right>{rightText}</Right>
      </Title>
      <Subtitle>{subtitle}</Subtitle>
    </main>
  );
}

export default LandingOne;