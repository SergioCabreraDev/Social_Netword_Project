import { Timestamp } from "rxjs";

export class User {
    user_id!: number;
    username!: string;
    email!: string;
    password!: string;
    profilePicture!: string;
    bio!: string;
    createdAt!: any;
    configuration!: Configuration;
}

export class Credentials {
    email!: string;
    password!: string;
}

export class Configuration {
    config_id!: number;
    theme: string = 'dark';
}