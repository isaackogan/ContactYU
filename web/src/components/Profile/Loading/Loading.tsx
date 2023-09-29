import {Component} from "react";
import {styled} from "styled-components";
import LoadRing from "./LoadRing";

const Container = styled.div`
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition-duration: 100ms;
`;

const LoadText = styled.span`
  font-weight: bold;
  color: var(--york-red);
  font-size: 30px;
  text-align: center;
  margin-bottom: 15px;
`;

export default class Loading extends Component {

    render() {
        return (
            <Container style={{animation: "fadeIn 1000ms"}}>
                <LoadText>Loading Profile...</LoadText>
                <LoadRing/>
            </Container>
        );
    }

}
