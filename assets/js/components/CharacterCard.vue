<template>
    <div class="card border-primary mb-3" style="width: 18rem;">
        <img :src="character.image" class="card-img-top" :alt="character.name">
        <div class="card-body">
            <h5 class="card-title">{{character.name}}</h5>
            <p class="card-text">Espèce : {{character.species}}</p>
            <p class="card-text">Apparait dans {{character.episode.length}} épisode(s)</p>
            <slot />
        </div>
    </div>
</template>
<script setup>
    const props = defineProps({
        character: {
            type: Object,
            required: true
        }
    })
</script>