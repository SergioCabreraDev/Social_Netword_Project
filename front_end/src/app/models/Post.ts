import { User } from "./User";

export class Post{

    post_id!: number;
    content!: string;
    imageUrl!: string;
    createdAt!: any;
    user!: User;
    timeAgo?: string; // Agregas la propiedad timeAgo

}