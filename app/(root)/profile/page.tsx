import Collection from '@/components/shared/Collection'
import HoverHeader from '@/components/shared/HoverHeader'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const page = async ({ searchParams }: SearchParamProps) => {
    // Getting the ID of an user 
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;

    const orders = await getOrdersByUser({ userId, page: ordersPage})

    const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
    const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

  return (
    <>
      {/* My Tickets */}
      <HoverHeader titlePlaceholder='My Tickets' buttonPlaceholder='Explore More Events' link='/events'/>


      <section className="wrapper my-8">
        <Collection 
          object={orders?.data}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          link='/events'
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* My Events */}
      <HoverHeader titlePlaceholder='My Events' buttonPlaceholder='Publish New Event' link='/events/publish'/>

      <section className="wrapper my-8">
        <Collection 
          object={organizedEvents?.data}
          emptyTitle="No events have been published yet"
          emptyStateSubtext="Let's host some now!"
          link='/events/publish'
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default page