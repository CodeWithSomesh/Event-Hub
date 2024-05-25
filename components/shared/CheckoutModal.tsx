import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { IEvent } from '@/lib/database/models/event.model'
import React, { useEffect, useState } from 'react'
// import { Button } from '../ui/button'
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.actions';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutModal({event, userId} : {event: IEvent, userId: string}) {


    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [ticketsNum, setTicketsNum] = useState<string>("0")

    useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
        console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
        console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
    }, []);


    const onCheckOut = async () => {
    
        const order = {
            eventTitle: event.eventTitle,
            eventId: event._id,
            price: event.price,
            numOfTickets: ticketsNum,
            totalPrice: (Number(event.price) * Number(ticketsNum)).toString(),
            isFree: event.isFree,
            buyerId: userId
        }

        await checkoutOrder(order)
    }


  return (
    <>
        <Button onPress={onOpen}  className="bg-primary text-white rounded-md text-lg md:text-2xl font-bold px-4 py-7 hover:bg-black hover:text-primary sm:w-fit'">
            Buy Ticket
        </Button>
        <Modal 
            backdrop="opaque" isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            classNames={{
                body: "py-6",
                backdrop: "bg-black/70 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] ",
                header: "border-b-[1px] border-[#292f46] text-2xl",
                closeButton: "hover:bg-black/20 active:bg-black/10 hidden",
        }}>
            <ModalContent className="w-[35%] bg-white rounded-md">
                {(onClose) => (
                    <>
                    <ModalHeader className="flex justify-between">
                        <p className="font-bold">{event.isFree ? 'Get Ticket' : 'Buy Ticket'}</p>
                        <p className="text-primary">RM {Math.round(Number(event.price)).toString()}
                            <span className="text-black text-lg"> /ticket</span>
                        </p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex justify-between gap-4 items-center mt-4 mb-10">
                            <p className="text-lg">Number Of Tickets</p>
                            <Input
                                type="number" onChange={e => setTicketsNum(e.target.value)}
                                placeholder=" Tickets"
                                variant="bordered"
                                labelPlacement="inside" className="border-black border-2 rounded-lg w-[20%] flex-center overflow-hidden bg-primary-50"
                            />
                        </div>
                        <div className="flex justify-between gap-4 items-center">
                            <p className="text-lg">RM {Math.round(Number(event.price)).toString()} x {ticketsNum} {Number(ticketsNum) > 1 ? 'tickets' : 'ticket'}</p>
                            
                            <p className="text-3xl font-bold underline">RM {Number(ticketsNum) * Number(event.price)}</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onPress={onClose} className="bg-primary-50 border-2 border-black rounded-md text-lg md:text-xl font-bold py-6  hover:bg-red-500 hover:text-white sm:w-fit'">
                            Cancel
                        </Button>
                        <Button color="primary" onPress={onCheckOut} className="bg-primary text-white rounded-md text-lg md:text-xl font-bold py-[26px]  hover:bg-black hover:text-primary sm:w-fit">
                            {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
  )
}
