<template>
    <p>Index page</p>
    <p>Ajoutez votre contenu</p>
</template>
<route lang="yaml">
name: 'index'
meta:
    nav: true
</route>
<script setup>
import { onMounted } from 'vue'
onMounted(() => console.log('Index page'))
</script>