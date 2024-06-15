import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import AuthContext from '@/context/AuthContext'
import SwrConifgContext from '@/context/SwrConifgContext'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signup or Login to NAVIKO',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className='w-full bg-neutral-50 overflow-auto bg-gradient-to-r from-sky-200 to-indigo-300'>
        <AuthContext>
          <div className='max-w-screen-xl mx-auto'>
            <Header />
          </div>
          
          <main className='w-full max-w-screen-xl mx-auto flex justify-center'>
            <SwrConifgContext>{children}</SwrConifgContext>
            </main>
        </AuthContext>
        <div id='portal'/>
      </body>
    </html>
  )
}
