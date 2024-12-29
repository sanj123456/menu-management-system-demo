import { BASE_URL } from '@/Utils/constant';
import { NextResponse } from 'next/server';
 
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const depth = searchParams.get('depth') || null;
        const parent_id = searchParams.get('parent_id') || null;

        const queryParams = new URLSearchParams();

        if (parent_id) {
            queryParams.append('parent_id', parent_id);
        }
        if (depth) {
            queryParams.append('depth', depth);
        }

        const response = await fetch(`${BASE_URL}/menus?${queryParams.toString()}`, {
            cache: 'no-store' 
        });
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                data,
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Failed to fetch menus:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
export async function POST(request) {
    try {
        const body = await request.json();
 

        const response = await fetch(`${BASE_URL}/menus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        
        if (!response.ok) {
            return NextResponse.json(
                data,  
                { status: response.status }  
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('POST error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}