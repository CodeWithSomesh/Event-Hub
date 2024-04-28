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

 

type EventFormProps = {
    userId: string;
    type: "Publish" | "Update"
}

const EventForms = ({userId, type}: EventFormProps) => {
  
  const [files, setFiles] = useState<File[]>([])
  const initialValues = eventDefaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

        <div className="flex flex-col gap-5 md:flex-row">

            <FormField
                control={form.control}
                name="eventTitle"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="Event Title (eg: Ballet Dance Show at SPICE Stadium, Penang)" 
                            className="input-field"
                            {...field} 
                        />
                    </FormControl>
                    <FormDescription>
                        This is your Event display name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Event Category</FormLabel>
                    <FormControl>
                        <Dropdown onChangeHandler={field.onChange} value={field.value} />
                    </FormControl>
                    <FormDescription>
                        This is your Event display name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
            
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Event Title</FormLabel>
                <FormControl className="h-72">
                    <Textarea 
                        placeholder="Event Description (eg: Dancing Queens Ballet Dance Show 2024 ...)" 
                        className="textarea rounded-2xl"
                        {...field} 
                    />
                </FormControl>
                <FormDescription>
                    This is your Event display name.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Event Title</FormLabel>
                <FormControl className="h-72">
                    <FileUploader 
                      onFieldChange = {field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                </FormControl>
                <FormDescription>
                    This is your Event display name.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
          />
        </div>

        
        <Button type="submit" className="bg-primary font-bold text-2xl py-8 w-full px-8 place-self-center hover:bg-black hover:text-primary">Submit</Button>
      </form>
    </Form>
  )
}

export default EventForms