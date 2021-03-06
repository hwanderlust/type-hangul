import React from "react";
import styled from "styled-components";

import friends from "../../images/friends-posing.jpg";
import { Fonts, Sizes, } from "../../helpers";
import { Disclosure, Logo, MenuBtn } from "../common";

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 48vw 48vw;
  grid-template-rows: 100px auto auto auto;
  grid-column-gap: 2vw;

  @media only screen and (max-width: 720px) {
    grid-template-columns: 100%;
    grid-template-rows: 75px auto auto auto;
  }
`;
const Nav = styled.nav`
  display: none;

  @media only screen and (max-width: 720px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.5vw;
    width: 95vw;
  }
`;

const Title = styled.h1`
  grid-area: 1 / 1 / 3 / 3;
  margin-top: 2vh;
  margin-bottom: 0;
  padding-left: 5vw;
  font-family: ${Fonts.playfair};
  font-size: ${Sizes.variable.font.large};
  font-weight: 400;

  @media only screen and (max-width: 720px) {
    grid-area: auto;
    margin-bottom: 32px;
  }
`;
const Image = styled.img`
  grid-area: 3 / 1 / 4 / 2;
  width: 100%;
  margin: auto 0;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;

  @media only screen and (max-width: 720px) {
    grid-area: 2 / 1 / 3 / 2;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
const Container = styled.main`
  grid-area: 3 / 2 / 4 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 720px) {
    grid-area: auto;
    padding-left: 5vw;
  }
`;
const Link = styled.a`
  text-decoration: none;
  color: black;

  &:focus {
    text-decoration: underline;
    text-decoration-color: black;
    outline: none;
  }
`;
const Subtitle = styled.h2`
  font-family: ${Fonts.playfair};
  font-size: ${Sizes.variable.font.medium};
  margin-bottom: 0;
  font-weight: 400;

  @media only screen and (max-width: 720px) {
    margin-top: 0;
  }
`;
const Text = styled.p`
  font-family: ${Fonts.roboto};
  font-size: ${Sizes.variable.font.small};
  color: white;
  width: 75%;

  @media only screen and (max-width: 720px) {
    margin-top: 0.25rem;
  }
`;
const Highlight = styled.span`
  color: black;
`;

const MenuBtnFloating = styled(MenuBtn)`
  display: block;
  position: absolute;
  right: 1vw;
  top: calc(50% - 50px);

  @media only screen and (max-width: 720px) {
    display: none;
  }
`;
const DisclosureGrid = styled(Disclosure)`
  grid-area: 4 / 1 / 5 / 3;

  @media only screen and (max-width: 720px) {
    grid-area: 6 / 1 / 7 / 2;
  }
`;

function Contact() {
  return (
    <GridLayout>

      <Nav>
        <Logo />
        <MenuBtn />
      </Nav>

      <Title>Contact</Title>

      <Image src={friends} alt="Kakao friends' posing for a picture with a temple in the background and the skyblue sky" />

      <Container>
        <section>
          <Link href="mailto:hwanderlustdev@gmail.com?subject=Type%20Hangul%20Inquiry">
            <Subtitle>Email</Subtitle>
            <Text>Any questions or concerns can be directed to <Highlight>hwanderlustdev@gmail.com</Highlight>.</Text>
          </Link>
        </section>

        <section>
          <Link href="https://github.com/hwanderlust">
            <Subtitle>GitHub</Subtitle>
            <Text>Any requests or issues can be directed to <Highlight>github.com/hwanderlust</Highlight>.</Text>
          </Link>
        </section>
      </Container>

      <MenuBtnFloating />

      <DisclosureGrid />
    </GridLayout>
  );
}

export default Contact;