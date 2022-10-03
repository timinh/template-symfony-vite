<template>
    <div class="d-flex justify-content-center my-4">
        <div class="spinner-border" :class="'text-' + type" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps({
        type: {
            type: String,
            required: false,
            default: 'primary'
        }
    })
</script>