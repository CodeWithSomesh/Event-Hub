'use server'

import { CreateEventParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import { revalidatePath } from 'next/cache'
import Category from "../database/models/category.model";

export const createEvent = async ({event, userId, path}: CreateEventParams) => {

    try{
        //Connect to the Database
        await connectToDatabase();

        // Finding who published this event 
        const organizer =  await User.findById(userId)
        if(!organizer){
            throw new Error("Organizer not found");

        }
        const newEvent = await Event.create({...event, category: event.categoryId, organizer: userId})

        revalidatePath(path)

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error)
    }
}



const populateEvent = async(query:any) => {
    return query
        .populate({path: 'organizer', model: User, select: '_id firstName lastName'})
        .populate({path: 'category', model: Category, select: '_id name'})
}

export const getEventById = async (eventId: string) => {

    try{
        //Connect to the Database
        await connectToDatabase();

        // Finding an event by its ID
        const event = await populateEvent(Event.findById(eventId))

        // If there is no such event then display this error
        if (!event){
            throw new Error('Event not found in Database')
        }

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error)
    }
}