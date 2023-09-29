import {ProfileData} from "../../../../../pages/Profile";
import {styled} from "styled-components";
import {Component, SyntheticEvent} from "react";
import MapItem from "./MapItem";
import QuickRow from "../../../QuickRow/QuickRow";
import {QuickGoogle} from "../../../QuickRow/QuickItems/QuickGoogle";
import {QuickGMaps} from "../../../QuickRow/QuickItems/QuickGMaps";

interface IProps {
    data: ProfileData
    active: boolean,
    modalId: string
}

interface IState {
    active: boolean
}

const ModalOverlay = styled.div`
  background: rgba(54, 54, 54, 0.68);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActionMenu = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const ActionSubMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ModalTitle = styled.span`
  font-weight: bold;
  font-size: 24px;
`;

const ModalSubTitle = styled.span`
  font-weight: normal;
  display: block;
  font-size: 16px;
  margin-top: 5px;
`;

const ModalExit = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.7;
  }
`;

const ModalContent = styled.div`
  width: 85%;
  max-width: 600px;
  background: var(--container-primary);
  border-radius: 15px;
  padding: 20px;
`;

const MapContainer = styled.div`
  height: 300px;
  background: var(--container-secondary);
  border-radius: 10px;
  margin-top: 20px;
`;

export interface IDetail {
    id: string
}

export default class MapModal extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    onClick(event: SyntheticEvent<HTMLElement>) {
        let target = event.target as HTMLElement

        const overlayClicked: boolean = (
            target.classList.contains("modalOverlay")
        );

        const exitClicked: boolean = (
            target.classList.contains("exitButton")
        )

        if (!(overlayClicked || exitClicked)) {
            return;
        }

        document.dispatchEvent(
            new CustomEvent<IDetail>(
                'toggleModal',
                {detail: {id: this.props.modalId}}
            )
        );

    }

    render() {

        if (!this.props.active) {
            return null;
        }

        return (
            <ModalOverlay onClick={this.onClick.bind(this)} className={"modalOverlay"}>
                <ModalContent>
                    <ActionMenu>
                        <ActionSubMenu>
                            <ModalTitle>
                                {this.props.data.first_name}'s Building
                                <ModalSubTitle>
                                    {this.props.data.address}
                                </ModalSubTitle>
                            </ModalTitle>
                            <ModalExit className={"exitButton"} src={"/icons/x-icon.svg"} onClick={this.onClick.bind(this)}/>
                        </ActionSubMenu>
                        <QuickRow
                            data={this.props.data}
                            items={[
                                QuickGoogle,
                                QuickGMaps
                            ]}
                        />
                    </ActionMenu>
                    {this.props.data.address && this.props.data.building && (
                        <MapContainer>
                            <MapItem data={this.props.data} />
                        </MapContainer>
                    )}
                </ModalContent>
            </ModalOverlay>
        )

    }


}
