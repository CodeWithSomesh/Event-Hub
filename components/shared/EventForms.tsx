'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"


type EventFormProps = {
    userId: string;
    type: "Publish" | "Update"
    event?: IEvent
    eventId?: string
}

const EventForms = ({userId, type, event, eventId}: EventFormProps) => {
  
  const [files, setFiles] = useState<File[]>([])
  // If organizer updating event details, then fetch the details in the databse to the forms
  const initialValues = event && type === 'Update' 
    ? {
      ...event,
      startDateTime: new Date(event.startDateTime),
      endDateTime: new Date(event.endDateTime)
    }
    : eventDefaultValues;

  const router = useRouter()

  const {startUpload} = useUploadThing('imageUploader')

  // 1. Define your form.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    let uploadedImageUrl = values.imageUrl
    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages){
        return
      }
      uploadedImageUrl = uploadedImages[0].url
    }

    if(type === 'Publish'){
      try {

        const newEvent = await createEvent({
          event: {...values, imageUrl: uploadedImageUrl},
          userId, 
          path: '/profile'
        })

        if(newEvent){
          console.log('New event succesfully added in database')
          form.reset()
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if(type === 'Update'){

      if(!eventId){
        router.back()
        return;
      }

      try {

        const updatedEvent = await updateEvent({
          userId,
          event: {...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`
        })

        if(updatedEvent){
          console.log('Event details updated in database')
          form.reset()
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 md:gap-10">

        <div className="flex flex-col gap-10 md:flex-row">
            {/* Event Title Form */}
            <FormField
                control={form.control}
                name="eventTitle"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                    <div className="flex-center h-[60px] w-full overflow-hidden rounded-md border bg-primary-50 px-4 py-2">
                        <Image
                          src="/assets/icons/title.svg"
                          alt="Event Title"
                          width={24}
                          height={24}
                        />

                        <Input 
                          placeholder="Example: Ballet Dance Show at SPICE Stadium, Penang" 
                          className="input-field border-none"
                          {...field} 
                        />
                      </div>
                      
                    </FormControl>
                    
                    <FormMessage />
                    </FormItem>
                )}
            />

            {/* Event Category Form */}
            <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Event Category</FormLabel>
                    <FormControl>
                        <Dropdown onChangeHandler={field.onChange} value={field.value} />
                    </FormControl>
                    
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className="flex flex-col gap-10 md:flex-row">
          {/* Event Description Form */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Event Description</FormLabel>
                <FormControl className="h-72">
                    <Textarea 
                        placeholder="Example: Dancing Queens Ballet Dance Show 2024 ..." 
                        className="textarea"
                        {...field} 
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
          />
          
          {/* Event Image URL Form */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Event Image</FormLabel>
                <FormControl className="h-72">
                    <FileUploader 
                      onFieldChange = {field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
          />
        </div>
        
        {/* Event Location Form */}
        <div className="flex flex-col gap-10 md:flex-row">
          <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Event Location</FormLabel>
                  <FormControl>
                    <div className="flex-center h-[60px] w-full overflow-hidden rounded-md border bg-primary-50 px-4 py-2">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="location"
                        width={24}
                        height={24}
                      />

                      <Input placeholder="Example: Online / SPICE Arena, Penang, Malaysia" {...field} className="input-field border-none" />
                    </div>

                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        
        <div className="flex flex-col gap-10 md:flex-row">

          {/* Event Start Date Form */}
          <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Event Start Date & Time</FormLabel>
                  <FormControl>
                    <div className="flex-center h-[60px] w-full overflow-hidden rounded-md border bg-primary-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar2.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />

                      <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>

                      <DatePicker 
                        selected={field.value} onChange={(date: Date) => field.onChange(date)} 
                        showTimeSelect timeInputLabel="Time:" dateFormat='MM/dd/yyyy h:mm aa'
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

          {/* Event End Date Form */}
          <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Event End Date & Time</FormLabel>
                  <FormControl>
                    <div className="flex-center h-[60px] w-full overflow-hidden rounded-md border bg-primary-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar2.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />

                      <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>

                      <DatePicker 
                        selected={field.value} onChange={(date: Date) => field.onChange(date)} 
                        showTimeSelect timeInputLabel="Time:" dateFormat='MM/dd/yyyy h:mm aa'
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="flex flex-col gap-10 md:flex-row">
            {/* Event Price Form */}
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Event Price</FormLabel>
                    <FormControl>
                      <div className="flex-center h-[60px] w-full overflow-hidden rounded-md border bg-primary-50 px-4 py-2">
                        <Image
                          src="/assets/icons/money.svg"
                          alt="dollar"
                          width={28}
                          height={28}
                        />

                        <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-primary-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                        <FormField
                          control={form.control}
                          name="isFree"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center">
                                  <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                                  <Checkbox
                                    onCheckedChange={field.onChange}
                                    checked={field.value}
                                  id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                                </div>
            
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />   
                      </div>

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            {/* Event URL Form */}
            <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Event URL</FormLabel>
                    <FormControl>
                      <div className="flex-center h-[60px] w-full overflow-hidden rounded-md border bg-primary-50 px-4 py-2">
                        <Image
                          src="/assets/icons/url.svg"
                          alt="calendar"
                          width={24}
                          height={24}
                        />

                        <Input placeholder="Example: https://www.google.com" {...field} className="input-field border-none" />
                      </div>
                    </FormControl>
                    
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting} className="bg-primary font-bold text-2xl py-8 w-full px-8 place-self-center hover:bg-black hover:text-primary sm:mt-0 mt-4">
          {form.formState.isSubmitting ? 'Submitting' : `${type} Event`}
        </Button>
      </form>
    </Form>
  )
}

export default EventForms