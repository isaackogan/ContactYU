import {ContactItem, isMobile} from "../ContactItem";
import {formatNumber} from "./ContactMobile";

export class ContactWork extends ContactItem {

    iconUrl = "/icons/phone.svg";
    requiresKey = "work";

    callWork(number: string, extension: string | undefined) {
        let base = `tel:${number}`;
        if (extension) base += `,${extension}`

        try {
            window.location.href = base;
        } catch(ex) {

        }
    }

    async onClick() {

        if (isMobile()) {
            this.callWork(this.props.data.work || "", this.props.data.work_ext);
        } else {
            await this.executeCopy(formatNumber(this.props.data.work || "", this.props.data.work_ext));
        }

    }

    getDisplayText(): string {
        return formatNumber(this.props.data.work || "", this.props.data.work_ext)
    }

}
