import React from 'react'

const Spinner = () => {
  return (
    <div className="d-flex">
      <div className="spinner-border text-primary mx-auto" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner