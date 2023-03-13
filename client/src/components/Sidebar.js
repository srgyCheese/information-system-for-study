import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const pages = [
  {
    label: 'Профиль',
    to: '/profile'
  },
  {
    label: 'Категории',
    to: '/categories'
  },
  {
    label: 'Продукты',
    to: '/products'
  },
  {
    label: 'Склады',
    to: '/warehouses'
  },
  {
    label: 'Пользователи',
    to: '/users'
  }
]

const Sidebar = () => {
  return (
    <div className='bg-light' style={{width: '280px', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100}}>
      <nav className="navbar navbar-light bg-primary">
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="/">
            <img src="/assets/svg/logo.svg" width="100" className="d-inline-block align-top" alt="logo" />
          </Link>
        </div>
      </nav>
      <div className="d-flex flex-column flex-shrink-0 p-3">
        <ul className="nav nav-pills flex-column mb-auto">
          {pages.map(page => (
            <li className="nav-item" key={page.to}>
              <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : 'link-dark'}`} to={page.to}>
                {page.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar