<template>
	<q-page-container>
    <div class="q-pa-md">
        <div class="text-h2">Demo api REST</div>
  		<div class="q-pa-md row items-start q-gutter-md">
      		<q-input square filled v-model="query" @update:model-value="search()" label="Chercher un personnage">
				<template v-slot:append>
					<q-icon v-show="query.length>0" name="close" @click="query='';search()" class="cursor-pointer" />
				</template>
			</q-input>
        </div>
  		<div class="q-pa-md row items-start q-gutter-md">
			<loader v-show="loading" />
            <character-card class="m-1" v-for="character in characters" :character="character">
				<call-to-action icon="add" v-if="!store.inBookmarks(character)" @click="store.addBookmark(character)">Ajouter aux favoris</call-to-action>
				<call-to-action icon="remove" v-if="store.inBookmarks(character)" @click="store.removeBookmark(character)">Enlever des favoris</call-to-action>
			</character-card>
        </div>
    </div>
	</q-page-container>
</template>
<route lang="yaml">
name: 'api rest'
meta:
    nav: true
</route>
<script setup>
import Api from '../composables/Api'
import { onMounted } from 'vue'
import { useBaseApi } from '../composables/use-base-api'
import { useCharacterStore } from '../store/characters'
const store = useCharacterStore()

const { query, result: characters, loading, error, callApi: search} = useBaseApi(async(query)=> {
	const res = await Api.get(`https://rickandmortyapi.com/api/character?name=${query}`)
	return res.data.results
})

onMounted(() => search())
</script>