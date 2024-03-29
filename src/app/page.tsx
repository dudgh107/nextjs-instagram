import FollowingBar from '@/components/FollowingBar'
import PostList from '@/components/PostList'
import SideBar from '@/components/SideBar'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
    
    if(!user) {
      //console.log('>>><<<');
        redirect('/auth/signin');
    }
  return (
    <section className='w-full max-w-[850px] p-4 flex flex-col md:flex-row'>
      <div className='w-full basis-3/4 min-w-0'>
        <FollowingBar />
        <PostList />
      </div>
      <div className='basis-1/4 ml-8'>
        <SideBar user={user} />
      </div>
    </section>
  )
}
