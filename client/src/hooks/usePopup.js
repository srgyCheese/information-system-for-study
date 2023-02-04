import { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const PopupWrapper = ({children, opened, close}) => {
  const ref = useRef()
  const outsideRef = useRef()

  useEffect(() => {
    const onDocumentClick = e => {
      if (ref.current && !ref.current.contains(e.target) && outsideRef.current.contains(e.target)) {
        close()
      }
    }
    
    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [])

  return (
    <>
      <div ref={outsideRef} className={`modal fade mt-5 ${opened ? 'show' : ''}`} style={{display: "block", pointerEvents: !opened ? 'none' : null}}>
        <div ref={ref}>
          {children}
        </div>
      </div>
      <div 
        className={`modal-backdrop fade ${opened ? 'show' : ''}`} 
        style={{pointerEvents: !opened ? 'none' : null}}
      ></div>
    </>
  )
}

export const usePopup = () => {
  const [popup, setPopup] = useState(null)

  const openPopup = p => setPopup(p)
  const closePopup = () => setPopup(null)

  return { 
    openPopup, 
    closePopup, 
    popup: <PopupWrapper opened={!!popup} close={closePopup}>
      {popup}
    </PopupWrapper>
}
}

export default usePopup