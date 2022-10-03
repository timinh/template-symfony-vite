<template>
    <h1>index</h1>
    <p>{{store.counter}}</p>
</template>
<route lang="yaml">
name: home
meta:
    layout: test
</route>
<script setup>
    import {useMainStore} from '../store/useMainStore'
    const store = useMainStore()
</script>