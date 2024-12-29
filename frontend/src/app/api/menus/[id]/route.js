import { BASE_URL } from '@/Utils/constant';
import { NextResponse } from 'next/server';

export async function GET(_request, { params }) {
    try {
        const response = await fetch(`${BASE_URL}/menus/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                data,
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(_request, { params }) {
    try {
        const response = await fetch(`${BASE_URL}/menus/${params.id}`, {
            method: 'DELETE'
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
        console.error('DELETE error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
    try {
        const body = await request.json();
      

        const response = await fetch(`${BASE_URL}/menus/${params.id}`, {
            method: 'PATCH',
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
        console.error('PATCH error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}