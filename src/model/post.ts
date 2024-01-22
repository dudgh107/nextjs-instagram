
export type Comment = {
    comment: string;
    username: string;
    image?: string | null;
}

export type SimplePost = Omit<FullPost, 'comments'> &{
    comment: number;
};

export type FullPost = {
    id: string;
    username: string;
    userImage?: string | null;
    image: string;
    text?: string;
    createdAt: string;
    likes: string[];
    comments: Comment[];
    commentsCnt : number;
};