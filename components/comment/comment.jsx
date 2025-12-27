import React from 'react'
import Link from 'next/link'

const Comment = ({comment}) => {
  // console.log(comment)
  return (
    
    <div className='bg-[var(--background)] p-2 rounded-md text-xs '>
        <Link href={`/profile/${comment.user._id}?tab=post`} className='flex gap-2 items-center'>
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
        <p className='mt-2'>{comment.comment}</p>
    </div>
  )
}

export default Comment