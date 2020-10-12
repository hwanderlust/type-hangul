import React, { useCallback, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { Fonts, Game, Sizes, } from "../../helpers";
import groundPng from "../../images/ground.png";
import bubblePng from "../../images/bubble.png";
import { Keyboard, MenuBtn } from "../common";
import Display from "./Display";

const noOp = () => { };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1vmin;
`;
const Header = styled.section`
  align-self: flex-start;
  margin-left: 5vmin;
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

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
`;
const Item = styled.li`
  font-size: ${Sizes.variable.font.medium};
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-family: ${Fonts.playfair};

  &:focus {
    text-decoration: underline;
    text-decoration-color: black;
    outline: none;
  }

  &:hover {
    color: white;
  }
`;

function isNotAGame(param: string): boolean {
  const type = param.toLowerCase();
  return type.localeCompare("run") !== 0
    && type.localeCompare("pop") !== 0
    && type.localeCompare("jump") !== 0;
}

function Page404({ type }: { type: string }) {
  return (
    <Main>
      <h1>Oops! "{type}" isn't a game we have. Please select from one of our games below.</h1>
      <List>
        <Item><StyledLink to="/game/run">Run</StyledLink></Item>
        <Item><StyledLink to="/game/pop">Pop</StyledLink></Item>
        <Item><StyledLink to="/game/jump">Jump</StyledLink></Item>
      </List>
    </Main>
  )
}

// https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const ryansWidthToHeightRatio = 1.8;
function calcRyansSize(width: number): [number, number] {
  return [width, width * ryansWidthToHeightRatio];
}
function drawRyan(context: CanvasRenderingContext2D, width: number, height: number, baseWidth: number): void {
  const ryan = new Image();
  const svg = document.getElementById("ryan");

  let xml = new XMLSerializer().serializeToString(svg!);   // get svg data
  let svg64 = btoa(xml);                         // make it base64
  let b64Start = 'data:image/svg+xml;base64,';
  let image64 = b64Start + svg64;                // prepend a "header"
  ryan.src = image64;

  const [ryansWidth, ryansHeight] = calcRyansSize(baseWidth);
  ryan.onload = () => {
    context.drawImage(ryan, (width / 2) - (ryansWidth / 2), height - ryansHeight - 10, ryansWidth, ryansHeight);
  };
}

function drawGround(context: CanvasRenderingContext2D, width: number, height: number): void {
  const ground = new Image();
  ground.src = groundPng;
  ground.onload = () => {
    context.drawImage(ground, 10, height - 50, width - 20, 20);
  };
}

function drawBubble(context: CanvasRenderingContext2D): void {
  const bubble = new Image();
  bubble.src = bubblePng;

  bubble.onload = () => {
    context.drawImage(bubble, 300, 50);
    context.fillStyle = "black";
    context.font = `16px 'Roboto'`;
    context.fillText("싫은데", 300 + 25, 50 + 55);
  };
}

function createBubble(context: CanvasRenderingContext2D) {
  const bubble = new Path2D();
  bubble.arc(400, 300, 50, 0, 2 * Math.PI);
  context.fillStyle = "#ADD4F9";
  context.fill(bubble);

  context.font = "16px Roboto";
  context.fillStyle = "black";
  context.fillText("싫은데", 375, 305);
  context.fill();
}

function drawCloud1(context: CanvasRenderingContext2D, x: number, y: number) {
  const cloud = new Image();
  const svg = document.getElementById("cloud1");

  let xml = new XMLSerializer().serializeToString(svg!);   // get svg data
  let svg64 = btoa(xml);                         // make it base64
  let b64Start = 'data:image/svg+xml;base64,';
  let image64 = b64Start + svg64;                // prepend a "header"
  cloud.src = image64;

  cloud.onload = () => {
    context.drawImage(cloud, x, y, 100, 75);
  };
}
function drawCloud2(context: CanvasRenderingContext2D, x: number, y: number) {
  const cloud = new Image();
  const svg = document.getElementById("cloud2");

  let xml = new XMLSerializer().serializeToString(svg!);   // get svg data
  let svg64 = btoa(xml);                         // make it base64
  let b64Start = 'data:image/svg+xml;base64,';
  let image64 = b64Start + svg64;                // prepend a "header"
  cloud.src = image64;

  cloud.onload = () => {
    context.drawImage(cloud, x, y, 100, 75);
  };
}
function drawCloud3(context: CanvasRenderingContext2D, x: number, y: number) {
  const cloud = new Image();
  const svg = document.getElementById("cloud3");

  let xml = new XMLSerializer().serializeToString(svg!);   // get svg data
  let svg64 = btoa(xml);                         // make it base64
  let b64Start = 'data:image/svg+xml;base64,';
  let image64 = b64Start + svg64;                // prepend a "header"
  cloud.src = image64;

  cloud.onload = () => {
    context.drawImage(cloud, x, y, 100, 75);
  };
}

function drawCon(context: CanvasRenderingContext2D, signText: string, x: number = 0, y: number = 0) {
  const con = new Image();
  const svg = document.getElementById("con");

  const sign = document.getElementById("box")!;
  const div = sign.firstElementChild! as HTMLElement;
  div.innerHTML = `<span>${signText}</span>`;

  let xml = new XMLSerializer().serializeToString(svg!);   // get svg data
  // https://stackoverflow.com/questions/23223718/failed-to-execute-btoa-on-window-the-string-to-be-encoded-contains-characte
  let svg64 = btoa(unescape(encodeURIComponent(xml)));                         // make it base64
  let b64Start = 'data:image/svg+xml;base64,';
  let image64 = b64Start + svg64;                // prepend a "header"
  con.src = image64;

  con.onload = () => {
    context.drawImage(con, x, y);
  };
}

interface Params {
  type: Game;
}

function Controller() {
  const params: Params = useParams();
  const [windowWidth, windowHeight] = useWindowSize();
  const width = (windowWidth || window.innerWidth) * 0.75;
  const height = (windowHeight || window.innerHeight) * 0.5;

  const canvas = useCallback((node: HTMLCanvasElement) => {
    if (node !== null) {
      const ctx = node.getContext("2d")!;
      ctx.imageSmoothingEnabled = false;

      drawCloud1(ctx, width * 0.2, 100);
      drawCloud2(ctx, width * 0.5, 30);
      drawCloud3(ctx, width * 0.8, 60);
      drawGround(ctx, width, height);
      drawBubble(ctx);
      createBubble(ctx);
      drawRyan(ctx, width, height, 75);
      drawCon(ctx, "난 심심해");
      drawCon(ctx, "뭐라고", 100, 100);
    }
  }, [width, height]);

  if (isNotAGame(params.type)) {
    return <Page404 type={params.type} />;
  }

  return (
    <Container>
      <Header>
        <h1>{params.type}</h1>
        <p>Game Description</p>
      </Header>
      <Display canvas={canvas} width={width} height={height} />
      <Keyboard onKeyPress={noOp} />

      <MenuBtnFloating />
    </Container>
  );
}

export default Controller;