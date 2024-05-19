import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './Card'
import Pagination from './Pagination'
import { IOrder } from '@/lib/database/models/order.model'

type CollectionProps = {
    object: IEvent[] | IOrder[],
    emptyTitle: string, 
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events',
    ticketID?: string,
}

const Collection = ({object, emptyTitle, emptyStateSubtext, page, totalPages = 0,
    collectionType, urlParamName, ticketID}: CollectionProps) => {
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
                  <Card event={data} hasOrderLink={hasOrderLink} isTicket={isTicket} order={data} />
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
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )} 
    </>
  )
}

export default Collection