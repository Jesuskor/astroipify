<script setup lang="ts">
import { onMounted, ref } from 'vue';

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
      console.log('Datos IP:', data);
    }
  } catch (err) {
    error.value = err.message;
    console.error('Error de red:', err);
  }
});
</script>

<template>
  <div class="text-center my-6 space-y-1">
    <h1>IP Log Component</h1>
    <p>IP Log Data:</p>
    <ul>
      <li v-if="error">{{ error }}</li>
      <li v-else-if="rows.length === 0">No hay datos</li>
      <li v-else v-for="(row, index) in rows" :key="index">
        {{ row.ip }} - {{ row.pais }}
      </li>
    </ul>
  </div>
</template>
