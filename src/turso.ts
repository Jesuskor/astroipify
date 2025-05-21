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

export async function insertData(table: string, data: Record<string, any>) {
    try {
        // Solo toma los campos requeridos
        const { ip, pais, region, ciudad, latitud, longitud, zona } = data;
        const sql = `INSERT INTO ${table} (ip, pais, region, ciudad, latitud, longitud, zona) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await turso.execute({ sql, args: [ip, pais, region, ciudad, latitud, longitud, zona] });
        return { success: true };
    } catch (error: any) {
        return { error: error.message || 'Error al insertar datos' };
    }
}