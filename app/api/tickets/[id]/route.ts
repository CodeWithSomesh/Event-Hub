import { NextResponse } from 'next/server';
import { handleError } from '@/lib/utils';
import { getOrderById, getOrdersByEvent, getOrdersByUser } from '@/lib/actions/order.actions';


export async function GET(request: Request) {
    try {
        const { pathname } = new URL(request.url);
        
        // Extract the order ID from the URL
        const pathSegments = pathname.split('/');
        const orderId = pathSegments[pathSegments.length - 1];
        
        if (orderId) {
            const order = await getOrderById(orderId);
            return NextResponse.json(order);
        }
        
        return new Response('Order ID is required', { status: 400 });
    } catch (error) {
        handleError(error);
        return new Response('Error occurred while fetching order', { status: 500 });
    }
}