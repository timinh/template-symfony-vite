import {defineStore} from 'pinia'

export const useCharacterStore = defineStore(
    'characters',
    {
        state: () => ({
            bookmarks: [],
        }),
        getters: {
            inBookmarks: (state) => {
                return (char) => char && state.bookmarks.findIndex( (c) => parseInt(c.id) === parseInt(char.id))>-1
            }
        },
        actions: {
            addBookmark(character) {
               this.bookmarks.push(character) 
            },
            removeBookmark(character) {
                this.bookmarks.splice(this.bookmarks.findIndex( (c) => c.id === character.id), 1)
            }
        }
    }
)