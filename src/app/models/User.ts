export class User {
    uid: string
    username: string
    first_name: string
    last_name: string
    branch: string
    email: string
    study_year: string
    profile_img_url: string
    created_at: string
    last_seen: string


    constructor(
        uid: string,
        username: string,
        first_name: string,
        last_name: string,
        branch: string,
        email: string,
        study_year: string,
        profile_img_url: string,
        created_at: string,
        last_seen: string) {
        this.uid = uid
        this.username = username
        this.first_name = first_name
        this.last_name = last_name
        this.branch = branch
        this.email = email
        this.study_year = study_year
        this.profile_img_url = profile_img_url
        this.created_at = created_at
        this.last_seen = last_seen

    }
}