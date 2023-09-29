import {IContactProps} from "../../../ContactColumn/ContactItem";
import MapModal, {IDetail} from "./MapModal";
import React from "react";
import {ActionItem, IActionProps, IActionState} from "../../ActionItem";


interface IState extends IActionState {
    modalEnabled: boolean
}

export class MapAction extends ActionItem<IActionProps, IState> {

    iconUrl: string = "/icons/maps-red.svg";
    requiresKeys: string[] | null = ["first_name", "address"];
    isPrimary: boolean = false;

    modalId: string = "mapModal";

    constructor(props: IContactProps) {
        super(props);
        this.state = {modalEnabled: false};
    }

    onClick() {
        this.toggleModal();
    }

    toggleModal() {
        this.setState({modalEnabled: !this.state.modalEnabled});
    }

    onModalToggle(event: Event): void {
        let detail: IDetail = (event as CustomEvent<IDetail>).detail

        if (detail.id !== this.modalId) {
            return;
        }

        this.toggleModal();
    }

    componentDidMount() {
        document.removeEventListener("toggleModal", this.onModalToggle);
        document.addEventListener("toggleModal", this.onModalToggle.bind(this));
    }

    getExtraFragments(): React.JSX.Element | null {
        return (
            <MapModal
                modalId={this.modalId}
                data={this.props.data}
                active={this.state.modalEnabled}
            />
        )
    }

    getDisplayText(): string {
        return "VIEW OFFICE LOCATION"
    }


}
