'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';

import './profileDetail.css'

import { useSelector } from 'react-redux';



const ProfileDetail = (props) => {




    const loggedInUser = useSelector((state) => state.profile.data.id);


    const [userData, setUserData] = useState({});
    const [editing, setEditing] = useState(false);


    const [previewUrl, setPreviewUrl] = useState(null);

    const imageInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm();




    // getting user profile data
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${props.userId}`, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-cache'
        })
            .then(async (res) => await res.json())
            .then(data => { setUserData(data) });

        // console.log(data.firstname);
    }, [])

    useEffect(() => {
        setValue("firstName", userData.firstName);
        setValue("lastName", userData.lastName);
        setValue("email", userData.email);
    }, [userData])


    // show profile picture for preview after selection of image
    const handleProfilePicChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    }

    const handleRemoveProfilePic = () => {
        setPreviewUrl(null);
        imageInputRef.current.value = null;
    }


    const onSave = async (data) => {


        const formData = new FormData();
        const profilePicture = imageInputRef.current.files[0];
        formData.append('profilePicture', profilePicture);

        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/updateProfile`, {
            method: 'PUT',
            body: formData,
            credentials: 'include'

        })
        
        if (response.ok) {
            window.location.reload();
        }
            

    }






    return (

        <div >

            <form action="" className='flex justify-between w-full items-center' onSubmit={handleSubmit(onSave)} encType='multipart/form-data'>

                {/* section for user details */}
                <div className=' flex gap-5 items-center '>

                    {/* section for profile picture */}
                    <div className='h-[150px] w-[150px]  flex justify-center items-center'>
                        {
                            editing
                                ?
                                // if editing is true show profile picture upload option
                                <div className='h-full w-full bg-[var(--background-secondary)] rounded-full ' >
                                    {
                                        previewUrl
                                            ?
                                            // show preview of selected image
                                            <div className='h-full w-full relative ' >

                                                <img src={previewUrl} alt="profilepic" className='object-cover object-center  h-full w-full rounded-full overflow-hidden' />
                                                <div className="absolute bottom-0 right-0 cursor-pointer bg-[var(--background)] p-2 " onClick={handleRemoveProfilePic}>

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" aria-hidden="true" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                    </svg>

                                                </div>
                                            </div>
                                            :
                                            // show upload icon
                                            <div className=' h-full w-full rounded-full flex justify-center items-center' onClick={() => { imageInputRef.current?.click() }}>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="opacity-30 m-[50px]" viewBox="0 0 16 16">
                                                    <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                                </svg>
                                            </div>
                                    }
                                </div>

                                :
                                // if editing is false show profile picture
                                <div className='h-full w-full rounded-full overflow-hidden'>
                                    {
                                        userData.profilePicture
                                            ?
                                            <img src={userData.profilePicture} alt="profilepic" className='object-cover h-full w-full object-center ' />
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="person h-full w-full object-cover object-center" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                            </svg>
                                    }

                                </div>

                        }

                        {/* input field for profile picture which is hidden */}
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            {...register("profilePicture")}
                            ref={
                                (e) => {
                                    register("profilePicture").ref(e);
                                    imageInputRef.current = e;
                                }
                            }
                            onChange={handleProfilePicChange}
                        />

                    </div>


                    {/* section for first name , last name , email  */}
                    <div>

                        {
                            editing
                                ?
                                // show input fields for first name, last name and email when editing is true
                                <div className='flex flex-col'>

                                    {/* input field for first name and last name */}
                                    <div className='flex'>
                                        {/* first name  */}
                                        <div>
                                            <input
                                                type="text"
                                                {...register("firstName", { required: { value: true, message: "Required!" }, minLength: { value: 3, message: "First name must be at least 3 characters long" } })}
                                                // {...register("firstName")}
                                                className='input-field'
                                            />
                                            {errors.firstName && <span className='error'>{errors.firstName.message}</span>}
                                        </div>
                                        {/* last name */}
                                        <div>
                                            <input
                                                type="text"
                                                {...register("lastName", { required: { value: true, message: "Required!" }, minLength: { value: 3, message: "Last name must be at least 3 characters long" } })}
                                                // {...register("lastName")}
                                                className='input-field'
                                            />
                                            {errors.lastName && <span className='error'>{errors.lastName.message}</span>}
                                        </div>
                                    </div>

                                    {/* input field for email */}
                                    <input
                                        type="text"
                                        {...register(
                                            "email",
                                            {
                                                required: { value: true, message: "Required!" },
                                                pattern: { value: /^[A-Z0-9_]+@[A-Z0-9._]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                                            }
                                        )}
                                        className="input-field"
                                    />
                                    {errors.email && <span className='error'>{errors.email.message}</span>}

                                </div>

                                :
                                // show user details when editing is false
                                <div>
                                    <p>{userData.firstName} {userData.lastName}</p>
                                    <p>{userData.email}</p>
                                </div>
                        }
                    </div>

                </div>

                {/* section to show edit button */}
                <div className='ml-5'>
                    {
                        (loggedInUser === props.userId || props.userId === 'me')
                            ? isSubmitting
                                ? <p className='loader'></p>
                                : editing
                                    ?
                                    // show save and cancel icon when editing is true
                                    <div className=' flex flex-col gap-3'>

                                        {/* save icon */}
                                        <button type='submit'>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="save cursor-pointer" viewBox="0 0 16 16" >
                                                <path d="M11 2H9v3h2z" />
                                                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                                            </svg>
                                        </button>

                                        {/* cancel icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true" viewBox="0 0 16 16" onClick={() => setEditing(false)} className='cursor-pointer'>
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                        </svg>

                                    </div>

                                    :
                                    // show edit icon when editing is false
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="edit cursor-pointer" viewBox="0 0 16 16" onClick={() => setEditing(true)} >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                            : null
                    }

                </div>



            </form>

        </div>


    )
}

export default ProfileDetail