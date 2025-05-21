<script setup lang="ts">
import { ref, onMounted } from 'vue';

const rows = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
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
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div v-if="error" class="text-red-500 p-2">{{ error }}</div>
    <table v-else class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th class="px-6 py-3">ID</th>
        <th class="px-6 py-3">IP</th>
        <th class="px-6 py-3">País</th>
        <th class="px-6 py-3">Región</th>
        <th class="px-6 py-3">Ciudad</th>
        <th class="px-6 py-3">Latitud</th>
        <th class="px-6 py-3">Longitud</th>
        <th class="px-6 py-3">Zona horaria</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="px-6 py-4">{{ row.id }}</td>
        <td class="px-6 py-4">{{ row.ip }}</td>
        <td class="px-6 py-4">{{ row.pais }}</td>
        <td class="px-6 py-4">{{ row.region }}</td>
        <td class="px-6 py-4">{{ row.ciudad }}</td>
        <td class="px-6 py-4">{{ row.latitud }}</td>
        <td class="px-6 py-4">{{ row.longitud }}</td>
        <td class="px-6 py-4">{{ row.zona }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>