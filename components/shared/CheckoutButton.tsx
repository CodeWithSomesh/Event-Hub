"use client"

import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import CheckoutModal from './CheckoutModal'

const CheckoutButton = ({event} : {event : IEvent}) => {

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
            <Button asChild className="button rounded-full text-xl font-bold w-full sm:w-fit" size="lg">
              <Link href="/sign-in" className='text-lg font-bold'>
                Get Tickets
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <CheckoutModal event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  )
}

export default CheckoutButton