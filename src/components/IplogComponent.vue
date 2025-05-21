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

  } catch (err: any) {
    error.value = err.message;
  }
});
</script>

<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>