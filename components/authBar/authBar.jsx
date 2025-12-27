import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const AuthBar = () => {
  return (
    <div className='bg-[var(--background-secondary)]'>

      <div className='flex justify-between items-center w-[70%] mx-auto'>

        <Image src="/logo3.png" width={100} height={50} alt="logo" className='' priority />

        <div className='flex items-center gap-4'>
          <Link href="/auth/login" className='btn'> Login </Link>
          <Link href="/auth/signup"> Sign Up </Link>
        </div>

      </div>
      {/* <hr className='opacity-50' /> */}

    </div>
  )
}

export default AuthBar