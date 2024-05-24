import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {DeleteConfirmation} from './DeleteConfirmation'
import { IOrder } from '@/lib/database/models/order.model'

type CardProps = {
  event: IEvent,
  order?:IOrder,
  hasOrderLink?: boolean,
  isTicket?: boolean,
}

const Card = ({ event, hasOrderLink, isTicket, order }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event?.organizer?._id.toString();

  return (
    <div className={`group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-lg
    bg-white shadow-lg transition-all hover:shadow-2xl hover:scale-105 md:min-h-[550px] border-2 ${isTicket ? 'md:min-h-[500px]' : ''}`}>
      <Link 
        href={isTicket ? `/tickets/${order?._id}` : `/events/${event?._id}`} 
        style={isTicket ? {backgroundImage: `url(https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${event?.imageUrl})`} :{backgroundImage: `url(${event?.imageUrl})`}}
        className={`flex-center flex-grow bg-no-repeat bg-center ${isTicket ? 'border-primary border-4 rounded-t-md':'bg-cover bg-gray-50  text-grey-500'}`}
      />

      {/* If the user is the event organizer, then Update & Delete buttons will be displayed */}
      {!isTicket && isEventCreator && (
        <div className="absolute right-3 top-4 flex  rounded-xl bg-white shadow-sm transition-all">

          <div className='p-3 rounded-xl hover:scale-110 hover:border-4 hover:border-primary'>
            <Link href={`/events/${event?._id}/update`} >
              <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
            </Link>
          </div>
          
          <div className=''>
            <DeleteConfirmation eventId={event?._id} />
          </div>

        </div>
      )}

      {/* Conditional rendering: If not tickets then run this */}
      <Link href={isTicket ? `/tickets/${order?._id}` : `/events/${event?._id}`} 
        className={`flex flex-col gap-3 p-5 md:gap-6 min-h-[250px]`}
      > 

       {!isTicket && 
       <div className="flex gap-2 justify-between">
          {/*Event Price */}
          <span className="p-semibold-16 rounded-full bg-green-100 px-6 py-2 text-green-60">
            {event?.isFree ? 'FREE' : `RM ${event?.price}`}
          </span>
          {/*Event Category */}
          <p className="p-semibold-14 rounded-full bg-grey-500/10 px-6 py-2 text-grey-500 line-clamp-1 flex items-center ">
            {event?.category?.name}
          </p>
        </div>}

        {/*Event Title */}
        <Link href={isTicket ? `/tickets/${order?._id}` : `/events/${event?._id}`} >
          <p className="p-semibold-16 md:p-semibold-20 flex-1 text-black truncate">{event?.eventTitle}</p>
        </Link>

        {/*Event Start Date */}
        <div className='flex gap-1.5'>
          <Image src="/assets/icons/calendar2.svg" alt="search" width={24} height={24} />
          <p className="p-medium-16 p-medium-18 text-grey-500 truncate">
            {formatDateTime(event?.startDateTime).dateTime}
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
          <Link href={`/orders?eventId=${event?._id}`} className="flex gap-2 self-end w-fit mt-4 hover:border-b-black hover:border-b-2">
            <p className="p-medium-16 md:p-medium-18 text-primary">Order Details</p>
            <Image src="/assets/icons/goto.svg" alt="search" width={24} height={24} />
          </Link>
        ) : (
          /*Event Link */
          <Link href={isTicket ? `/tickets/${order?._id}` : `/events/${event?._id}`} className="flex gap-1 self-end items-start w-fit mt-4 hover:border-b-black hover:border-b-2">
            <p className="p-medium-16 md:p-medium-18 text-primary">{isTicket ? 'Ticket Details' : 'Learn More'}</p>
            <Image src="/assets/icons/goto.svg" alt="search" width={24} height={24} />
          </Link>
        )}

      </Link>
    </div>
  )
}

export default Card