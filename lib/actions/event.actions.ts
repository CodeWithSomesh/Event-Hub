'use server'

import { 
  CreateEventParams, DeleteEventParams, 
  GetAllEventsParams, GetEventsByUserParams, 
  GetRelatedEventsByCategoryParams, UpdateEventParams 
} from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import { revalidatePath } from 'next/cache'
import Category from "../database/models/category.model";
import { redirect } from "next/navigation";

// CREATE EVENT
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


// POPULATE EVENT
const populateEvent = async(query:any) => {
    return query
        .populate({path: 'organizer', model: User, select: '_id firstName lastName'})
        .populate({path: 'category', model: Category, select: '_id name'})
}

// GET CATEGORY BY THEIR NAME
const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

// GET ONLY ONE EVENT BY ID
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

// FETCH/GET ALL EVENTS
export const getAllEvents = async ({query, limit, page, category}: GetAllEventsParams) => {

    try{
        //Connect to the Database
        await connectToDatabase();

        const titleCondition = query ? { eventTitle: { $regex: query, $options: 'i' } } : {}
        const categoryCondition = category ? await getCategoryByName(category) : null
        const conditions = {
            $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
        }

        const skipAmount = (Number(page) - 1) * limit
        const eventQuery = Event.find(conditions)
            .sort({createdAt: 'desc'}) // Display the newly added events in the Database first
            .skip(skipAmount)
            .limit(limit);

        const events = await populateEvent(eventQuery)
        const eventCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventCount / limit)
        };
    } catch (error) {
        handleError(error)
    }
}

// DELETE EVENT BY ID
export const deleteEvent = async ({eventId, path} : DeleteEventParams) => {

    try{
        //Connect to the Database
        await connectToDatabase();

        // Finding an event by its ID and Delete it 
        const deletedEvent = await Event.findByIdAndDelete(eventId)

        //After successfully deleting, clear the cache and refetch the events since the events structure has changed
        if (deletedEvent){

          if (path.includes("events")){
            redirect('/events') 
          }
          if (path.includes("profile")){
            redirect('/profile') 
          }
        } 

        return JSON.parse(JSON.stringify(deletedEvent));
    } catch (error) {
        handleError(error)
    }
}

// UPDATE EVENT
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
    try {
      //Connect to the Database
      await connectToDatabase()
      
      // Finding an event by its ID 
      const eventToUpdate = await Event.findById(event._id)

      //If no events with given ID display error message
      if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
        throw new Error('Unauthorized or event not found')
      }
      
      //Update the Event Details
      const updatedEvent = await Event.findByIdAndUpdate(
        event._id,
        { ...event, category: event.categoryId },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
      handleError(error)
    }
  }


// GET EVENTS BY ORGANIZER
export async function getEventsByUser({ userId, limit = 3, page }: GetEventsByUserParams) {
    try {
      //Connect to the Database
      await connectToDatabase()
  
      const conditions = { organizer: userId }
      const skipAmount = (page - 1) * limit
  
      const eventsQuery = Event.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateEvent(eventsQuery)
      const eventsCount = await Event.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }
  
  // GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
  export async function getRelatedEventsByCategory({
    categoryId,
    eventId,
    limit = 3,
    page = 1,
  }: GetRelatedEventsByCategoryParams) {
    try {
      //Connect to the Database
      await connectToDatabase()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }
    
      const eventsQuery = Event.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateEvent(eventsQuery)
      const eventsCount = await Event.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }