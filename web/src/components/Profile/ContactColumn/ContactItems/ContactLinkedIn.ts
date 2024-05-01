import {ContactItem, IContactProps} from "../ContactItem";

export class ContactLinkedIn extends ContactItem {

    iconUrl = "/icons/linkedin.svg";
    requiresKey = "linkedin";

    private readonly displayText: string;
    private readonly linkedInUrl: string;

    constructor(
        props: IContactProps,
    ) {
        super(props);

        let linkedInUrl = this.linkedInUrl = props.data.linkedin as string || "";
        let urlIndex = linkedInUrl.indexOf(".com");

        if (urlIndex) {
            this.displayText = linkedInUrl.substring(urlIndex + 4);
        } else {
            this.displayText = linkedInUrl;
        }
    }

    async onClick() {
        window.open(this.linkedInUrl)
    }

    getDisplayText(): string {
        return this.displayText;
    }

}
