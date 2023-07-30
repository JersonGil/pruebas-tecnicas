import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import library from "@/data/books.json"
import { Book, Library } from "@/interfaces/books"

interface LibraryState {
  library: Library[],
  readingList: Library[],
  getBooks: () => void,
  createReadingList: (arg: Book | null) => void,
}

const libraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      library: [],
      readingList: [],
      getBooks: () => {
        if (Array.isArray(library.library) && library.library.length > 0) {
          return set({ library: library.library });
        }
      },
      createReadingList: (book) => {
        if (book) {
          set((state) => {
            const exist = state.readingList.find((reading) => reading.book.ISBN === book.ISBN)

            if (!exist) {
              return {
                readingList: [...state.readingList, { book }]
              }
            }

            return state
          })
        }
      }
    }),
    {
      name: 'library-storage', // name of the item in the storage (must be unique)
    }
  )
)

export default libraryStore