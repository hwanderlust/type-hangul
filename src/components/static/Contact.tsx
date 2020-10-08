import React from "react";
import styled from "styled-components";

import friends from "../../images/friends-posing.jpg";
import { Disclosure, Logo, MenuBtn } from "../common";

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100px auto 400px auto 5vh;
  grid-column-gap: 2vw;
  height: 100vh;

  @media only screen and (max-width: 720) {
    // grid-template-columns: 50% 50%;
    // grid-template-rows: 200px auto 400px auto 5vh;
  }
`;
const Title = styled.h1`
  grid-area: 1 / 1 / 3 / 3;
  margin-top: 2vh;
  margin-bottom: 0;
  padding-left: 5vw;
  font-family: 'Playfair Display', serif;
  font-size: calc(36px + (72 - 36) * ((100vw - 300px) / (1440 - 300)));
  font-weight: 400;
`;
const Image = styled.img`
  grid-area: 3 / 1 / 5 / 2;
  width: 100%;
  margin: auto 0;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;

  @media only screen and (max-width: 720) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
  }
`;
const Container = styled.main`
  grid-area: 3 / 2 / 4 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Subtitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: calc(24px + (36 - 24) * ((100vw - 300px) / (1440 - 300)));
  margin-bottom: 0;
  font-weight: 400;
`;
const Text = styled.p`
  font-family: "Roboto", serif;
  font-size: calc(12px + (16 - 12) * ((100vw - 300px) / (1440 - 300)));
  color: white;
  width: 75%;
`;
const Highlight = styled.span`
  color: black;
`;

function Contact() {
  return (
    <GridLayout>

      <Title>Contact</Title>

      {/* <Logo /> */}
      <MenuBtn style={{
        position: "absolute",
        right: "1vw",
        top: `calc(50% - ${window.innerWidth > 720 ? 50 : 25}px)`,
      }} />

      <Image src={friends} alt="Kakao friends' posing for a picture with a temple in the background and the skyblue sky" />

      <Container>
        <section>
          <Subtitle>Email</Subtitle>
          <Text>Any questions or concerns can be directed to <Highlight>hwanderlustdev@gmail.com</Highlight>.</Text>
        </section>

        <section>
          <Subtitle>GitHub</Subtitle>
          <Text>Any requests or issues can be directed to <Highlight>github.com/hwanderlust</Highlight>.</Text>
        </section>
      </Container>

      <Disclosure />
    </GridLayout>
  );
}

export default Contact;