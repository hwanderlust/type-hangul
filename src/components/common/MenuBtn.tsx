import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Fonts, StyledProps } from "../../helpers";
import icon from "../../images/apeach-btn.png";

interface WindowProps {
  numOfItems: number;
}
const Window = styled.div<WindowProps>`
  width: 100px;
  display: flex;
  justify-content: center;
  position: absolute;
  height: ${props => props.numOfItems * 30}px;
`;
const TopWindow = styled(Window)`
  bottom: 100%;
`;
const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const Button = styled.button`
  width: 100px;
  height: 100px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  filter: drop-shadow(1px 0 10px #000);
  
  &:focus {
    border: 1px solid white;
    outline: none;
  }

  @media only screen and (max-width: 720px) {
    width: 50px;
    height: 50px;
  }
`;
const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

const topOptions = ["run", "pop", "jump"];
const bottomOptions = ["about", "contact"];
const MenuOption = styled(Link)`
  font-family: ${Fonts.playfair};
  font-size: 12px;
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  filter: drop-shadow(1px 0 5px #000);

  &:hover {
    color: black;
  }
`;

interface State {
  isOpen: boolean;
}

class MenuBtn extends React.Component<StyledProps, State> {
  private btn: React.RefObject<HTMLButtonElement>;

  constructor(props: StyledProps) {
    super(props);
    this.state = { isOpen: false };
    this.btn = React.createRef();
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    this.setState((prevState: State) => ({ isOpen: !prevState.isOpen }));
    (this.btn.current as HTMLButtonElement).blur();
  }

  render() {
    return (
      <div {...this.props}>
        {this.state.isOpen && (
          <TopWindow numOfItems={topOptions.length}>
            <List>
              {topOptions.map(option => <MenuOption to={`/game/${option}`} key={`top-${option}`}>{option}</MenuOption>)}
            </List>
          </TopWindow>
        )}

        <Button ref={this.btn} onClick={this.handleClick}>
          <Icon src={icon} alt="Kakao Friends' Apeach smiling - as a menu icon/button" />
        </Button>

        {this.state.isOpen && (
          <Window numOfItems={bottomOptions.length}>
            <List>
              {bottomOptions.map(option => <MenuOption to={`/${option}`} key={`bottom-${option}`}>{option}</MenuOption>)}
            </List>
          </Window>
        )}
      </div>
    );
  }
}

export default MenuBtn;