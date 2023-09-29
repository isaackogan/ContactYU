import {ContactItem, isMobile} from "../ContactItem";

export class ContactEmail extends ContactItem {

    iconUrl = "/icons/email.svg";
    requiresKey = "email";

    openEmail() {
        try {
            window.location.href = `mailto:${this.props.data.email}`;
        } catch(ex) {
        }
    }

    async onClick() {
        const email = this.props.data.email || "";

        if (isMobile()) {
            this.openEmail();
        } else {
            await this.executeCopy(email);
        }

    }

}
