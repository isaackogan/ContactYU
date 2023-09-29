import {QuickItem} from "../QuickItem";

export class QuickGoogle extends QuickItem {

    iconUrl: string = "/icons/browser.svg";

    buildQuery(): string {
        return (
            `https://www.google.com/search?q=${encodeURIComponent(
                this.props.data.address || "")}`
        )
    }

    onClick() {
        window.open(
            this.buildQuery()
        )
    }

}
