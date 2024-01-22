'use client'
import { HomeUser, ProfileUser } from '@/model/user';
import React, { useState, useTransition } from 'react';
import Button from './ui/Button';
import useMe from '@/hooks/me';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

type Props = {
    user: ProfileUser
}
export default function FollowButton({user} : Props) {
    const { username, id} = user;
    const {user: loggedInUser, toggleFollow} = useMe();
    
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const isUpdating = isPending || isFetching;

    const showButton = loggedInUser && loggedInUser.username !== username;
    
    const following = loggedInUser?.following.find((item)=>item.username===username);

    //console.log('following==>00100');    
    //console.log(following);    
    
    const buttonText= following ? 'Unfollow' : 'Follow';
    //console.log('buttonText='+buttonText);    
    const isFollow = buttonText === 'Unfollow' ? false : true;

    const handleFollowing = async () => {
        if(!loggedInUser) return;
        setIsFetching(true);
        await toggleFollow(user.id, isFollow);
        setIsFetching(false);
        startTransition(()=> {
            router.refresh();
        })
        
    }
    return (
        <>
            {
            showButton &&
              <div className='relative'>
                {isUpdating && <div className='z-20 absolute inset-0 flex justify-center items-center'><PulseLoader size={6}/></div>}
                <Button 
                disabled={isUpdating}
                text={buttonText} onClick={handleFollowing} red={buttonText === 'Unfollow'}/>
              </div>
            }
        </>
    );
}

