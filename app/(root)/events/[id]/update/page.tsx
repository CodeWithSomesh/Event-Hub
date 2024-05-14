import EventForms from "@/components/shared/EventForms"
import HoverHeader from "@/components/shared/HoverHeader";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from '@clerk/nextjs/server';

type UpdateEventProps = {
  params: {
    id:string
  }
}

const UpdateEvent = async ({params: {id}} : UpdateEventProps) => {

  const {sessionClaims} = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id)

  return (
    <>
      <HoverHeader titlePlaceholder="Update Event" />

      <div className='wrapper my-8'>
        <EventForms userId = {userId} type="Update" event={event} eventId = {event._id}/>
      </div>
    </>
  )
}

export default UpdateEvent