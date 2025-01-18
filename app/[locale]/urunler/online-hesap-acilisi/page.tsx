'use client';

import { usePathname } from 'next/navigation';
import React from 'react'

const Page = () => {
  const pathname = usePathname();

  return (
    <div className='bg-txtSubtitle h-[50vh] flex items-center justify-center flex-col'>
      <h2 className='text-secondary'>ONLINE HESAP AÇILIŞI</h2>
      <h3 className='text-secondary'>Pathname: {pathname}</h3>
    </div>
  )
}

export default Page