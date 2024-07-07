import React from 'react'
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

const HoverHeader = ({titlePlaceholder, buttonPlaceholder, home, link}: {titlePlaceholder?: string, buttonPlaceholder?: string, home?:boolean, link?: string}) => {
  return (
    <>
      {!titlePlaceholder && (
        <div className="relative bg-primary-50 w-full overflow-hidden flex flex-col items-center justify-center rounded-lg py-8 md:py-16 self-stretch">
          <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

          <Boxes />

          <div className="bg-primary-50 z-10 max-w-7xl rounded-md mb-2">
              <h1 className="sm:h1-bold h3-bold text-center">
                {home ? 'Your Passport to Events Worldwide' : 'Exciting Events Awaits You'}
              </h1>
          </div>  

          <div className="bg-primary-50 z-10 max-w-7xl rounded-md">
              <h1 className="sm:h1-bold h3-bold text-center text-primary">— Discover. Experience. Connect.</h1>
          </div>  
        
      </div>
      )}

      {titlePlaceholder && (
        <>
          {buttonPlaceholder ? (
            <div className="relative bg-primary-50 w-full overflow-hidden flex flex-col items-center justify-center rounded-lg py-2 sm:py-8 md:py-16 self-stretch">
              <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
    
              <Boxes />
    
              <div className="wrapper sm:flex grid gap-4 items-center justify-center sm:justify-between">
                <h1 className={`${titlePlaceholder ? "h3-bold text-white bg-black hover:text-primary z-10 max-w-7xl p-5 md:px-10 rounded-md text-center" : ""}`}>
                  {titlePlaceholder}
                </h1>
                
                <Link href={`${link}`} className="bg-primary-50 z-50 p-6 ">
                  <div className='flex gap-1 items-center w-fit hover:border-b-black hover:border-b-2'>
                    <p className="p-medium-18 md:p-semibold-24 text-primary">{buttonPlaceholder}</p>
                    <Image src="/assets/icons/goto.svg" alt="search" width={26} height={26} />
                  </div> 
                </Link>

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