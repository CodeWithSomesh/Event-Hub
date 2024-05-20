import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './Card'
import Pagination from './Pagination'
import { IOrder } from '@/lib/database/models/order.model'
import Link from 'next/link'
import Image from 'next/image'

type CollectionProps = {
    object: IEvent[] | IOrder[],
    emptyTitle: string, 
    emptyStateSubtext: string,
    link?: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events',
    ticketID?: string,
}

const Collection = ({object, emptyTitle, emptyStateSubtext, page, totalPages = 0,
    collectionType, urlParamName, ticketID, link}: CollectionProps) => {
  return (
    <>
       {/*If there is more than 0 event then display the design below */}
      {object?.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {object.map((data:any) => {
              const hasOrderLink = collectionType === 'Events_Organized';
              const isTicket = collectionType === 'My_Tickets';

              return (
                <li key={data._id} className="flex justify-center">
                  <Card event={!isTicket ? data : data.event} hasOrderLink={hasOrderLink} isTicket={isTicket} order={data} />
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
        </div>)
        // If there is 0 events then display the design below 
        : ( 
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h3-bold">{emptyTitle}</h3>
          {link ? (
            // <Link href={link} className="p-medium-14 md:p-medium-18 text-primary hover:border-b-black hover:border-b-2">{emptyStateSubtext}</Link>
            <Link href={link} className="flex gap-1 items-center w-fit hover:border-b-black hover:border-b-2">
              <p className="p-medium-16 md:p-medium-18 text-primary">{emptyStateSubtext}</p>
              <Image src="/assets/icons/goto.svg" alt="search" width={20} height={20} />
            </Link>
          ) : (
            <p className="p-medium-14 md:p-medium-18 text-primary">{emptyStateSubtext}</p>
          ) }
          
        </div>
      )} 
    </>
  )
}

export default Collection