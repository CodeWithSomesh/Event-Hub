import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text()


  const signature = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  // Create an order if the eventType is as below
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object
   

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      price: metadata?.price || '0',
      numOfTickets: metadata?.numOfTickets || '0',
      totalPrice: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    }

    

    const newOrder = await createOrder(order)
    return NextResponse.json({ message: 'OK', order: newOrder })
  }

  return new Response('', { status: 200 })
}