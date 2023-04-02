<template>
	<q-page-container>
    <div class="q-pa-md">
        <div class="text-h2">FavorisT</div>
  		<div class="q-pa-md row items-start q-gutter-md">
      		<q-input square filled v-model="query" @update:model-value="search()" label="Chercher un personnage">
				<template v-slot:append>
					<q-icon v-show="query.length>0" name="close" @click="query='';search()" class="cursor-pointer" />
				</template>
			</q-input>
        </div>
  		<div class="q-pa-md row items-start q-gutter-md">
            <character-card class="m-1" v-for="bookmark in filteredBookmarks" :character="bookmark">
				<call-to-action icon="remove" @click="store.removeBookmark(bookmark)">Enlever des favoris</call-to-action>
			</character-card>
        </div>
    </div>
	</q-page-container>
</template>
<route lang="yaml">
name: 'favoris'
meta:
    nav: true
</route>
<script setup>
import {useCharacterStore} from '../store/characters'
    const query = ref('')
    const store = useCharacterStore()
    const filteredBookmarks = computed( () => {
        if(query.value.length === 0 || query.value.length >2 ){
            return store.bookmarks.filter( (char) => 
                char.name.toLowerCase().includes(query.value.toLowerCase())
            )
        }
        return store.bookmarks
    })
</script>