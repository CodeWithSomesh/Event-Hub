import { z } from "zod"
// Validation for all form inputs in Publish/Update Event Page 
export const eventFormSchema = z.object({
    eventTitle: z.string().min(10, {
      message: "Event Title must be at least 10 characters.",
    }),
    description: z.string().min(3, 'Description must be at least 20 characters').max(800, 'Description must be less than 800 characters'),
    location: z.string().min(10, 'Location must be at least 10 characters').max(400, 'Location must be less than 400 characters'),
    imageUrl: z.string(),
    startDateTime: z.date().min(new Date()).max(new Date('2025-01-01'), 'Do not select a date too far in the future'),
    endDateTime: z.date().min(new Date()).max(new Date('2025-01-01'), 'Do not select a date too far in the future'),
    categoryId: z.string().min(1, 'Please select a category'),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
}).refine(data => data.startDateTime < data.endDateTime,
  {
    path: [ 'endDateTime' ],
    message: 'End date must be after start date',
  }
)

