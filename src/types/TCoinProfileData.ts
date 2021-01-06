type TOfficialLinks = {
    name: string;
    link: string;
}

export type TCoinProfileData = {
    id: string;
    profile: {
        general: {
            overview: {
                official_links: TOfficialLinks[];
                project_details: string;
            },
            background: {
                background_details: string;
            }
        }
    };
    name: string;
}
