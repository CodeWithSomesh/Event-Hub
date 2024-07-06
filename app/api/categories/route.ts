import { NextResponse } from 'next/server';
import { createCategory, getAllCategories } from '@/lib/actions/category.actions';
import { handleError } from '@/lib/utils';

export async function POST(request: Request) {
    try {
        const categoryDetails = await request.json();
        const newCategory = await createCategory(categoryDetails);
        return NextResponse.json(newCategory);
    } catch (error) {
        handleError(error);
        return new Response('Error occurred', { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const categories = await getAllCategories();
        return NextResponse.json(categories);
    } catch (error) {
        handleError(error);
        return new Response('Error occurred', { status: 500 });
    }
}
