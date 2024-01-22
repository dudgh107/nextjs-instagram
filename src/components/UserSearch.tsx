'use client';
import { SearchUser } from '@/model/user';
import React, { FormEvent, useState } from 'react';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import UserCard from './UserCard';
import useDebounce from '@/hooks/useDebounce';

export default function UserSearch() {
    const [keyword, setKeyword] = useState('');
    const debouncedKeyword = useDebounce(keyword);
    const {data : users, isLoading, error} = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

    //console.log(data);
    
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    }
    return (
        <section className='w-full max-w-2xl my-4 flex flex-col items-center'>
            <form className='w-full mb-4'
            onSubmit={onSubmit  }>
                <input 
                className='w-full text-xl p-3 outline-none border border-gray-400'
                type="text" autoFocus placeholder='Search for username or name' value={keyword}
                onChange={(e)=> setKeyword(e.target.value)} />
            </form>
            {error && <p>무언가 잘못되었음!!!!</p>}
            {isLoading && <GridLoader/> }
            {!isLoading && !error && users?.length ===0 && (
                <p>찾는 사용자가 없음!!!!</p>
            )}

            <ul className='w-full -p-4'>
                {users && users.map(user=> 
                    <li key={user.username}>
                        <UserCard user={user}/>
                    </li>    
                )}
            </ul>
        </section>
    );
}

