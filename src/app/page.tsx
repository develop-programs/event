import Login from '@/components/custom/Login'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='h-full p-2 md:p-6'>
      <div className='inset-0 w-full h-full rounded-lg bg-black/70 grid grid-flow-row grid-rows-8 p-6'>
        <section aria-label='top-section' className='row-span-2'>
          <div className='flex justify-between'>
            <Image src="/269-2692179_mumbai-indians-logo-png-removebg-preview.png" alt="logo" width={200} height={200} loading='lazy' decoding='async' className='size-14 md:size-32 invert md:hidden' />
            <Link href="https://forms.gle/MKRZEvvS75awVQCr8">
              <Button>
                Register Now
              </Button>
            </Link>
            <Image src="/logo.png" alt="logo" width={200} height={200} loading='lazy' decoding='async' className='w-32 md:w-100' />
            <Login />
            <Image src="/techinca_logo_clear.png" alt="logo" width={200} height={200} loading='lazy' decoding='async' className='w-[calc(200px/2)] md:w-38 md:hidden' />
          </div>
        </section>
        <section aria-label='main-section' className='row-span-4 pt-8 pb-4'>
          <div className='h-full text-center flex flex-col items-center justify-between text-white'>

            <span className='text-2xl pt-4 md:text-5xl font-semibold md:font-bold'>Intra Unversity Coding Compition based on squid games</span>

            <div className='grid place-content-center text-center text-md md:text-xl font-semibold'>
              <span>Organized by:</span>
              <span>Club Technica (MCA 2<sup>nd</sup> SEM) and SER</span>
              <span>ITM University Raipur</span>
            </div>
          </div>
        </section>
        <section aria-label='bottom-section' className='row-span-2'>
          <div className='h-full flex lg:justify-between justify-center items-center'>
            <Image src="/269-2692179_mumbai-indians-logo-png-removebg-preview.png" alt="logo" width={200} height={200} loading='lazy' decoding='async' className='size-14 md:size-32 invert hidden md:block' />
            <Image src="/image-1.png" alt="logo" width={200} height={200} loading='lazy' decoding='async' className='w-28 md:w-42' />
            <Image src="/techinca_logo_clear.png" alt="logo" width={200} height={200} loading='lazy' decoding='async' className='w-[calc(150px/2)] md:w-38 hidden md:block' />
          </div>
        </section>
      </div>
    </div>
  )
}
