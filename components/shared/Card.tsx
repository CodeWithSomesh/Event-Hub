import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {DeleteConfirmation} from './DeleteConfirmation'

type CardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  isTicket?: boolean
}

const Card = ({ event, hasOrderLink, isTicket }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event?.organizer?._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-lg
    bg-white shadow-lg transition-all hover:shadow-2xl hover:scale-105 md:min-h-[438px] border-2">
      <Link 
        href={isTicket ? `/tickets/${event._id}` : `/events/${event._id}`} 
        style={{backgroundImage: `url(${event.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {/* If the user is the event organizer, then Update & Delete buttons will be displayed */}
      {isEventCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <Link href={isTicket ? `/tickets/${event._id}` : `/events/${event._id}`} 
        className={`flex flex-col gap-3 p-5 md:gap-6 ${hasOrderLink ? 'min-h-[170px]' : 'min-h-[230px]'}`}
      > 
        

       {<div className="flex gap-2 justify-between">
          {/*Event Price */}
          <span className="p-semibold-16 rounded-full bg-green-100 px-6 py-2 text-green-60">
            {event.isFree ? 'FREE' : `RM ${event.price}`}
          </span>
          {/*Event Category */}
          <p className="p-semibold-14 rounded-full bg-grey-500/10 px-6 py-2 text-grey-500 line-clamp-1 flex items-center ">
            {event.category?.name}
          </p>
        </div>}

        {/*Event Title */}
        <Link href={isTicket ? `/tickets/${event._id}` : `/events/${event._id}`} >
          <p className="p-semibold-16 md:p-semibold-20 flex-1 text-black truncate">{event.eventTitle}</p>
        </Link>

        {/*Event Start Date */}
        <div className='flex gap-1.5'>
          <Image src="/assets/icons/calendar2.svg" alt="search" width={24} height={24} />
          <p className="p-medium-16 p-medium-18 text-grey-500 truncate">
            {formatDateTime(event.startDateTime).dateTime}
          </p>
        </div>
        
        
        {/*Event Location */}
        <div className='flex gap-1'>
          <Image src="/assets/icons/location.svg" alt="search" width={24} height={24} />
          <p className="p-medium-16 p-medium-18 text-grey-500 truncate">
            {event?.location}
          </p>
        </div>
        
        

        {/*Event Order Details */}
        {hasOrderLink ? (
          <Link href={`/orders?eventId=${event._id}`} className="flex gap-2 self-end w-fit mt-4 hover:border-b-black hover:border-b-2">
            <p className="p-medium-16 md:p-medium-18 text-primary">Order Details</p>
            <Image src="/assets/icons/goto.svg" alt="search" width={24} height={24} />
          </Link>
        ) : (
          /*Event Organizer Name */
          <Link href={isTicket ? `/tickets/${event._id}` : `/events/${event._id}`} className="flex gap-1 self-end items-start w-fit mt-4 hover:border-b-black hover:border-b-2">
            <p className="p-medium-16 md:p-medium-18 text-primary">{isTicket ? 'Ticket Details' : 'Learn More'}</p>
            <Image src="/assets/icons/goto.svg" alt="search" width={24} height={24} />
          </Link>
        )}

      </Link>
    </div>
  )
}

export default Card