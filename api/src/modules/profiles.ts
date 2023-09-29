const defaultProfile = require("../../public/data.json").default;

export function profileDefaults(profile: ProfileData): ProfileData {

    for (let key of Object.keys(defaultProfile)) {

        if (profile[key] == null) {
            profile[key] = defaultProfile[key] || null;
        }

    }

    return profile;
}


export function processNumber(rawNumber: string): [string | undefined, string | undefined] {

    let num: string | undefined;
    let ext: string | undefined;

    // Replace +1 Code
    if (rawNumber.startsWith("+1")) {
        rawNumber = rawNumber.replace("+1", "");
    }

    // Destruct number
    if (rawNumber.includes("+")) {
        [num, ext] = rawNumber.split("+");
    } else {
        [num, ext] = rawNumber.split("ext");
    }

    // Clean up
    return (
        [
            num?.replace(/\D+/g, ''),
            ext?.replace(/\D+/g, '')
        ]
    )

}


export function processPhone(profile: ProfileData): ProfileData {

    if (profile.mobile) {
        const [num, _] = processNumber(profile.mobile); // Assumption: Mobile has no ext.
        profile.mobile = num;
    }

    if (profile.work) {
        const [num, ext] = processNumber(profile.work);
        profile.work = num;
        if (ext) profile.work_ext = ext;
    }

    return profile;

}

export interface ProfileData {
    address?: string,
    building?: string,
    atlas_id?: number,
    email?: string,
    first_name?: string,
    image_url?: string,
    last_name?: string,
    mobile?: string,
    ms_bookings_url?: string,
    title?: string,
    work?: string,
    work_ext?: string,
    [key: string]: boolean | number | string | null | undefined
}
