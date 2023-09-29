import {Component} from "react";
import {styled} from "styled-components";
import {ProfileData} from "../../../pages/Profile";
import {ActionItemType} from "./ActionItem";
import VCFAction from "./ActionItems/VCFAction";
import {MapAction} from "./ActionItems/MapAction/MapAction";
import ScheduleAction from "./ActionItems/ScheduleAction";
import AtlasAction from "./ActionItems/AtlasAction";

const Container = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  margin: -5px 20px 20px;


`;

interface IProps {
    data: ProfileData
}

interface IState {
}

export default class ActionColumn extends Component<IProps, IState> {

    data: ProfileData;
    private readonly items: Array<ActionItemType>

    constructor(props: {data: any}) {
        super(props);
        this.data = this.props.data;

        this.items = [
            AtlasAction,
            MapAction,
            ScheduleAction,
            VCFAction
        ];

    }

    loadActionItems() {
        const actionItems = [];

        for (let Component of this.items) {

            actionItems.push(
                <Component
                    key={Math.random().toString()}
                    data={this.data}
                />
            )

        }

        return actionItems;

    }

    render() {

        const items = this.loadActionItems();

        if (items.length < 1) {
            return <div />
        }

        return (
            <Container>
                {items}
            </Container>
        );
    }


}
