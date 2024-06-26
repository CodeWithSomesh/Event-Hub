import { Schema, model, models, Document } from 'mongoose'

// Defining & Exporting Types 
export interface IOrder extends Document {
  createdAt: Date
  stripeId: string
  totalPrice: string
  numOfTickets: string
  price: string
  event: {
    _id: string
    eventTitle: string
  }
  buyer: {
    _id: string
    firstName: string
    lastName: string
  }
}

// Defining & Exporting Types 
export type IOrderItem = {
  _id: string
  totalPrice: string
  price: string
  numOfTickets: string
  createdAt: Date
  eventTitle: string
  eventId: string
  buyer: string
}

// Settin up the Order Schema
const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
  },
  numOfTickets: {
    type: String,
  },
  totalPrice: {
    type: String,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Order = models.Order || model('Order', OrderSchema) // Use existing Model if got,if not create a new Model

export default Order // Exporting the OrderSchema 