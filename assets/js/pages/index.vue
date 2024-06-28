<template>
    <p>Index page</p>
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