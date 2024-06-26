'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import ColorButton from "./ui/ColorButton";
import { useSession, signIn, signOut } from "next-auth/react"
import Avatar from "./Avatar";
import { title } from "process";

const menu = [
    {
        href: '/', 
        icon: <HomeIcon/>, 
        clickedIcon:<HomeFillIcon/>,
        title: 'Home',
    },
    {
        href: '/search', 
        icon: <SearchIcon/>, 
        clickedIcon:<SearchFillIcon/>,
        title: 'Search users',
    },
    {
        href: '/new', 
        icon: <NewIcon/>, 
        clickedIcon:<NewFillIcon/>,
        title: 'New post',
    },
]
export default function   Header() {
    const pathName = usePathname();
    
    const { data: session } = useSession();
    const user = session?.user;
    
    return (
        <header className="sticky top-0 bg-white z-10  border-b bg-gradient-to-r from-sky-300 to-indigo-400">
            <div className="flex justify-between items-center px-6">
            <Link href="/" aria-label='Home'>
                <h1 className="text-3xl font-bold">NAVIKO</h1>
            </Link>
            <nav >
                <ul className='flex gap-4 items-center p-4'>
                    {
                        menu.map(item=> <li key={item.href}>
                            <Link href={item.href} aria-label={item.title}>
                                {pathName === item.href ? item.clickedIcon : item.icon}
                            </Link>
                        </li>)
                    }
                    {user && (
                        <li>
                            <Link href={`/user/${user?.username}`}>
                                <Avatar image={user.image} size='small' highlight />
                            </Link>
                        </li>
                    )}
                    <li>
                    {
                        session ? <ColorButton text='Sign out' onClick={()=>signOut()} />
                                : <ColorButton text='Sign in' onClick={()=>signIn()} />
                    }
                    </li>
                </ul>
                
            </nav>
            </div>
        </header>
    );
}

