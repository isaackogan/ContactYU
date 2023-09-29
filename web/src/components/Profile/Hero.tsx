import {Component} from "react";
import {styled} from "styled-components";
import {ProfileData} from "../../pages/Profile";

const Container = styled.div`
  display: flex;
  margin: 20px;
  padding: 16px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  background: var(--container-primary);
  box-shadow: var(--container-shadow);

`;

const ProfileImage = styled.div<{ $url: string; }>`
  width: 120px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: url("${props => props.$url}"), rgba(227, 24, 55, 0.3);
  background-size: cover;
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 5px;
  width: 100%;
`;

const ProfileName = styled.span`
  font-weight: bold;
  font-size: 20px;
  color: var(--text-dark-1);
  
  @media(min-width: 600px) {
    font-size: 23px;
  }
`;

const ProfilePosition = styled.span`
  font-size: 13px;
  color: var(--text-dark-2);

  @media(min-width: 600px) {
    font-size: 16px;
  }
  
`;

interface IProps {
    data: ProfileData
}

interface IState {
}

export default class Hero extends Component<IProps, IState> {

    data: ProfileData;

    constructor(props: {data: any}) {
        super(props);
        this.data = this.props.data;
    }

    render() {

        const url: string = this.data.image_url || "";
        console.log(url)
        return (
            <Container>
                <ProfileImage $url={url} />
                <ProfileText>
                    <ProfileName>{this.data.first_name} {this.data.last_name}</ProfileName>
                    <ProfilePosition>{this.data.title}</ProfilePosition>
                </ProfileText>
            </Container>
        );
    }


}
