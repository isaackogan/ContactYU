import {ActionItem} from "../ActionItem";

export default class VCFAction extends ActionItem {

    iconUrl: string = "/icons/download-red.svg";
    requiresKeys = null;
    isPrimary = true;

    buildCard() {

        let cardArgs = [
            "BEGIN:VCARD",
            "VERSION:4.0"
        ]

        if (this.data.first_name && this.data.last_name) {
            cardArgs.push("FN:" + this.data.first_name + " " + this.data.last_name);
        }

        if (this.data.mobile) {
            cardArgs.push("TEL;TYPE=cell:" + this.data.mobile);
        }

        if (this.data.work) {
            let ext = this.data.work_ext ? `,${this.data.work_ext}` : '';
            cardArgs.push("TEL;TYPE=work:" + this.data.work + ext);
        }

        if (this.data.email) {
            cardArgs.push("EMAIL:" + this.data.email)
        }

        cardArgs.push("END:VCARD");

        return cardArgs.join("\n");

    }

    onClick() {

        let blob = new Blob([this.buildCard()], { type: "text/vcard" });
        let url = URL.createObjectURL(blob);

        const newLink = document.createElement('a');
        newLink.download = this.data.first_name + ".vcf";
        newLink.textContent = this.data.first_name || null;
        newLink.href = url;

        newLink.click();

    }

    getDisplayText(): string {
        return "Download Contact"
    }


}
