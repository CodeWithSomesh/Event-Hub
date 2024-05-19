'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { deleteEvent } from '@/lib/actions/event.actions'
import { deleteOrder } from '@/lib/actions/order.actions'
import Link from 'next/link'

export const DeleteConfirmation = ({ eventId, orderId }: { eventId?: string, orderId?: string }) => {
  const pathname = usePathname()
  // console.log(pathname)
  let [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger className='w-full'>
        {eventId ? (
          <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} />
        ) : (

            <Button className="bg-red-600 font-bold text-2xl py-8 px-8 w-full mt-8 hover:scale-110 hover:bg-red-600 transition-all"> 
              Delete Ticket
            </Button>
          
        )}
        
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            {eventId ? 'This will permanently delete this event' : "This will permanently delete this ticket and you're refund will take up to 7 working days"}
            
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          {eventId ? (
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  await deleteEvent({ eventId, path: pathname })
                })
              }>
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  await deleteOrder({orderId, path: pathname})
                })
              }>
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          )}

          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}