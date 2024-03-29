import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
  const auth = useContext(AuthContext)

  return (
    <nav className="navbar navbar-light bg-primary" style={{zIndex: 99}}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand" to="/">
          <img src="/assets/svg/logo.svg" width="100" className="d-inline-block align-top" alt="logo" />
        </Link>
        <div className="d-flex">
          <span className="text-light cursor-pointer fs-5" onClick={e => auth.logout()}>Выйти</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar