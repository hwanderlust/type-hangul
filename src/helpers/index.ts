import { keyframes } from "styled-components";

export interface StyledProps {
  className?: string;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export { fadeIn };