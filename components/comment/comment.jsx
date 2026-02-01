import React from 'react'
import Link from 'next/link'

import { useSelector } from 'react-redux';

const Comment = ({ comment }) => {
  // console.log(comment)

  const [showDelete, setShowDelete] = React.useState(false);

  const userId = useSelector((state) => state.profile.data.id);

  const deleteComment = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment/${comment.id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const resData = await res.json();
    console.log(resData);
    if (res.ok) {
      window.location.reload();
    }

  }

  return (

    <div className='bg-[var(--background)] p-2 rounded-md text-xs '>
      <div className='flex justify-between'>

        <Link href={`/profile/${comment.user.id}?tab=post`} className='flex gap-2 items-center'>
          <div className='h-5 w-5 overflow-hidden  relative rounded-full'>
            {
              comment.user.profilePicture
                ? <img src={comment.user.profilePicture} alt="profile" className='w-full h-full object-cover object-center' />
                : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="person h-full w-full object-cover object-center" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
            }
          </div>

          <p>{comment.user.firstName} {comment.user.lastName}</p>
        </Link>

        {
          (comment.user.id == userId) &&
          <div className='relative '>

            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="cursor-pointer" viewBox="0 0 16 16" onClick={() => setShowDelete(!showDelete)}>
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>

            <div className={'absolute border border-[var(--border-color)] bg-[var(--background)] rounded-lg p-1 text-sm ' + (showDelete ? 'flex' : 'hidden') + ' flex-col right-0 top-6'}>
              <p className='links' onClick={deleteComment}>Delete</p>
            </div>

          </div>
        }


      </div>
      <p className='mt-2'>{comment.content}</p>
    </div>
  )
}

export default Comment