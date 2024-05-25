import CheckoutButton from '@/components/shared/CheckoutButton'
import Collection from '@/components/shared/Collection'
import HoverHeader from '@/components/shared/HoverHeader'
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import {DeleteConfirmation} from '@/components/shared/DeleteConfirmation'
import ShareLink from '@/components/shared/ShareLink'

const EventDetails = async({params: {id}, searchParams}: SearchParamProps) => {
  // Getting Event by their ID
  const event = await getEventById(id)

  // Getting Events with the same category
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId : event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  // Getting users from Clerk 
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event?.organizer?._id.toString();

  return (
    <>
      <section className="flex justify-center  bg-dotted-pattern bg-contain border-b">
          
        {/*Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] md:max-w-7xl">
          <div className="relative">
            {/*Event Image */}
            <Image 
              src={event.imageUrl} alt="hero image" width={1000}
              height={1000} className="h-full min-h-[300px] object-cover object-center"
            />

            {/* If the user is the event organizer, then Update & Delete buttons will be displayed */}
            {isEventCreator && (
              <div className="absolute right-3 top-6 flex rounded-xl bg-white shadow-sm transition-all">

                <Link href={`/events/${event?._id}/update`} className='p-3 rounded-xl hover:scale-110 hover:border-4 hover:border-primary' >
                  <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                </Link>
                
                <div className=''>
                  <DeleteConfirmation eventId={event?._id} />
                </div>

              </div>
            )}
          </div>
          

          <div className="flex w-full flex-col gap-8 p-5 md:px-8">
            <div className="flex flex-col gap-6">
              {/*Event Title */}
              <h2 className='h2-bold'>{event.eventTitle}</h2>

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  {/*Event Price & Category */}
                <div className="flex gap-3 items-center">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-6 py-4 text-green-700">
                    {event.isFree ? 'FREE' : `RM ${(Math.round(Number(event.price))).toString()}`}
                  </p>
                  <p className="p-medium-18 font-semibold rounded-full bg-grey-500/10 px-6 py-4 text-grey-500">
                    {event.category.name}
                  </p>
                </div>


                <CheckoutButton event={event} />
                
              </div>
            </div>

            

            <div className="flex flex-col gap-5">
              {/*Event Start Date & End Date */}
              <div className='flex gap-2 items-center mt-2'>
                <Image src="/assets/icons/calendar2.svg" alt="calendar" width={32} height={32} />

                <p className="p-medium-18 flex flex-wrap md:flex-col items-center justify-center">
                  {formatDateTime(event.startDateTime).dateOnly}, {' '}
                  {formatDateTime(event.startDateTime).timeOnly} 
                </p>

                -
              
                <Image src="/assets/icons/calendar2.svg" alt="calendar" width={32} height={32} />

                <p className="p-medium-18 flex flex-wrap md:flex-col items-center justify-center">
                  {formatDateTime(event.endDateTime).dateOnly}, {' '}
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>

              {/*Event Location */}
              <div className="p-regular-20 flex items-center gap-2 mt-2">
                <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
                <a className="p-medium-18 hover:border-b-black hover:border-b-2 w-fit" href={`https://maps.google.com?q=${event.location}`} target='_blank' rel="noreferrer">{event.location}</a>
              </div>

              {/*Event Organizer's Full Name */}
              <div className="p-regular-20 flex items-center gap-2 mt-2">
                <Image src="/assets/icons/organizer.svg" alt="organizer" width={32} height={32} />

                <p className="p-medium-16 mt-2 sm:mt-0">
                  Organized by{' '}
                  <span className="text-primary-500 p-medium-20">{event.organizer.firstName} {event.organizer.lastName}</span>
                </p>
              </div>

              <div className='mt-4'>
                <p className="p-bold-20 text-grey-600">Share : </p>
                <ShareLink />
              </div>

              <div className='mt-4'>
                <p className="p-bold-20 text-grey-600">Find Out More At : </p>
                <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.url}</p>
              </div>

              <div className='mt-4'>
                <p className="p-bold-20 text-grey-600 mb-2">What You&apos;ll Learn &#58;</p>
                <p className="p-medium-16 lg:p-regular-18 text-justify">{event.description}</p> 
              </div>

            </div>
          </div>
          
        </div>
      </section>

      {/* EVENTS with the same category */}
      <HoverHeader titlePlaceholder='Related Events' buttonPlaceholder='Explore Other Events' link='/events' />

      <section className="wrapper my- flex flex-col gap-8 md:gap-12 mt-4">
        <Collection 
            object={relatedEvents?.data}
            emptyTitle="No Related Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={3}
            page={searchParams.page as string}
            totalPages={relatedEvents?.totalPages}
          />
      </section>
    </>
  )
}

export default EventDetails