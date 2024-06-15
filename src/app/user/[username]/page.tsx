import UserPosts from '@/components/UserPosts';
import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/service/user'
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const dynamic = 'force-dynamic';

type Props = {
  params: {username: string}
};

//getUser << 동일한 username은 중복 호출하지 않게 cache사용
const getUser = (async (username: string) => getUserForProfile(username));
export default async function UserPage({params: {username}}: Props) {
  
  //console.log('username')
  
  //console.log(username)

  const user = await getUserForProfile(username);

  if(!user) {
    notFound();
  }

  //console.log('45645465')
  
  //console.log(user)
     
  return (
    <section className='w-full'>
      <UserProfile user={user}/>
      <UserPosts user={user}/>
    </section>
    
  )
}

export async function generateMetadata({params: {username}}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) * NAVIKO Photos`,
    description : `${user?.name}s all NAVIKO posts`,
  }
}