import React from "react";
import styled from "styled-components";

import banner from "../../images/friends-wall.png";
import ryanPole from "../../images/ryan-pole.png";
import friends from "../../images/friends-walking.png";
import ryan from "../../images/ryan-waving.png";
import apeach from "../../images/apeach-sparkly-eyes.png";
import con from "../../images/con-thinking.png";
import icon from "../../images/apeach-btn.png";

import { Disclosure, Logo } from "../common";

const Header = styled.div``;
const Banner = styled.img``;
const Title = styled.h1``;
const Subtitle = styled.h2``;
const Text = styled.p``;
const MenuIcon = styled.img``;
const RyanPole = styled.img``;
const Friends = styled.img``;
const Intros = styled.div``;
const Row = styled.div``;
const Name = styled.h3``;
const Intro = styled.p``;

function About() {
  return (
    <>
      <Header>
        <Logo />
        <MenuIcon src={icon} alt="Kakao Friends' Apeach smiling - as a menu icon/button" />
        <Banner src={banner} alt="Kakao friends in a seated position looking happy and friendly" />
      </Header>

      <main>
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

          <article>
            <Subtitle>Run</Subtitle>
            <Text>
              These games are for those with a passion and interest in the Korean language and would like to learn or practice their typing skills, whether it’s on a desktop or laptop on a large screen or a smaller screen like on mobile devices.
            </Text>
          </article>

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

          <RyanPole src={ryanPole} alt="Kakao Friends' Ryan hanging on a pole leaning left peeking a look" />
        </section>

        <section>
          <Friends src={friends} alt="Kakao friends arms-on-shoulders one-by-one in line happily smiling" />
          <Intros>
            <Row>
              <img src={ryan} alt="Kakao friends' Ryan waving" />
              <Name>Ryan</Name>
              <Intro>A male lion whose complex is his absence of a mane</Intro>
            </Row>


            <Row>
              <Name>Apeach</Name>
              <Intro>Mischievous peach that escaped from the peach tree</Intro>
              <img src={apeach} alt="Kakao friends' Apeach drinking something with sparkly eyes" />
            </Row>

            <Row>
              <img src={con} alt="Kakao friends' Con in a thinking pose with one of its arms under its chin" />
              <Name>Con</Name>
              <Intro>The unidentifiable crocodile created by Muzi by raising a pickled radish and now wants to raise a peach</Intro>
            </Row>
          </Intros>
        </section>
      </main>

      <Disclosure />
    </>
  );
}

export default About;