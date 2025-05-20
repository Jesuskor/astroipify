// src/pages/api/iplog.ts
import type { APIRoute } from 'astro';
import { getAllData } from '@/turso';

export const GET: APIRoute = async () => {
    const result = await getAllData('iplog');

    if (result.error) {
        return new Response(JSON.stringify({ error: result.error }), { status: 500 });
    }

    return new Response(JSON.stringify(result.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};
