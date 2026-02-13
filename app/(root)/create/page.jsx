'use client';
import React, { useEffect, useRef, useState } from 'react'
import { set, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { useSelector } from 'react-redux';



const CreatePage = () => {

  const userId = useSelector((state) => state.profile.data.id);

  useEffect(() => {
    if (!userId) {
      router.push('/auth/login');
    }
  }, []);

  const router = useRouter();

  const [previewUrl, setPreviewUrl] = useState(null);
  const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm();

  const imageInputRef = useRef(null);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [btnDisable, setBtnDisable] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagString, setTagString] = useState('');

  // show image for preview after selection of image
  const handleImageChange = (e) => {
    setImage(e.target.value);
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }

// this functoin handles adding and showing tags when enter is pressed
  const handleKeyDownForTags = (e) => {
    if (e.key === 'Enter' && tagString.trim() !== '') {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagString.trim()]);
      setTagString('');
    }
  }


  const handleRemoveTag = (index) => () => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setImage('');
  }

  // enable or disable post button based on input fields
  useEffect(() => {
    if (image === "" && description === "" && tags.length === 0) {
      setBtnDisable(true);
    }
    else {
      setBtnDisable(false);
    }
  }, [image, description, tags.length])


  // function to handle post creation
  const onPost = async (data) => {

    const formData = new FormData();
    const imageFile = imageInputRef.current.files[0];
    if (imageFile) {
      formData.append('image', imageFile);
    }

    formData.append('description', data.description);
    
    // tags array to stringified JSON
    formData.append('tags', JSON.stringify(tags));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    const resData = await response.json();

    if (response.ok) {
      // window.location.reload();
      router.push('/');
    }

  }

  if(!userId){
    return null;
  }



  return (
    <div className='flex flex-col gap-4 my-5'>

      <h1 className='w-full text-center text-lg'>Create Your Post</h1>

      <div className='bg-[var(--background-secondary)] w-[400px] rounded-lg'>

        <form action="" className="w-full flex flex-col gap-4 p-4" onSubmit={handleSubmit(onPost)} encType='multipart/form-data'>


          {
            previewUrl
              ?
              // image preview after selection
              <div className='relative flex justify-center'>

                {/* actual image */}
                <img src={previewUrl} alt="Preview" className='max-h-full max-w-full object-contain rounded-lg' />

                {/* cross icon for image removal */}
                <div className="absolute top-2 right-2 cursor-pointer bg-[var(--background)] p-2 " onClick={handleRemoveImage}>

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" aria-hidden="true" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>

                </div>

              </div>
              :
              // image upload placeholder when no image is selected
              <div className="flex justify-center items-center  border border-[var(--border-color)] rounded-lg cursor-pointer overflow-hidden" onClick={() => { imageInputRef.current?.click() }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="opacity-30 m-[50px]" viewBox="0 0 16 16">
                  <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
              </div>
          }

          {/* input field for image which is hidden */}
          <input
            type="file"
            style={{ display: 'none' }}
            {...register("image")}
            ref={
              (e) => {
                register("image").ref(e);
                imageInputRef.current = e;
              }
            }
            value={image}
            onChange={handleImageChange}
          />

            {/* textarea for description */}
          <textarea
            rows={3}
            placeholder='Write your thought...'
            className='border border-[var(--border-color)] rounded-lg p-3  outline-none'
            {...register("description")}
            value={description}
            onChange={(event) => setDescription(event.target.value)}

          ></textarea>

            {/* tags section */}
          <div>

            {/* display tags after adding */}
            <div>

              {tags.map((tag, index) => (
                <span key={index} className="inline-block bg-[var(--background)] text-[var(--text-secondary)] rounded-full px-2 py-1 text-sm font-semibold mr-2 mb-2">

                  <span className='flex items-center gap-3'>
                  {tag}
                  {/* cross icon for removing tag */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cursor-pointer" viewBox="0 0 16 16" onClick={handleRemoveTag(index)}>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </span>

                </span>
              ))}
            </div>

            {/* input field for tags */}
            <input
              type="text"
              placeholder='#tags'
              onChange={(e) => setTagString(e.target.value)}
              value={tagString}
              className='w-full border border-[var(--border-color)] rounded-lg p-3 outline-none'
              onKeyDown={handleKeyDownForTags}
            />

          </div>

              {/* submit button */}
          <button type="submit" disabled={isSubmitting || btnDisable} className={`bg-[var(--blue)] text-white py-2 rounded-lg  ${isSubmitting || btnDisable ? `opacity-50 cursor-not-allowed ` : `cursor-pointer`} `}>Post</button>
          {
            isSubmitting && <p className='test-xs'>Sending...</p>
          }
        </form>

      </div>


    </div>
  )
}


export default CreatePage;