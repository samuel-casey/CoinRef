interface IOfficialLinks {
    name: string;
    link: string;
}

export default interface ICoinProfileData {
    id: string;
    profile: {
        general: {
            overview: {
                official_links: IOfficialLinks[];
                project_details: string;
            },
            background: {
                background_details: string;
            }
        }
    };
    name: string;
}
