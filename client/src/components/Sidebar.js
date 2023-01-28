import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const pages = [
  {
    label: 'Profile',
    to: '/profile'
  },
  {
    label: 'Products',
    to: '/products'
  }
]

const Sidebar = () => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '280px', position: 'fixed', top: 0, left: 0, bottom: 0}}>
      <ul className="nav nav-pills flex-column mb-auto" style={{paddingTop: '56px'}}>
        {pages.map(page => (
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname.startsWith(page.to) ? 'active' : 'link-dark'}`} to={page.to}>
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar