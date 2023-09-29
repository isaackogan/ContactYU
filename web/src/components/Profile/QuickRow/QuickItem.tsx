import {ProfileData} from "../../../pages/Profile";
import {Component} from "react";
import {styled} from "styled-components";

interface IProps {
    data: ProfileData
    key: string
}

interface IState {
}

const Container = styled.div`
  border-radius: 500px;
  width: 40px;
  height: 40px;
  background: var(--text-dark-1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    filter: brightness(0.9);
  }
  
  &:active {
    filter: brightness(0.85);
  }
  
  margin-right: 15px;
  &:last-child {
    margin-right: 0 !important;
  }
  
`;

const IconImage = styled.img`
  width: 50%;
  height: 50%;
  filter: invert(1);
`;

export abstract class QuickItem extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <Container onClick={this.onClick.bind(this)}>
                <IconImage
                    src={this.iconUrl}
                    alt={this.iconUrl}
                />
            </Container>
        );
    }

    abstract iconUrl: string;
    abstract onClick(): void;

}

