<template>
  <NuxtLayout name="admin" page="Início" description="Página Inicial do Sistema">

  </NuxtLayout>
</template>

<script setup>


definePageMeta({
  middleware: ['auth'],
});

useHead({
  title: 'Início - Império'
});

</script>

