<script setup lang="ts">
import { ref } from 'vue';

const status = ref(false);
const toggleStatus = () => {
  status.value = !status.value;
};
</script>

<template>
  <div class="text-center my-6 space-y-1">
    <h1>Example Component</h1>
    <p>Status:
      <span :class="status ? 'text-green-500' : 'text-red-500'">
        {{ status ? 'Active' : 'Inactive' }}
      </span>
    </p>
    <button class="bg-neutral-900 hover:bg-neutral-700 transition-colors text-neutral-200 px-4 py-2 rounded-full cursor-pointer" @click="toggleStatus">Toggle Status</button>
    <p v-if="status">The status is currently active.</p>
    <p v-else>The status is currently inactive.</p>
  </div>
</template>