import UserSearch from '@/components/UserSearch'
import Image from 'next/image'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'User Search',
  description: 'Search users to follow',
}


export default function SearchPage() {

  
  return (
    <>
      <UserSearch/>
    </>
  )
}
