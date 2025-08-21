<template>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Lora:wght@500&display=swap');

:root {
  --background-color: #1a1d23;
  --surface-color: #252a33;
  --primary-color: #3b82f6;
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
  --border-color: #373d49;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--background-color);
  color: var(--text-primary);
  margin: 0;
}

main {
  width: 100%;
  padding: 2rem 1rem;
}
</style>