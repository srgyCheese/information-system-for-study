import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const pages = [
  {
    label: 'Profile',
    to: '/profile'
  },
  {
    label: 'Categories',
    to: '/categories'
  }
]

const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '280px', position: 'fixed', top: 0, left: 0, bottom: 0}}>
      <ul className="nav nav-pills flex-column mb-auto" style={{paddingTop: '56px'}}>
        {pages.map(page => (
          <li className="nav-item" key={page.to}>
            <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : 'link-dark'}`} to={page.to}>
              {page.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar