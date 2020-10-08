import { keyframes } from "styled-components";

export interface StyledProps {
  className?: string;
}

const Fonts = {
  playfair: "'Playfair Display', serif",
  nanum: "'Nanum Pen Script', cursive",
  roboto: "'Roboto', serif",
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export { Fonts, fadeIn };