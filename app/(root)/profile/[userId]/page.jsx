'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation';

import ProfileDetail from '@/components/userProfileDetail/profileDetail';
import Card from '@/components/card/card';




const ProfilePage = () => {


  const userId = useParams().userId;

  const [resData, setResData] = useState([]);

  const searchParams = useSearchParams();

  const tab = searchParams.get('tab') || 'post';
  const [activeTab, setActiveTab] = useState(tab);

  // set active tab based on search params
  useEffect(() => {
    const currentTab = searchParams.get('tab');
    setActiveTab(currentTab)
  }, [searchParams])


  // fetch posts, liked posts, commented posts based on active tab
  useEffect(() => {

    switch (activeTab) {
      case 'post':
        // fetch all posts by userId
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${userId}`, {
          method: 'GET',
          credentials: 'include'
        })
          .then(async (res) => {
            const data = await res.json()
            setResData(data);

          });
        break;

        // updating is required, fetch api don't work properly
      case 'liked':
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/liked/${userId}`, {
          method: 'GET',
          credentials: 'include'
        })
          .then(async (res) => {
            const data = await res.json()
            setResData(data.reverse());

          });
        break;

      case 'commented':
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/commented/${userId}`, {
          method: 'GET',
          credentials: 'include'
        })
          .then(async (res) => {
            const data = await res.json()
            setResData(data.reverse());

          });
        break;

    }

  }, [activeTab]);


  return (
    <div className='w-full flex flex-col gap-5 items-center my-5'>

    {/* show proile detail of user  */}
      <div className='w-[70%]'>
        <ProfileDetail userId={userId} />
      </div>

      <hr className='w-[90%]' />

    {/* button to select tab to show posts, liked posts, commented posts of user */}
      <div className='flex gap-5 w-[90%]'>
        <p
          onClick={() => setActiveTab('post')}
          className={`links ${activeTab === 'post' && 'active'}`}

        > Post</p>
        <p
          onClick={() => setActiveTab('liked')}
          className={`links ${activeTab === 'liked' && 'active'}`}
        >Liked </p>
        <p
          onClick={() => setActiveTab('commented')}
          className={`links ${activeTab === 'commented' && 'active'}`}>Commented </p>
      </div>

    {/* show posts on based on selected tab */}
      <div className="flex flex-col w-[400px]">
        {
          resData?.map((post) => {
            return (
              <Card key={post.id} post={post} userId={userId}/>
            )
          })
        }
      </div>

    </div>
  )
}

export default ProfilePage