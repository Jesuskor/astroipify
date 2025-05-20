import { createClient } from "@libsql/client/web";

export const turso = createClient({
    url: import.meta.env.TURSO_DATABASE_URL,
    authToken: import.meta.env.TURSO_AUTH_TOKEN,
});

export async function getAllData(table: string) {
    try {
        const result = await turso.execute(`SELECT * FROM ${table}`);
        return { data: result.rows };
    } catch (error) {
        return { error: error.message || 'Error al obtener datos' };
    }
}