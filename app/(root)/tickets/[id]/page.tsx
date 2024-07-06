import CheckoutButton from '@/components/shared/CheckoutButton'
import Collection from '@/components/shared/Collection'
import HoverHeader from '@/components/shared/HoverHeader'
import { auth } from '@clerk/nextjs/server'
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { getOrderById } from '@/lib/actions/order.actions'
import { formatDateTime } from '@/lib/utils'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import React from 'react'

import { DeleteConfirmation } from '@/components/shared/DeleteConfirmation'
import ShareLink from '@/components/shared/ShareLink'

const TicketDetails = async({params: {id}, searchParams}: SearchParamProps) => {
  // Getting the ID of an user 
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  
  const order = await getOrderById(id)
  const event = await getEventById(order.event._id)

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId : event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  return (
    <>
      {/*Title */}
      {/* <HoverHeader titlePlaceholder='Ticket Details'/> */}

      <section className="flex justify-center bg-dotted-pattern bg-contain border-b md:py-8">
          
        {/*Ticket Details */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8 md:max-w-7xl md:w-full">

          <div className='mx-auto my-5 md:my-8 flex flex-col justify-between'>
            <div>
              {/*Ticket QR Code Image*/}
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${event.eventTitle}`} 
                alt="hero image" className="min-h-[450px] mb-6 border-8 p-2 border-primary rounded-md"
              />
              {/*Ticket ID*/}
              <p className="font-normal text-center">Ticket ID: {order._id}</p>
            </div>

            {/*Delete Ticket Button*/}
            <DeleteConfirmation orderId={order._id} />

          </div>

          <div className="flex w-full flex-col gap-8 p-5 md:px-8">
    
            <div className="flex flex-col gap-5 py-2">
              
              {/*Event Title */}
              <div className="gap-2 mt-2">
                <p className=" p-regular-16 text-gray-400">Event Name</p>
                <p className="text-xl font-medium">{event.eventTitle}</p>
              </div>

              {/*Event ID */}
              <div className="gap-2 mt-2">
                <p className=" p-regular-16 text-gray-400">Event ID</p>
                <p className="text-xl font-medium">{event._id}</p>
              </div>

              {/*Event Location */}
              <div className="gap-2 mt-2">
                <p className=" p-regular-16 text-gray-400">Event Location</p>
                <p className="text-xl font-medium">{event.location}</p>
              </div>

              {/*Event Dates  */}
              <div className="grid grid-cols-[55%_45%] gap-6 mt-2 justify-between">
                <div className=''>
                  <p className=" p-regular-16 text-gray-400">Event Start Date</p>
                  <p className="text-xl font-medium">
                    {formatDateTime(event.startDateTime).dateOnly}, {' '}
                    {formatDateTime(event.startDateTime).timeOnly} 
                  </p>
                </div>

                <div className=''>
                  <p className=" p-regular-16 text-gray-400">Event End Date</p>
                  <p className="text-xl font-medium">
                    {formatDateTime(event.endDateTime).dateOnly}, {' '}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div> 
              </div>

              {/*Dashed Border  */}
              <div className='border-2 border-primary border-dashed my-4'></div>

              {/*Participant Name & ID  */}
              <div className="grid grid-cols-[55%_45%] gap-6 justify-between">
                <div className=''>
                  <p className=" p-regular-16 text-gray-400">Participant Name</p>
                  <p className="text-xl font-medium">
                    {order.buyer.firstName} {' '} {order.buyer.lastName}
                  </p>
                </div>

                <div className=''>
                  <p className=" p-regular-16 text-gray-400">Participant ID</p>
                  <p className="text-xl font-medium">
                    {order.buyer._id}
                  </p>
                </div> 
              </div>

              {/*Participant Email & Purchase Ticket Date  */}
              <div className="grid grid-cols-[55%_45%] gap-6 justify-between ">
                <div className=''>
                  <p className=" p-regular-16 text-gray-400">Participant Email</p>
                  <p className="text-xl font-medium break-words">
                    {order.buyer.email}
                  </p>
                </div>

                <div className=''>
                  <p className=" p-regular-16 text-gray-400">Purchase Date</p>
                  <p className="text-xl font-medium">
                    {formatDateTime(order.createdAt).dateOnly}
                  </p>
                </div> 
              </div>

              {/*Dashed Border  */}
              <div className='border-2 border-primary border-dashed my-4'></div>

              {/*Single Ticket Price & Number Of Tickets */}
              <div className="grid grid-cols-[55%_45%] gap-6 justify-between ">
                <div className=''>
                  <p className=" p-regular-16 text-gray-400">Ticket Price</p>
                  <p className="text-xl font-medium break-words">
                    RM {Math.round(Number(order.price)).toString()}
                  </p>
                </div>

                <div className=''>
                  <p className=" p-regular-16 text-gray-400">Number of Tickets</p>
                  <p className="text-xl font-medium">
                    {order.numOfTickets} tickets
                  </p>
                </div> 
              </div>

              {/*Participant Email & Purchase Ticket Date  */}
              <div className="grid grid-cols-[55%_45%] gap-6 mt-4 justify-between items-center">
                  <p className="p-semibold-20 text-gray-400">Total Price:</p>
                  <div className='flex justify-between border-y-2 border-black py-2 p-bold-24 text-primary'>
                    <p className="">RM</p>
                    <p className=''>{Number(order.totalPrice).toLocaleString()}</p>
                  </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <HoverHeader titlePlaceholder='Event Details' />

      <section className="flex justify-center bg-dotted-pattern bg-contain border-b">
          
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
                <p className="p-bold-20 text-grey-600">Share Via : </p>
                <ShareLink event={event} />
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
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={3}
            page={searchParams.page as string}
            totalPages={relatedEvents?.totalPages}
          />
      </section>
    </>
  )}

export default TicketDetails