import { useEffect } from 'react'

export const useTitle = title => {
  useEffect(() => {
    const oldTitle = document.title
    title && (document.title = title)

    return () => document.title = oldTitle
  }, [title])
}