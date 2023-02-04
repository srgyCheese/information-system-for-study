import React, { useContext } from 'react'
import { PopupContext } from '../contexts/PopupContext'

const Popup = ({ children, title }) => {
  const {closePopup} = useContext(PopupContext)

  return (
    <div className="modal-dialog modal-xl">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title h4" id="exampleModalSmLabel">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closePopup}></button>
        </div>
        <div className="modal-body">
            {children}
        </div>
        </div>
    </div>
  )
}

export default Popup