import {Component} from "react";
import {styled} from "styled-components";
import Header from "../components/Header";


const Container = styled.div`
  width: 100%;
`;

const ActionMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  flex-direction: column;
  background: var(--container-primary);
  margin: 50px auto;
  padding: 25px;
  border-radius: 15px;
`;

const ActionTitle = styled.div`
  color: var(--york-red);
  font-weight: bold;
  font-size: 25px;
  
  @media(min-width: 500px) {
    font-size: 35px;
  }
  
`;

const AtlasButton = styled.a`
  text-decoration: none;
  padding: 10px 30px;
  text-align: center;
  color: var(--white);
  background: var(--york-red);
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition-duration: 100ms;

  &:hover {
    background: var(--york-red-dark-less);
  }
  
`;

const AtlasIcon = styled.img`
  margin-right: 15px;
  width: 20px;
  height: 20px;
  filter: brightness(100);
`;

export default class Home extends Component {

    render() {

        return (
            <Container>
                <Header/>
                <ActionMenu>
                    <ActionTitle>ContactYU</ActionTitle>
                    <AtlasButton href={"https://atlas.yorku.ca/"}>
                        <AtlasIcon src={"/icons/atlas-red.svg"}/>
                            Search YorkU Atlas
                        </AtlasButton>
                </ActionMenu>
            </Container>
        )

    }

}
