import { keyframes } from "styled-components";

export type Game = "pop" | "jump";

export interface StyledProps {
  className?: string;
}

export interface KeyType {
  eng: string;
  shift: string;
  kor: string;
}

const Fonts = {
  playfair: "'Playfair Display', serif",
  nanum: "'Nanum Pen Script', cursive",
  roboto: "'Roboto', serif",
}

const Sizes = {
  variable: {
    font: {
      xSmall: "calc(8px + (12 - 8) * ((100vw - 300px) / (1440 - 300)))",
      small: "calc(12px + (16 - 12) * ((100vw - 300px) / (1440 - 300)))",
      medium: "calc(24px + (36 - 24) * ((100vw - 300px) / (1440 - 300)))",
      large: "calc(36px + (72 - 36) * ((100vw - 300px) / (1440 - 300)))",
    },
  },
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export { Fonts, Sizes, fadeIn };