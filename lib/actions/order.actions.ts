"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Event from '../database/models/event.model';
import {ObjectId} from 'mongodb';
import User from '../database/models/user.model';
import Category from "../database/models/category.model";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // If users select free then price is 0, 
  // if not take the price user given and x100 because Stripe take the money in cents 
  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    // Create Checkout Sessions from body params
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.eventTitle
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}

export const createOrder = async (order: CreateOrderParams) => {
  try {
    //Connect to the Database
    await connectToDatabase();
    
    // Create an order 
    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY EVENT FOR THE ORGANIZERS TO SEE BOUGHT TICKET DETAILS
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
  try {
    //Connect to the Database
    await connectToDatabase()

    if (!eventId) throw new Error('Event ID is required')
    const eventObjectId = new ObjectId(eventId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event',
        },
      },
      {
        $unwind: '$event',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: '$event.eventTitle',
          eventId: '$event._id',
          buyerId: '$buyer._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER TO DISPLAY THEIR TICKETS IN THE PROFILE PAGE
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    //Connect to the Database
    await connectToDatabase()
    
    //Implementing Paginations
    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('event._id')
      .find(conditions) // Find userIds that have bought this ticket 
      .sort({ createdAt: 'desc' }) // Sort it by the latest tickets first 
      .skip(skipAmount)
      .limit(limit) // Limit to 3 per page
      .populate({ // Populate it with extra attributes
        path: 'event',
        model: Event,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })
    const ordersCount = await Order.distinct('event._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
// POPULATE EVENT
const populateOrder = async(query:any) => {
  return query
      .populate({path: 'buyer', model: User, select: '_id firstName lastName email'})
      .populate({path: 'event', model: Event, select: '_id eventTitle location startDateTime endDateTime organizer'})
}

// GET ONLY ONE EVENT BY ID
export const getOrderById = async (eventID: string, userId: string) => {

  try{
      
      //Connect to the Database
      await connectToDatabase();

      // Finding an Order by its ID, then populate it
      const order = await populateOrder(Order.findById(eventID))

      // If there is no such event then display this error
      if (!order){
          throw new Error('Order by the given ID is not found in Database')
      }

      console.log(order)

      return JSON.parse(JSON.stringify(order));
  } catch (error) {
      handleError(error)
  }
}