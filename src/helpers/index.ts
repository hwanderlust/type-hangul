import { keyframes } from "styled-components";

export type Game = "run" | "pop" | "jump";

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

const ALL_KEYS = [
  { eng: "q", shift: "ㅃ", kor: "ㅂ" },
  { eng: "w", shift: "ㅉ", kor: "ㅈ" },
  { eng: "e", shift: "ㄸ", kor: "ㄷ" },
  { eng: "r", shift: "ㄲ", kor: "ㄱ" },
  { eng: "t", shift: "ㅆ", kor: "ㅅ" },
  { eng: "y", shift: "", kor: "ㅛ" },
  { eng: "u", shift: "", kor: "ㅕ" },
  { eng: "i", shift: "", kor: "ㅑ" },
  { eng: "o", shift: "ㅒ", kor: "ㅐ" },
  { eng: "p", shift: "ㅖ", kor: "ㅔ" },
  { eng: "a", shift: "", kor: "ㅁ" },
  { eng: "s", shift: "", kor: "ㄴ" },
  { eng: "d", shift: "", kor: "ㅇ" },
  { eng: "f", shift: "", kor: "ㄹ" },
  { eng: "g", shift: "", kor: "ㅎ" },
  { eng: "h", shift: "", kor: "ㅗ" },
  { eng: "j", shift: "", kor: "ㅓ" },
  { eng: "k", shift: "", kor: "ㅏ" },
  { eng: "l", shift: "", kor: "ㅣ" },
  { eng: "z", shift: "", kor: "ㅋ" },
  { eng: "x", shift: "", kor: "ㅌ" },
  { eng: "c", shift: "", kor: "ㅊ" },
  { eng: "v", shift: "", kor: "ㅍ" },
  { eng: "b", shift: "", kor: "ㅠ" },
  { eng: "n", shift: "", kor: "ㅜ" },
  { eng: "m", shift: "", kor: "ㅡ" },
];

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export { ALL_KEYS, Fonts, Sizes, fadeIn };