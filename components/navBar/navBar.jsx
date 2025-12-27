'use client'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveLink } from '@/redux/slices/activeLinkSlice'
import { setProfile } from '@/redux/slices/profileSlice'



const NavBar = () => {

    const [userData, setUserData] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(async response => {
                const resData = await response;
                dispatch(setProfile(resData));
                setUserData(resData);
            })
            .catch(err => {
                console.log(err);
            })

    }, [])



    const pathname = usePathname();

    useEffect(() => {
        switch (pathname) {
            case '/':
                dispatch(setActiveLink('home'));
                break;
            case '/create':
                dispatch(setActiveLink('create'));
                break;
            case '/profile/me':
                dispatch(setActiveLink('profile'));
                break;
        }
    }, [pathname])

    const [displayMenu,setDisplayMenu] = useState(false);

    const handleLogout = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if(response.ok){
                window.location.reload();
            }
        })
    }

    return (
        <div className='border-b ' >
            <div className='flex justify-between items-center w-[70%] mx-auto py-2'>

                <Link href="/profile/me?tab=post" className='flex items-center gap-3'>

                    <div className='h-12 w-12 overflow-hidden relative rounded-full'>
                        {
                            userData.profilePicture
                                ?
                                <img src={userData.profilePicture} alt="profile" className='w-full h-full object-cover object-center' />
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="person h-full w-full object-cover object-center" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                        }
                    </div>

                    <p className='font-bold text-lg'>{userData.firstName} {userData.lastName}</p>
                </Link>

                <div className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="cursor-pointer" viewBox="0 0 16 16" onClick={()=>setDisplayMenu(!displayMenu)}>
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                    {
                        displayMenu &&

                    <div className='absolute border border-[var(--border-color)] bg-[var(--background)] rounded-lg p-4'>
                        <button className='links' onClick={handleLogout}>Logout</button>
                    </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default NavBar