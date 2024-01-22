
'use client';

import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";
import useMe from "@/hooks/me";

export default function FollowingBar() {
    // 1. 클라인트 컴포넌트에서 백엔드에게 api/me 사용자의 정보를 얻어옴
    // 2. 백엔드에서는 현재 로그인된 세션 정보를 이용해서
    // 3. 백엔드에서 사용자의 상세 정보를 sanity에서 가지고 옴

    const {user:data, isLoading : loading, error} = useMe();

    const users = data?.following;

    //console.log('>>>050505>>>'+users?.length);
    return (
        <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
            
            {loading ? <PropagateLoader size={8} color='red'/> 
            : (!users || users.length ===0) && <p>{`You don't have followers`}</p>
            }
            {
                users && users.length > 0 && 
                    <ScrollableBar>
                    {users.map(({image, username}) => (
                    
                    <div key={username}>
                            <Link className="flex flex-col items-center text-center w-20"  href={`/user/${username}`}>
                                <Avatar image={image} highlight/>
                                <p className="w-full text-sm text-ellipsis overflow-hidden">{username}</p>
                            </Link>
                            
                        </div>
                        
                    ))}
                    </ScrollableBar>
                
            }
            
        </section>
        
    );
}

