import React, {Component} from "react";
import {styled} from "styled-components";
import {ProfileData} from "../../../pages/Profile";
import {QuickItem} from "./QuickItem";

const Container = styled.div`
  display: flex;
  border-radius: 10px;
  justify-content: left;
  align-items: center;
`;

interface IProps {
    data: ProfileData,
    items: Array<typeof QuickItem>
}

interface IState {
}

export default class QuickRow extends Component<IProps, IState> {

    data: ProfileData;
    private readonly items: Array<any>

    constructor(props: IProps) {
        super(props);
        this.data = this.props.data;
        this.items = this.props.items;
    }

    loadQuickItems(): React.JSX.Element | null {
        const quickItems = [];

        for (let Component of this.items) {

            quickItems.push(
                <Component
                    key={Math.random().toString()}
                    data={this.data}
                />
            )

        }

        if (quickItems.length < 1) {
            return null;
        }

        return (
            <>
                {quickItems}
            </>
        );

    }

    render() {

        const items = this.loadQuickItems();
        if (!items) return <div />

        return (
            <Container>
                {items}
            </Container>
        );
    }


}
