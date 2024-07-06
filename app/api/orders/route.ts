import { NextResponse } from 'next/server';
import { handleError } from '@/lib/utils';
import { checkoutOrder, createOrder, deleteOrder, getOrdersByEvent, getOrdersByUser, getOrderById } from '@/lib/actions/order.actions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updatedOrder = await createOrder(body);
    return NextResponse.json(updatedOrder);
  } catch (error) {
    handleError(error);
    return new Response('Error occurred while creating order', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { orderId } = await request.json();
    const deletedOrder = await deleteOrder({ orderId, path: request.url });
    return NextResponse.json(deletedOrder);
  } catch (error) {
    handleError(error);
    return new Response('Error occurred while deleting order', { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === '/api/orders') {
    try {
      const eventId = url.searchParams.get('eventId') || '';
      const searchString = url.searchParams.get('searchString') || ''; // Default value for searchString
      if (!eventId) {
        throw new Error('Event ID is required');
      }
      const orders = await getOrdersByEvent({ eventId, searchString });
      return NextResponse.json(orders);
    } catch (error) {
      handleError(error);
      return new Response('Error occurred while fetching orders by event', { status: 500 });
    }
  }

  return new Response('Invalid request', { status: 400 });
}


