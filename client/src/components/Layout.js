import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children, className }) => {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div style={{ paddingLeft: '280px', width: '100vw' }}>
          <div className={className || 'p-4'}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout