import {ActionItem} from "../ActionItem";

export default class AtlasAction extends ActionItem {

    template: string = "https://atlas.cafe.uit.yorku.ca/atlas/servlet/atlas/action/AtlasAction/template/person.vm" +
        "?eventsubmit_doperson=Person&searchp=";

    iconUrl: string = "/icons/atlas-red.svg";
    requiresKeys = ["atlas_id"];
    isPrimary = false;

    onClick() {
        window.open(this.template + this.props.data.atlas_id);
    }

    getDisplayText(): string {
        return "VIEW ATLAS PROFILE"
    }


}
