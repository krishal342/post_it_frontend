'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveLink } from '@/redux/slices/activeLinkSlice'
import { setProfile } from '@/redux/slices/profileSlice'


import '../../app/globals.css';

import { useForm } from 'react-hook-form';

const NavBar = () => {

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm();

    const dispatch = useDispatch();
    const router = useRouter();

    const userData = useSelector((state) => state.profile.data);
    const pathname = usePathname();

    useEffect(() => {
        switch (true) {
            case pathname === '/':
                dispatch(setActiveLink('home'));
                break;
            case pathname === '/create':
                dispatch(setActiveLink('create'));
                break;
            case pathname.startsWith('/profile'):
                dispatch(setActiveLink('profile'));
                break;
        }
    }, [pathname]);

    const [displayMenu, setDisplayMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogout = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (response.ok) {
                dispatch(setActiveLink('home'));
                router.push('/');
                // window.location.reload();
                dispatch(setProfile({}));

            }
        });
    };

    const handleDeleteAccount = async (data) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/deleteProfile`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        if (res.ok) {
            // account deleted → redirect to login
            router.push('/auth/login');
        } else {
            const resData = await res.json();
            setError('invalidCredentials', { message: resData.message });
        }

    };

    return (
        <div className='border-b'>
            <div className='flex justify-between items-center w-[70%] mx-auto py-2'>
                <Link href={`/profile/${userData.id}?tab=post`} className='flex items-center gap-3'>
                    <div className='h-12 w-12 overflow-hidden relative rounded-full'>
                        {userData.profilePicture ? (
                            <img src={userData.profilePicture} alt="profile" className='w-full h-full object-cover object-center' />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="person h-full w-full object-cover object-center" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 
                1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 
                10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                        )}
                    </div>
                    <p className='font-bold text-lg'>{userData.firstName} {userData.lastName}</p>
                </Link>

                <div className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        className="cursor-pointer" viewBox="0 0 16 16" onClick={() => setDisplayMenu(!displayMenu)}>
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 
            1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 
            1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 
            1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                    {displayMenu && (
                        <div className='absolute border border-[var(--border-color)] bg-[var(--background)] rounded-lg p-4'>
                            <button className='links' onClick={handleLogout}>Logout</button>
                            <button className='links' onClick={() => setShowDeleteModal(true)}>Delete</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-black p-6 rounded-lg shadow-lg w-[300px] text-center">
                        <h2 className="text-lg font-bold mb-4">Confirm Account Deletion</h2>
                        
                        <form onSubmit={handleSubmit(handleDeleteAccount)} className='flex flex-col gap-4'>

                            <label>
                                <div className='input-field flex items-center'>
                                    <input
                                        {...register(
                                            'password',
                                            {
                                                required: { value: true, message: 'Required!' },
                                                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                                                pattern: { value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])/, message: 'Password must contain at least one letter, one number and one special character' }
                                            }
                                        )}
                                        type='text'
                                        placeholder='Password'
                                        className='outline-none w-full'
                                        spellCheck="false"
                                        autoComplete='off'
                                    />


                                </div>
                                {errors.password && <span className='error'>{errors.password.message}</span>}
                            </label>

                            <div className="flex justify-between">
                                <button
                                    className="btn"
                                    type='submit'
                                >
                                    Delete
                                </button>
                                <button
                                    className="!bg-gray-300 !text-black btn  "
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                            {errors.invalidCredentials && <span className='error'>{errors.invalidCredentials.message}</span>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;