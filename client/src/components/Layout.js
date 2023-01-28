import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div style={{ paddingLeft: '280px' }}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout