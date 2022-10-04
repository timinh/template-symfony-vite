import {defineStore} from 'pinia'
import { toUrlParams } from '../composables/useParams'
import Api from '../composables/Api'

export const useCharacterStore = defineStore(
    'characters',
    {
        state: () => ({
            characters: [],
            bookmarks: [],
            count: 0,
            loading: false,
            prev: null,
            next: null,
            pages: 0,
            error: null
        }),
        getters: {
            inBookmarks: (state) => {
                return (char) => char && state.bookmarks.findIndex( (c) => c.id === char.id)>-1
            },
            getCharacter: (state) => {
                return (charId) => state.characters.find( (char) => char.id === parseInt(charId))
            }
        },
        actions: {
            async loadCharacters(params = {}) {
                this.loading = true
                Api.get('https://rickandmortyapi.com/api/character?' + toUrlParams(params))
                    .then( data => {
                        this.characters = data.data.results
                        this.count      = data.data.info.count
                        this.prev       = data.data.info.prev
                        this.next       = data.data.info.next
                        this.pages       = data.data.info.pages
                    })
                    .catch( error => {
                        this.error = error
                    })
                    .finally( () => this.loading = false)
            },
            async loadMore() {
                this.loading = true
                Api.get(this.next)
                    .then( data => {
                        this.characters = [...this.characters, ...data.data.results]
                        this.count      = data.data.info.count
                        this.prev       = data.data.info.prev
                        this.next       = data.data.info.next
                        this.pages       = data.data.info.pages
                    })
                    .catch( error => {
                        this.error = error
                    })
                    .finally( () => this.loading = false)
            },
            addBookmark(character) {
               this.bookmarks.push(character) 
            },
            removeBookmark(character) {
                this.bookmarks.splice(this.bookmarks.findIndex( (c) => c.id === character.id), 1)
            }
        }
    }
)