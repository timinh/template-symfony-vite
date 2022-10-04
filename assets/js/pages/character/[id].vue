<template>
    <div>
        <div v-if="character">
            <img :src="character.image" :alt="character.name" style="width: 18rem;">
            <h1>{{character.name}}</h1><span class="badge bg-primary">{{character.status}}</span>
            <p class="card-text">Espèce : {{character.species}}</p>
            <p class="card-text">Apparait dans {{character.episode.length}} épisode(s)</p><button
                v-if="!store.inBookmarks(character)" @click="store.addBookmark(character)"
                class="btn btn-secondary">Ajouter à
                mes favoris</button>
        </div>
        <div v-else><span class="badge text-bg-danger">Le chargement n'est pas vraiment fait sur cette page</span>
            <p>Voir dans le store (character.js) comment implémenter le chargement en ajax</p>
        </div>
        <router-link to="/" class="btn btn-secondary mt-2">Retour à l'accueil</router-link>
    </div>
</template>
<route lang="yaml">
name: character
</route>
<script setup>
import {useCharacterStore} from '../../store/characters'
    const store = useCharacterStore()
    const route = useRoute()
    const character = ref()

    onMounted( () => {
        character.value = store.getCharacter(route.params.id)
    })
</script>