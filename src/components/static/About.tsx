import React from "react";
import styled from "styled-components";

import banner from "../../images/friends-wall.jpg";
import ryanPole from "../../images/ryan-pole.png";
import friends from "../../images/friends-walking.jpg";
import ryan from "../../images/ryan-waving.png";
import apeach from "../../images/apeach-sparkly-eyes.png";

import { Disclosure, Logo, MenuBtn } from "../common";
import { Fonts, Sizes } from "../../helpers";

const Header = styled.div`
  width: 100vw;
  height: 300px;
`;
const MobileTop = styled.div`
  display: none;

  @media only screen and (max-width: 720px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 95vw;
    margin-left: auto;
    margin-right: auto;
  }
`;
const Banner = styled.div`
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  height: 100%;
`;
const MenuIcon = styled(MenuBtn)`
  display: none;

  @media only screen and (max-width: 720px) {
    display: block;
  }
`;
const MenuBtnFloating = styled(MenuBtn)`
  display: block;
  position: fixed;
  right: 1vw;
  top: calc(50% - 50px);

  @media only screen and (max-width: 720px) {
    display: none;
  }
`;

const Container = styled.main`
  padding: 0 5vw;
`;
const Title = styled.h1`
  font-family: ${Fonts.playfair};
  font-size: ${Sizes.variable.font.large};
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 0;
`;
const Subtitle = styled.h2`
  font-family: ${Fonts.playfair};
  font-size: ${Sizes.variable.font.medium};
  margin-bottom: 0;
  font-weight: 400;
`;
const Text = styled.p`
  font-family: ${Fonts.roboto};
  font-size: ${Sizes.variable.font.small};
  color: white;
  max-width: 720px;
`;
const RyanPole = styled.img`
  position: absolute;
  opacity: 0.3;
  left: ${Math.sqrt(window.innerWidth / 10) * 5}%;
  width: calc(150px + (282 - 150) * ((100vw - 300px) / (1440 - 300)));
`;

const Friends = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
const FriendsPic = styled.img`
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;
const Intros = styled.div`
  margin-top: 32px;
  max-width: 532px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 32px;
`;
const Caption = styled.div`
  display: flex;
  flex-direction: column;
`;
const CaptionLeft = styled(Caption)`
  margin-right: 16px;
`;
const CaptionRight = styled(Caption)`
  margin-left: 16px;
`;
const Name = styled.h3`
  font-family: ${Fonts.playfair};
  font-size: ${Sizes.variable.font.medium};
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 0;
`;
const Intro = styled.p`
  font-family: ${Fonts.roboto};
  font-size: ${Sizes.variable.font.small};  
  color: white;
  max-width: 400px;
  margin-bottom: 0;
`;

function About() {

  return (
    <>
      <MobileTop>
        <Logo />
        <MenuIcon />
      </MobileTop>
      <Header>
        <Banner />
      </Header>

      <MenuBtnFloating />

      <Container>
        <section>
          <Title>About</Title>

          <article>
            <Subtitle>Story</Subtitle>
            <Text>
              These games are for those with a passion and interest in the Korean language and would like to learn or practice their typing skills, whether it’s on a desktop or laptop on a large screen or a smaller screen like on mobile devices.
              </Text>
            <Text>
              I, the creator, designer and developer, studied Korean over the coarse of a year by myself with textbooks while I taught English in rural Korea and then took 6 months of classes at Sogang University.
            </Text>
            <Text>
              My studies weren’t for higher education nor for a professional reason, but simply because I like the language and what better way to enjoy learning a language and its culture and history than being in its country and among the people.
            </Text>
            <Text>
              I believe with the advancements of technology and translation, the beauty of each and every language is being lost at an extraordinary rate than ever before. It’s fun learning the differences between languages and provides meaningful insight into other cultures and their prospective on life.
            </Text>
            <Text>
              With that said, please have fun and keep learning!
            </Text>
          </article>

          <RyanPole src={ryanPole} alt="Kakao Friends' Ryan hanging on a pole leaning left peeking a look" />

          <article>
            <Subtitle>Pop</Subtitle>
            <Text>
              These games are for those with a passion and interest in the Korean language and would like to learn or practice their typing skills, whether it’s on a desktop or laptop on a large screen or a smaller screen like on mobile devices.
            </Text>
          </article>

          <article>
            <Subtitle>Jump</Subtitle>
            <Text>
              These games are for those with a passion and interest in the Korean language and would like to learn or practice their typing skills, whether it’s on a desktop or laptop on a large screen or a smaller screen like on mobile devices.
            </Text>
          </article>

        </section>

        <Friends>
          <FriendsPic src={friends} alt="Kakao friends arms-on-shoulders one-by-one in line happily smiling" />
          <Intros>
            <Row>
              <img src={ryan} alt="Kakao friends' Ryan waving" />
              <CaptionRight>
                <Name>Ryan</Name>
                <Intro>A male lion whose complex is his absence of a mane</Intro>
              </CaptionRight>
            </Row>

            <Row>
              <CaptionLeft>
                <Name>Apeach</Name>
                <Intro>Mischievous peach that escaped from the peach tree</Intro>
              </CaptionLeft>
              <img src={apeach} alt="Kakao friends' Apeach drinking something with sparkly eyes" />
            </Row>
          </Intros>
        </Friends>
      </Container>

      <Disclosure />
    </>
  );
}

export default About;