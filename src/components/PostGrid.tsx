import React from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import { SimplePost } from '@/model/post';
import PostGridCard from './PostGridCard';
import usePosts from '@/hooks/posts';


export default function PostGrid() {
    const {posts, isLoading} = usePosts();
    
    //console.log(posts)
    
    return (
        <div className='w-full text-center'>
            {isLoading && <GridSpinner />}
            <ul className='grid grid-cols-3 gap-4 p-4 px-8'>
                {posts && posts.map((post, index) => <li key={post.id}>
                    <PostGridCard post={post} priority={index < 6} />
                </li>)}
            </ul>
        </div>
    );
}

