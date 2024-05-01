import {Component} from "react";
import {styled} from "styled-components";
import {ProfileData} from "../../../pages/Profile";
import {ContactWork} from "./ContactItems/ContactWork";
import {ContactMobile} from "./ContactItems/ContactMobile";
import {ContactEmail} from "./ContactItems/ContactEmail";
import {ContactItemType} from "./ContactItem";
import {ContactLinkedIn} from "./ContactItems/ContactLinkedIn";

const Container = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  margin: 20px;
`;

interface IProps {
    data: ProfileData
}

interface IState {
}

export default class ContactColumn extends Component<IProps, IState> {

    data: ProfileData;
    private readonly items: Array<ContactItemType>

    constructor(props: {data: any}) {
        super(props);
        this.data = this.props.data;

        this.items = [
            ContactWork,
            ContactMobile,
            ContactLinkedIn,
            ContactEmail,
        ]
    }

    loadContactItems() {
        const contactItems = [];

        for (let Component of this.items) {

            contactItems.push(
                <Component
                    key={Math.random().toString()}
                    data={this.data}
                />
            )

        }

        return contactItems;

    }

    render() {

        const items = this.loadContactItems();

        if (items.length < 1) {
            return <div />
        }

        return (
            <Container>{items}</Container>
        );
    }


}
