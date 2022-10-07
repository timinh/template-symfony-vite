<template>
    <div>
        <h1>Mes favoris</h1>
        <div class="row">
            <input type="text" v-model="searchValue" placeholder="Filtrer" />
        </div>
        <div class="row">
            <character-card class="m-1" v-for="character in filteredBookmarks" :character="character">
                <button v-if="store.inBookmarks(character)" @click="store.removeBookmark(character)"
                    class="btn btn-secondary">Enlever des favoris</button><br />
                <router-link :to="`/character/${character.id}`" class="btn btn-secondary mt-2">Voir</router-link>
            </character-card>
        </div>
    </div>
</template>
<route lang="yaml">
name: favoris
meta:
    nav: true
</route>
<script setup>
import {useCharacterStore} from '../store/characters'
    const searchValue = ref('')
    const store = useCharacterStore()
    const filteredBookmarks = computed( () => {
        if(searchValue.value.length === 0 || searchValue.value.length >2 ){
            return store.bookmarks.filter( (char) => 
                char.name.toLowerCase().includes(searchValue.value.toLowerCase())
            )
        }
        return store.bookmarks
    })
</script>