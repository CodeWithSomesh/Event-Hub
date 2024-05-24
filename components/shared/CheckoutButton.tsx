"use client"

import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'

const CheckoutButton = ({event, buttonPlaceholder} : {event : IEvent, buttonPlaceholder?: string}) => {

  const {user} = useUser()
  const userId = user?.publicMetadata.userId as string
  
  // Checking whether event has past the End Date & Time
  // If end date is past, then this hasEventFinished will be false
  const hasEventFinished = new Date(event.endDateTime) < new Date()

  return (
    <div className="flex items-center gap-3">
      {/*If event end date is past, then display this text */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">Sorry, tickets are no longer available.</p>
      ): (
        // If not, then display this button 
        <>
          <SignedOut> {/*If the user is signed out, then return sign in page */}
            <Button asChild className='bg-primary text-lg md:text-2xl font-bold px-4 py-[26px] hover:bg-black hover:text-primary sm:w-fit' size="lg">
              <Link href="/sign-in">
                {event.isFree ? 'Get Tickets' : 'Buy Tickets'}
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} buttonPlaceholder={buttonPlaceholder} />
          </SignedIn>
        </>
      )}
    </div>
  )
}

export default CheckoutButton