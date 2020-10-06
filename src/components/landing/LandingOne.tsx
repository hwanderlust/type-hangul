import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

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

interface LandingProps {
  onFinish: Dispatch<SetStateAction<boolean>>;
}

function LandingOne(props: LandingProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  typewriteTitle(title, setTitle);

  useEffect(() => {
    if (title.length === titleText.length) {
      typewriteSubtitle(subtitle, setSubtitle);
    }

    if (subtitle.length === subtitleText.length) {
      setTimeout(() => {
        props.onFinish(true);
      }, 500);
    }
  }, [title, subtitle]);

  return (
    <>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </>
  );
}

function typewriteTitle(title: string, setTitle: Dispatch<SetStateAction<string>>): void {
  for (let index = 0; index < titleText.length; index++) {
    setTimeout(() => {
      setTitle(title.concat(titleText.split("").splice(title.length, 1).join()));
    }, 100);
  }
}

function typewriteSubtitle(subtitle: string, setSubtitle: Dispatch<SetStateAction<string>>): void {
  for (let index = 0; index < subtitleText.length; index++) {
    setTimeout(() => {
      setSubtitle(subtitle.concat(subtitleText.split("").splice(subtitle.length, 1).join()))
    }, 100);
  }
}

export default LandingOne;