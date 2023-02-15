import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import ProductsSearchList from '../../components/ProductsSearchList/ProductsSearchList'
import { PopupContext } from '../../contexts/PopupContext'
import AddProductPopup from './components/AddProductPopup'

const Products = () => {
  const {openPopup} = useContext(PopupContext)

  return (
    <Layout>
      <button 
        className='btn btn-outline-success' 
        type='button'
        onClick={() => openPopup(<AddProductPopup />)}
      >
        Добавить товар
      </button>
      <hr />
      <ProductsSearchList />
    </Layout>
  )
}

export default Products