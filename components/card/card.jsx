'use client'
import React from 'react'
import Link from 'next/link'

import Actions from './components/actions'

import './card.css'

const Card = ({ post }) => {

    const [showDelete, setShowDelete] = React.useState(false);

    const handleDelete = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (res.ok) {
            window.location.reload();
        }
    }

    return (
        <div className='w-full bg-[var(--background-secondary)] p-4 flex flex-col gap-3 rounded-lg items-start my-2 '>


            <div className='w-full flex justify-between items-center'>


                <Link href={`/profile/${post.author.id}?tab=post`} className='flex gap-2 items-center'>
                    <div className='h-8 w-8 overflow-hidden  relative rounded-full'>
                        {
                            post.author.profilePicture
                                ? <img src={post.author.profilePicture} alt="profile" className='w-full h-full object-cover object-center' />
                                : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="person h-full w-full object-cover object-center" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                        }
                    </div>

                    <p className=''>{post.author.firstName} {post.author.lastName}</p>
                </Link>
                <div className='relative '>

                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="cursor-pointer" viewBox="0 0 16 16" onClick={() => setShowDelete(!showDelete)}>
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>

                    <div className={'absolute border border-[var(--border-color)] bg-[var(--background)] rounded-lg p-1 text-sm ' + (showDelete ? 'flex' : 'hidden') + ' flex-col right-0 top-6'}>
                        <p className='links' onClick={handleDelete}>Delete</p>
                    </div>
                </div>


            </div>

            <div className='w-full rounded-lg overflow-hidden'>
                {
                    post.image && <img src={post.image} alt="photo" className='w-full' />
                }

            </div>
            <div className='flex flex-col gap-2'>

                <div>
                    {post.description}
                </div>

                <div className='text-sm'>
                    {post.tags.map((tag, index) => (
                        <span key={index} className='text-blue-500 mr-2'>{tag}</span>
                    ))}
                </div>
            </div>

            {/* <Actions post={post} /> */}




        </div>
    )
}

export default Card