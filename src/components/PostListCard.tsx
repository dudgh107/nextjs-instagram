'use client';
import { Comment, SimplePost } from "@/model/post";
import Image from "next/image";
import ActionBar from "./ActionBar";
import { useState } from "react";
import ModealPortal from "./ui/ModealPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import usePosts from "@/hooks/posts";

type Props = {
    post: SimplePost;
    priority?: boolean;
}
export default function PostListCard({post, priority=false}: Props) {
    const { userImage, username, image, text, comment} = post;
    const [openModel, setOpenModel] = useState(false);
    const {postComment} = usePosts();
    const handlePostComment = (comment: Comment) => {
        postComment(post, comment);
    }
    return (
        <article className="rounded-lg shadow-md border border-gray-200">
            <PostUserAvatar userImage={userImage} username={username}/>
            <Image className="w-full object-cover aspect-square"
            src={image} alt={`photo by ${username}`} width={500} height={500} 
            priority={priority} 
            onClick={() => setOpenModel(true)}
            />
            <ActionBar post={post} onComment={handlePostComment}>
                {
                    text && (
                        <p>
                            <span className="font-bold mr-1">{username}</span>
                        </p>
                    )
                }
                {comment > 0 && 
                <button 
                className="font-bold my-2 text-sky-700"
                onClick={()=> setOpenModel(true)}>{`View all ${comment} comments`}</button>}
            </ActionBar>
            
            {
                openModel && <ModealPortal>
                    <PostModal onClose={() => setOpenModel(false)}>
                        <PostDetail post={post} />
                    </PostModal>
                </ModealPortal>
            }

        </article>
    );
}

