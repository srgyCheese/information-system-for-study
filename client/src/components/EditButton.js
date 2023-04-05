import React from 'react'
import {ReactComponent as EditIcon} from '../svg/edit.svg'

const EditButton = ({ onClick, isLoading }) => {
  return (
    <button
      className="btn btn-success p-2"
      type='button'
      onClick={onClick}
      disabled={isLoading}
    >
      <div style={{ height: '24px', width: '24px' }}>
        {isLoading
          ? <span className="spinner-border spinner-border-sm" /> 
          : <EditIcon width="24" />
        }
      </div>
    </button>
  )
}

export default EditButton