import { User } from "./User";

export class Post {
    postId!: number;
    content!: string;
    imageUrl!: string;
    createdAt!: any;
    user!: User;
    likes!: Likes[];
    likedByCurrentUser!: boolean; // Asegúrate de inicializar
    timeAgo?: string; 
  }

export class Likes{

    like_id!: number;
    user!: User;
    liked_at!: string;

}

export class LikesDTO{
  like_id!:number
  user_id!: number;
  post_id!: number;
}