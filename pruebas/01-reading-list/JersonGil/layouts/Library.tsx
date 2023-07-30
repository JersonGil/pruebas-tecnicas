"use client"
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import useBookStore from "@/store/booksStore"
import BookSelected from '@/components/BookSelected'
import { Book, Library } from '@/interfaces/books'

const BookCard = dynamic(() => import('@/components/BookCard'), {
  ssr: false,
})

interface Props {
  isMyBooks?: boolean
}

const Library = ({ isMyBooks = false }: Props) => {
  const { library, getBooks, readingList } = useBookStore()
  const [bookSelected, setBookSelected] = useState<Book | null>(null)
  const [books, setBooks] = useState<Library[]>([])

  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
    isMyBooks ? setBooks(readingList) : setBooks(library)
  }, [isMyBooks])

  return (
    <article className={`${bookSelected && "flex flex-row w-full"} gap-4`}>
      <BookCard library={books} getBook={setBookSelected} />
      <BookSelected bookSelected={bookSelected} />
    </article>
  )
}

export default Library