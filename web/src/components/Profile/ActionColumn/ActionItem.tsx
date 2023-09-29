import {ProfileData} from "../../../pages/Profile";
import React, {Component} from "react";
import {styled} from "styled-components";

export interface IActionProps {
    data: ProfileData,
    key: string,
    requiredKey?: string
}

export interface IActionState {

}

const ActionContainer = styled.div<{ $primary?: boolean; }>`
  border-radius: 10px;

  align-items: center;
  cursor: pointer;
  user-select: none;
  display: flex;
  padding: 5px 6px;
  border: 2px solid var(--york-red);
  box-shadow: var(--container-shadow);
  
  font-weight: 500;

  color: var(--${props => props.$primary ? 'white' : 'york-red'});
  background: ${props => props.$primary ? 'var(--york-red)' : 'var(--container-primary)'};

  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    filter: brightness(0.95);
  }

`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-shrink: 0;
 
`;

const IconImage = styled.img<{ $primary?: boolean; }>`
  width: 60%;
  height: 60%;
  filter: ${props => props.$primary ? 'brightness(100)' : 'unset'};
`;

const ItemText = styled.span`
  display: inline-block;
  width: inherit;
  overflow-wrap: break-word;
  overflow: auto;
  font-size: 15px;

`;

export type ActionItemType<P extends IActionProps = IActionProps, S extends IActionState = IActionState> =
    new (props: P) => ActionItem<P, S>;

export abstract class ActionItem<P extends IActionProps = IActionProps, S extends IActionState = IActionState>
    extends Component<P, S> {

    readonly data: ProfileData;

    constructor(props: P) {
        super(props);
        this.data = this.props.data;
    }

    hasRequiredKeys() {
        if (!this.requiresKeys) {
            return true;
        }

        for (let key of this.requiresKeys) {
            if (!this.data?.[key]) {
                return false;
            }
        }

        return true;

    }

    render() {

        if (!this.hasRequiredKeys()) {
            return null;
        }

        return (
            <>
                {this.getExtraFragments()}
                <ActionContainer $primary={this.isPrimary} onClick={this.onClick.bind(this)}>
                    <IconContainer>
                        <IconImage
                            $primary={this.isPrimary}
                            src={this.iconUrl}
                            alt={this.iconUrl}
                        />
                    </IconContainer>
                    <ItemText>{this.getDisplayText().toUpperCase()}</ItemText>
                </ActionContainer>
            </>
        );
    }

    abstract iconUrl: string;
    abstract requiresKeys: Array<string> | null;
    abstract isPrimary: boolean;
    abstract onClick(): void;

    getExtraFragments(): React.JSX.Element | null {
        return null;
    }

    getDisplayText(): string {

        if (!this.requiresKeys) {
            return "";
        }

        let result = this.data?.[this.requiresKeys[0]];

        if (typeof result !== 'string') {
            return "";
        }

        return result;

    };

}

