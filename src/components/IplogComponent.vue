<script setup lang="ts">
import { onMounted, ref } from 'vue';

const rows = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    // 1. Obtener IP pública
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipRes.json();

    // 2. Obtener info de la IP
    const infoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const info = await infoRes.json();

    // 3. Guardar en la base de datos
    await fetch('/api/iplog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });

    // 4. Obtener todos los datos para mostrar
    const res = await fetch('/api/iplog');
    const data = await res.json();

    if (!res.ok) {
      error.value = data.error || 'Error desconocido';
    } else {
      rows.value = data;
    }
  } catch (err: any) {
    error.value = err.message;
  }
});
</script>

<template>
  <div>
    <h1>IP Log</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <table v-else>
      <thead>
        <tr>
          <th>IP</th>
          <th>Ciudad</th>
          <th>Región</th>
          <th>País</th>
          <th>Organización</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.ip">
          <td>{{ row.ip }}</td>
          <td>{{ row.pais }}</td>
          <td>{{ row.region }}</td>
          <td>{{ row.ciudad }}</td>
          <td>{{ row.latitud }}</td>
          <td>{{ row.longitud }}</td>
          <td>{{ row.zona }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>