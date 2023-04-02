import { ref } from 'vue'

export function useBaseApi(getResults) {
	const query  = ref('')
	const result = ref('')
	const error = ref(false)
	const loading = ref(false)

	const callApi = async() => {
		result.value = ""
		error.value   = false
		loading.value = true
		try{
			result.value = await getResults(query.value)
		} catch {
			error.value = true
		} finally {
			loading.value = false
		}
	}

	return {query, result, error, loading, callApi}
}

// Exemple avec Anime API (REST)
// renvoi l'image du poster de l'anime
// const {query, result, loading, error, callApi} = useBaseApi(async(query)=> {
// 	const res = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${query}`)
// 	return res.data.data[0].attributes.posterImage.small
// })

// Exemple avec Rick and Morty API (GraphQL)
// la query en gql
// const charactersQuery = `
// query Characters($name:String!) {
// 	characters(filter: {name: $name}){
// 		results{
// 			name
// 			image
// 		}
// 	}
// }
// `

// l'appel graphql (en post)
// const {query, result, loading, error, callApi} = useBaseApi(async(query)=> {
// 	const res = await axios.post('https://rickandmortyapi.com/graphql',
// 	{
// 		query: charactersQuery,
// 		variables: {
// 			name: query
// 		}
// 	})
// 	return res.data.data.characters.results[0].image
// })