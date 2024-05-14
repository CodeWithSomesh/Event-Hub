'use client'

import React from 'react'
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from '../ui/button';
import Link from 'next/link';

const HoverHeader = ({titlePlaceholder, buttonPlaceholder}: {titlePlaceholder: string, buttonPlaceholder?: string}) => {
  return (
    <>
      {buttonPlaceholder ? (
        <div className="relative bg-primary-50 w-full overflow-hidden flex flex-col items-center justify-center rounded-lg py-5 md:py-10 self-stretch">
          <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

          <Boxes />

          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h1 className='h3-bold text-white bg-black hover:text-primary z-10 max-w-7xl p-5 md:px-10 rounded-md'>
              {titlePlaceholder}
            </h1>
            <Button asChild size="lg" className="bg-primary text-md font-semibold p-4 hover:bg-black hover:text-primary hidden sm:flex z-10">
              <Link href="/#events">
                {buttonPlaceholder}
              </Link>
            </Button>
          </div>
          
        </div>
      )
      : (
        <div className="relative bg-primary-50 w-full overflow-hidden flex flex-col items-center justify-center rounded-lg py-5 md:py-10 self-stretch">
          <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

          <Boxes />
          <h1 className='h3-bold text-center text-white bg-black hover:text-primary z-10 max-w-7xl lg:mx-auto p-5 md:px-10 rounded-md'>
            {titlePlaceholder}
          </h1>
        </div>
        )
      }
    </>
  )
}

export default HoverHeader