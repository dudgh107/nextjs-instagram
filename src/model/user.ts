export type AuthUser = {
    id: string;
    name: string;
    username: string;
    email?: string | null;
    image: string | null;
};

export type followingDetail = {
    id: string;
    username: string;
    image?: string | null;
}

export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

export type HomeUser = AuthUser & {
    following : followingDetail[];
    followers : followingDetail[];
    bookmarks : string[];
};


export type SearchUser = AuthUser & {
    following : number;
    followers : number;
    
}

export type ProfileUser = SearchUser & {
    posts:number;
}