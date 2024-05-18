import CheckoutButton from '@/components/shared/CheckoutButton'
import Collection from '@/components/shared/Collection'
import HoverHeader from '@/components/shared/HoverHeader'
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const TicketDetails = async({params: {id}, searchParams}: SearchParamProps) => {
  const event = await getEventById(id)

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId : event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain border-b mb-8">
          
        {/*Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] md:max-w-7xl">
          {/*Event Image */}
          <Image 
            src={event.imageUrl} alt="hero image" width={1000}
            height={1000} className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:px-8">
            <div className="flex flex-col gap-6">
              {/*Event Title */}
              <h2 className='h2-bold'>{event.eventTitle}</h2>

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  {/*Event Price & Category */}
                <div className="flex gap-3 items-center">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-6 py-4 text-green-700">
                    {event.isFree ? 'FREE' : `RM ${event.price}`}
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
                <p className="p-medium-18">{event.location}</p>
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

      <HoverHeader titlePlaceholder='Event Details' />

      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain border-b mb-8">
          
        {/*Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] md:max-w-7xl">
          {/*Event Image */}
          <Image 
            src={event.imageUrl} alt="hero image" width={1000}
            height={1000} className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:px-8">
            <div className="flex flex-col gap-6">
              {/*Event Title */}
              <h2 className='h2-bold'>{event.eventTitle}</h2>

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  {/*Event Price & Category */}
                <div className="flex gap-3 items-center">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-6 py-4 text-green-700">
                    {event.isFree ? 'FREE' : `RM ${event.price}`}
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
                <p className="p-medium-18">{event.location}</p>
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
    </>
  )}

export default TicketDetails