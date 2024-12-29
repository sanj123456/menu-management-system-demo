import { BASE_URL } from "@/Utils/constant";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
    try {
        const response = await fetch(`${BASE_URL}/menus/${params.id}/available-parents`);
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                data,
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('GET available parents error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}