
'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import ProfileDetail from '@/components/userProfileDetail/profileDetail';
import Card from '@/components/card/card';

const ProfilePage = () => {
  const loggedInUserId = useSelector((state) => state.profile.data.id);
  const userId = useParams().userId;

  const [resData, setResData] = useState([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get('tab') || 'post';
  const [activeTab, setActiveTab] = useState(tab);

  // keep activeTab in sync with search params
  useEffect(() => {
    const currentTab = searchParams.get('tab') || 'post';
    setActiveTab(currentTab);
  }, [searchParams]);

  // fetch posts based on activeTab
  useEffect(() => {
    switch (activeTab) {
      case 'post':
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${userId}`, {
          method: 'GET',
          credentials: 'include'
        })
          .then(async (res) => {
            const data = await res.json();
            setResData(data);
          });
        break;

      case 'liked':
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/liked/me`, {
          method: 'GET',
          credentials: 'include'
        })
          .then(async (res) => {
            const data = await res.json();
            setResData(data);
          });
        break;

      case 'commented':
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/commented/me`, {
          method: 'GET',
          credentials: 'include'
        })
          .then(async (res) => {
            const data = await res.json();
            setResData(data);
          });
        break;
    }
  }, [activeTab, userId]);

  // helper to change tab and update URL
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    router.push(`/profile/${userId}?tab=${tabName}`);
  };

  return (
    <div className='w-full flex flex-col gap-5 items-center my-5'>
      {/* show profile detail */}
      <div className='w-[70%]'>
        <ProfileDetail userId={userId} />
      </div>

      <hr className='w-[90%]' />

      {/* tab buttons */}
      <div className='flex gap-5 w-[90%]'>
        <p
          onClick={() => handleTabChange('post')}
          className={`links ${activeTab === 'post' && 'active'}`}
        >Post</p>

        {loggedInUserId === userId && (
          <>
            <p
              onClick={() => handleTabChange('liked')}
              className={`links ${activeTab === 'liked' && 'active'}`}
            >Liked</p>
            <p
              onClick={() => handleTabChange('commented')}
              className={`links ${activeTab === 'commented' && 'active'}`}
            >Commented</p>
          </>
        )}
      </div>

      {/* posts */}
      <div className="flex flex-col w-[400px]">
        {resData?.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default ProfilePage;