import {Component} from "react";
import {styled} from "styled-components";

const Container = styled.div`
  background: var(--york-red);
  display: flex;
  padding: 15px 25px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px 2px rgba(133, 14, 14, 0.63);

`;

const Logo = styled.img`
  width: 125px;
  filter: drop-shadow(2px 1px var(--york-red-dark-less));
`;

const HeaderText = styled.span`
  color: var(--white);
  font-weight: 500;
  text-shadow: 1px 1px var(--york-red-dark-less);
  font-size: 20px;
`;

export default class Header extends Component {

    render() {
        return (
            <Container>
                <Logo src={"/images/logo-white-2.png"} />
                <HeaderText>
                    ContactYU
                </HeaderText>
            </Container>
        );
    }

}
