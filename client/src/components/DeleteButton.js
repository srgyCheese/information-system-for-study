import React from 'react'
import {ReactComponent as TrashIcon} from '../svg/trash.svg'

const DeleteButton = ({ onClick, isLoading }) => {
  return (
    <button
      className="btn btn-danger p-2"
      type='button'
      onClick={onClick}
    >
      <div style={{ height: '24px', width: '24px' }}>
        {isLoading 
          ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
          : <TrashIcon width="24" />
        }
      </div>
    </button>
  )
}

export default DeleteButton