import { NextResponse } from 'next/server';
import { createEvent, getEventById, updateEvent, deleteEvent, getAllEvents } from '@/lib/actions/event.actions';
import { handleError } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const { searchParams, pathname } = new URL(request.url);

    // Handle getting all events
    if (pathname === '/api/events') {
      const query = searchParams.get('query') || '';
      const limit = parseInt(searchParams.get('limit') || '6');
      const page = parseInt(searchParams.get('page') || '1');
      const category = searchParams.get('category') || '';

      const eventsData = await getAllEvents({ query, limit, page, category });
      return NextResponse.json(eventsData);
    }

    // Handle getting a specific event by ID
    const pathSegments = pathname.split('/');
    const eventId = pathSegments[pathSegments.length - 1];
    if (eventId && pathname.startsWith('/api/events/')) {
      const event = await getEventById(eventId);
      return NextResponse.json(event);
    }

    return new Response('Invalid request', { status: 400 });
  } catch (error) {
    handleError(error);
    return new Response('Error occurred', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const eventDetails = await request.json();
    const newEvent = await createEvent(eventDetails);
    return NextResponse.json(newEvent);
  } catch (error) {
    handleError(error);
    return new Response('Error occurred', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const eventDetails = await request.json();
    const { eventId, path } = eventDetails;
    const updatedEvent = await updateEvent({ eventId, ...eventDetails });
    return NextResponse.json(updatedEvent);
  } catch (error) {
    handleError(error);
    return new Response('Error occurred', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { pathname } = new URL(request.url);
    const pathSegments = pathname.split('/');
    const eventId = pathSegments[pathSegments.length - 1];
    if (eventId) {
      const deletedEvent = await deleteEvent({ eventId, path: request.url });

      return NextResponse.json(deletedEvent);
    } else {
      return new Response('Event ID is required', { status: 400 });
    }
  } catch (error) {
    handleError(error);
    return new Response('Error occurred', { status: 500 });
  }
}
