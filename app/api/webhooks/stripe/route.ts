import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'

export async function POST(request: Request) {
  const body = await request.text()

  const signature = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    const { id, amount_total, metadata, line_items } = event.data.object
    // Retrieve the Checkout Session with expand
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: [ "line_items" ]
    });

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      totalPrice: amount_total ? (amount_total / 100).toString() : '0',
      numOfTickets: line_items[0].quantity,
      createdAt: new Date(),
    }

    

    const newOrder = await createOrder(order)
    return NextResponse.json({ message: 'OK', order: newOrder })
  }

  return new Response('', { status: 200 })
}