'use client'
import React from 'react'
// import { cookies } from 'next/headers';

import AuthBar from '@/components/authBar/authBar'
import NavBar from '@/components/navBar/navBar'
import SideBar from '@/components/sideBar/sideBar'

import { useSelector } from 'react-redux';


const RootLayout =  ({ children }) => {

  // const cookieStore = await cookies();
  // const token = cookieStore.get('loginToken')?.value;

    const loggedInUserId = useSelector((state) => state.profile.data.id);
  


  return (
    <>
      <div className='w-full'>

        <div className='fixed top-0 max-w-[var(--body-max-width)] w-full z-20 bg-[var(--background)]'>
          {
            !loggedInUserId
              ?
              <AuthBar />
              :
              <NavBar />
          }
        </div>
        <div className=' absolute top-16 grid grid-cols-4 w-full max-w-[var(--body-max-width)] '>


            <div className=' h-[calc(100vh-4rem)]  col-span-1 sticky top-16 z-10 bg-[var(--background)] '>
              <SideBar />
            </div>


          <div className=' flex col-span-3 col-start-2  justify-center '>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default RootLayout

