import EventForms from "@/components/shared/EventForms"
import { Boxes } from "@/components/ui/background-boxes";
import { auth } from '@clerk/nextjs/server';
import { cn } from "@/lib/utils";
import HoverHeader from "@/components/shared/HoverHeader";

const PublishEvent = () => {

  const {sessionClaims} = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>

      <HoverHeader titlePlaceholder="Publish Event" />

      <div className='wrapper my-8'>
        <EventForms userId = {userId} type="Publish"/>
      </div>
    </>
  )
}

export default PublishEvent