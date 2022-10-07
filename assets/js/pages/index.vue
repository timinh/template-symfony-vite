<template>
    <div>
        <h1>Demo api REST</h1>
        <div class="row">
            <input type="text" v-model="searchValue" @keyup="search" placeholder="Chercher un personnage" />
        </div>
        <div class="row">
            <character-card class="m-1" v-for="character in store.characters" :character="character">
                <button v-if="!store.inBookmarks(character)" @click="store.addBookmark(character)"
                    class="btn btn-secondary">Ajouter à mes favoris</button>
                <router-link :to="`/character/${character.id}`" class="btn btn-secondary mt-2">Voir</router-link>
            </character-card>
        </div>
        <div class="text-center">
            <loader type="primary" v-if="store.loading" />
            <button class="btn btn-secondary" @click="store.loadMore()">Voir plus</button>
        </div>
    </div>
</template>
<route lang="yaml">
name: accueil
meta:
    nav: true
</route>
<script setup>
    import {useCharacterStore} from '../store/characters'
    const searchValue = ref('')
    const store = useCharacterStore()
    onMounted( () => store.loadCharacters())
    const search = () => {
        if(searchValue.value.length === 0 || searchValue.value.length >2 ){
            store.loadCharacters({
                name: searchValue.value
            })
        }
    }
</script>