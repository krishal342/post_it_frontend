import Image from "next/image"

const AuthLayout = ({ children }) => {
  return(
    <>
        <div className='grid grid-cols-2 h-screen'>
            <div className='flex  items-center justify-center'>
                <div className='flex flex-col   justify-center w-[50%]'>

                    <Image src="/logo.png" width={400} height={200} alt="logo" className='' priority />
                    <p>  "Share anything with the world"</p>
                </div>
            </div>
            <div className='flex items-center justify-center h-full'>
                <div className='flex flex-col gap-8 items-center justify-center w-[50%]'>
                    {children}

                </div>

            </div>

        </div>
    </>
  )
}

export default AuthLayout