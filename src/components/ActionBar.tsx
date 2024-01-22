import React, { useState } from 'react';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { parseDate } from '@/app/utils/date';
import { Comment, SimplePost } from '@/model/post';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { useSession } from 'next-auth/react';
import usePosts from '@/hooks/posts';
import useMe from '@/hooks/me';
import CommentForm from './CommentForm';


type Props = {
    post: SimplePost;
    children?: React.ReactNode;
    onComment : (comment: Comment) => void;
}
export default function ActionBar({post, children, onComment} : Props) {
    
    const {id, likes, createdAt} = post;
    const {user, setBookmark} = useMe();
    const liked = user ? likes.includes(user.username) : false
    const bookmarked = user?.bookmarks?.includes(id) ?? false; 
    
    const {setLike} = usePosts();

    const handleLike = (like: boolean) => {
        if(user) {
            setLike(post, user.username, like);
        }
    };
    const handleBookmark = (bookmark: boolean) => {
        if(user) {
            setBookmark(id, bookmark);
        }
    }
    const handleComment = (comment: string) => {
        user && onComment({comment, username: user.username, image: user.image})
    } 
    return (
        <div>
            <div className="flex justify-between mt-2 my-2 px-4">
                <ToggleButton toggled={liked} 
                    onToggle={handleLike}
                    onIcon={<HeartFillIcon/>}
                    offIcon={<HeartIcon/>}
                ></ToggleButton>
                <ToggleButton toggled={bookmarked} 
                    onToggle={handleBookmark}
                    onIcon={<BookmarkFillIcon/>}
                    offIcon={<BookmarkIcon/>}
                ></ToggleButton>
            
            </div>
            <div className="px-4 py-1">
                <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length>1 ? 'likes' : 'like' }`}</p>
                {children}
                <p className="text-sx text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
                

            </div>
            <CommentForm onPostComment={handleComment}/>
        </div>
    );
}

