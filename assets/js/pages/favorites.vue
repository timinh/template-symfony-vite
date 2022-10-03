<template>
    <div>
        <h1>Mes favoris</h1>
        <div class="row">
            <input type="text" v-model="searchValue" @keyup="search" placeholder="Filtrer" />
        </div>
        <div class="row">
            <character-card class="m-1" v-for="character in store.bookmarks" :character="character">
                <button v-if="store.inBookmarks(character)" @click="store.removeBookmark(character)"
                    class="btn btn-secondary">Enlever des favoris</button>
            </character-card>
        </div>
    </div>
</template>
<route lang="yaml">
name: favoris
</route>
<script setup>
    import {useCharacterStore} from '../store/characters'
    const searchValue = ref('')
    const store = useCharacterStore()
    const search = () => {
        if(searchValue.value.length === 0 || searchValue.value.length >2 ){
            
        }
    }
</script>