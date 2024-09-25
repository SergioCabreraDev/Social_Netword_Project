import { Timestamp } from "rxjs";

export class User {
    user_id!: number;
    username!: string;
    email!: string;
    password!: string;
    profilePicture!: string;
    bio!: string;
    createdAt!: any;
    config!: Config;
}

export class Credentials {
    email!: string;
    password!: string;
}

export class Config {
    id!: number;
    theme: string = 'dark';

}