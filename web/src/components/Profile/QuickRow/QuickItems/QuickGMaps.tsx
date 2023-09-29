import {QuickItem} from "../QuickItem";

export class QuickGMaps extends QuickItem {

    iconUrl: string = "/icons/maps.svg";

    buildQuery(): string {

        return (
            `https://maps.google.com/?q=${encodeURIComponent(this.props.data.address || '')})}`
        )
    }

    onClick() {
        window.open(
            this.buildQuery()
        )
    }

}
