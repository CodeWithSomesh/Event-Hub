'use client'

import React from 'react'
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from '../ui/button';
import Link from 'next/link';

const HoverHeader = ({titlePlaceholder, buttonPlaceholder, home}: {titlePlaceholder?: string, buttonPlaceholder?: string, home?:boolean}) => {
  return (
    <>
      {!titlePlaceholder && (
        <div className="relative bg-primary-50 w-full overflow-hidden flex flex-col items-center justify-center rounded-lg py-8 md:py-16 self-stretch">
          <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

          <Boxes />

          <div className="bg-primary-50 z-10 max-w-7xl rounded-md mb-2">
              <h1 className="h1-bold text-center text-whit">
                {home ? 'Your Passport to Events Worldwide' : 'Exciting Events Awaits You'}
              </h1>
          </div>  

          <div className="bg-primary-50 z-10 max-w-7xl rounded-md">
              <h1 className="h1-bold text-center text-primary">— Discover. Experience. Connect.</h1>
          </div>  
        
      </div>
      )}

      {titlePlaceholder && (
        <>
          {buttonPlaceholder ? (
            <div className="relative bg-primary-50 w-full overflow-hidden flex flex-col items-center justify-center rounded-lg py-8 md:py-16 self-stretch">
              <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
    
              <Boxes />
    
              <div className="wrapper flex items-center justify-center sm:justify-between">
                <h1 className={`${titlePlaceholder ? "h3-bold text-white bg-black hover:text-primary z-10 max-w-7xl p-5 md:px-10 rounded-md" : ""}`}>
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
            <div className="relative bg-primary-50 w-full overflow-hidden flex flex-col items-center justify-center rounded-lg py-8 md:py-16 self-stretch">
              <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
    
              <Boxes />
              <h1 className={`${titlePlaceholder ? "h3-bold text-white bg-black hover:text-primary z-10 max-w-7xl p-5 md:px-10 rounded-md" : ""}`}>
                {titlePlaceholder}
              </h1>
            </div>
            )
          }
        </>
      )}
    </>
  )
}

export default HoverHeader