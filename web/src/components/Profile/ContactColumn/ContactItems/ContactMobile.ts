import {ContactItem, isMobile} from "../ContactItem";

export class ContactMobile extends ContactItem {

    iconUrl = "/icons/cell.svg";
    requiresKey = "mobile";

    callMobile(number: string) {
        try {
            window.location.href = `tel:${number}`;
        } catch(ex) {
        }
    }

    async onClick() {
        let mobile: string = this.props.data.mobile || "";

        if (isMobile()) {
            this.callMobile(mobile);
        } else {
            await this.executeCopy(mobile);
        }

    }

    getDisplayText(): string {
        return formatNumber(this.props.data.mobile || "")
    }

}

export function formatNumber(number: string, ext?: string) {

    const [p1, p2, p3] = [
        number.substring(0, 3),
        number.substring(3, 6),
        number.substring(6)
    ]

    let p4 = ext ? ` +${ext}` : ''
    return `(${p1}) ${p2}-${p3}` + p4;

}
