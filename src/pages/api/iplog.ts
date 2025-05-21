import type { APIRoute } from 'astro';
import { getAllData, insertData } from '@/turso';

export const GET: APIRoute = async () => {
    const result = await getAllData('iplog');
    if (result.error) {
        return new Response(JSON.stringify({ error: result.error }), { status: 500 });
    }
    // Devuelve solo el array de datos
    return new Response(JSON.stringify(result.data ?? []), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        // Mapea los campos del body si es necesario
        const data = {
            ip: body.ip,
            pais: body.country_name,
            region: body.region,
            ciudad: body.city,
            latitud: body.latitude,
            longitud: body.longitude,
            zona: body.timezone
        };
        const insertResult = await insertData('iplog', data);
        if (insertResult.error) {
            return new Response(JSON.stringify({ error: insertResult.error }), { status: 500 });
        }
        return new Response(JSON.stringify({ success: true }), { status: 201 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400 });
    }
};