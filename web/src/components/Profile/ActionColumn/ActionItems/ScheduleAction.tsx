import {ActionItem} from "../ActionItem";

export default class ScheduleAction extends ActionItem {

    iconUrl: string = "/icons/calendar-red.svg";
    requiresKeys = ["ms_bookings_url"];
    isPrimary = false;

    onClick() {
        window.open(this.props.data.ms_bookings_url);
    }

    getDisplayText(): string {
        return "SCHEDULE APPOINTMENT"
    }


}
