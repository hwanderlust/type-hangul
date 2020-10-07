import { keyframes } from "styled-components";

export type Game = "run" | "pop" | "jump";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export { fadeIn };