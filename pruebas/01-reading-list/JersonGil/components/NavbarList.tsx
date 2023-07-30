"use client"

import { useEffect, useId } from "react"
import Link from 'next/link'
import useBookStore from "@/store/booksStore"

type List = {
  name: string,
  href: string,
  isDisabled?: boolean
}

interface NavbarListProps {
  list: List[]
}

const NavbarList = ({ list }: NavbarListProps) => {
  const { readingList } = useBookStore()
  const linkId = useId()

  useEffect(() => {
    if (readingList.length > 0) {
      list.forEach(item => {
        if (item.name === "Mi lista de Lectura") {
          item.isDisabled = false
        }
      })
    }
  }, [readingList, list])


  return (
    <>
      {list.map((item, index) => (
        <Link key={`${linkId}-${index}`} role={item.isDisabled ? undefined : "link"} href={item.href} className="block py-2 pl-3 pr-4 text-primary text-base bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
          {item.name}
        </Link>
      ))}
    </>
  )
}

export default NavbarList