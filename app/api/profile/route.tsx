import { NextRequest, NextResponse } from 'next/server';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { handleError } from '@/lib/utils';
import { getAuth } from '@clerk/nextjs/server';


export async function GET(request: NextRequest) {
    const { userId } = getAuth(request);


  try {
    

    if (!userId) {
      throw new Error('User ID is required');
    }

    const orders = await getOrdersByUser({ userId, page: null });
    return NextResponse.json(orders);
  } catch (error) {
    handleError(error);
    return new Response('Error occurred while fetching orders by user', { status: 500 });
  }
}

