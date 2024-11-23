import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const valid_from = new Date().toISOString();
        const valid_to = new Date(Date.now() + 30 * 60 * 1000).toISOString();

        const baseUrl = 'https://api.octopus.energy/v1/products/AGILE-FLEX-22-11-25/electricity-tariffs/E-1R-AGILE-FLEX-22-11-25-C/standard-unit-rates/';
        const url = `${baseUrl}?period_from=${valid_from}&period_to=${valid_to}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 1800 }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
