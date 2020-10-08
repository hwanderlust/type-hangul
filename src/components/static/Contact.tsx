import React from "react";
import styled from "styled-components";

import { Disclosure, Logo, MenuBtn } from "../common";

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: calc(36px + (72 - 36) * ((100vw - 300px) / (1440 - 300)));
  font-weight: 400;
`;

function Contact() {
  return (
    <>

      <Title>Contact</Title>

      <Logo />
      <MenuBtn />

      <h2>Email</h2>
      <p>Any questions or concerns can be directed to <span>hwanderlustdev@gmail.com</span>.</p>

      <h2>GitHub</h2>
      <p>Any requests or issues can be directed to <span>github.com/hwanderlust</span>.</p>

      <Disclosure />
    </>
  );
}

export default Contact;