// Requiring Schema model from Mongoose 
import { Document, Schema, model, models } from "mongoose"

// Defining the types using Typescript 
export interface IEvent extends Document{
    _id: string,
    title: string;
    description?: string;
    location?: string;
    createdAt?: Date;
    imageURL: string;
    startDateTime: Date;
    endDateTime: Date;
    price?: string;
    isFree: boolean;
    url?: string;
    category?: {_id: string, name: string}; 
    organizer?: {_id: string, firstName: string, lastName: string};
}


// Settin up the User Schema
const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    location: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    imageURL: {
        type: String,
        required: true,
    },

    startDateTime: {
        type: Date,
        default: Date.now
    },

    endDateTime: {
        type: Date,
        default: Date.now
    },

    price: {
        type: String,
    },

    isFree: {
        type: Boolean,
        default: false
    },

    url: {
        type: String,
    },

    category: {
        type: Schema.Types.ObjectId, // Will be connecting to other Model in the Database
        ref: 'Category'
    },

    organizer: {
        type: Schema.Types.ObjectId, // Will be connecting to other Model in the Database
        ref: 'User'
    },
})

// Exporting the EventSchema 
const Event = models.Event || model('User', EventSchema) // Use existing Model if got,if not create a new Model

export default Event;