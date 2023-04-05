import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import ProductsSearchList from '../../components/ProductsSearchList/ProductsSearchList'
import { PopupContext } from '../../contexts/PopupContext'
import { usePermissions } from '../../hooks/usePermissions'
import { useTitle } from '../../hooks/useTitle'
import AddProductPopup from './components/AddProductPopup'

const Products = () => {
  useTitle('Товары')

  const permissions = usePermissions()
  
  const {openPopup} = useContext(PopupContext)

  return (
    <Layout>
      {permissions.products.create() && (
        <div>
          <button 
            className='btn btn-outline-success mb-3' 
            type='button'
            onClick={() => openPopup(<AddProductPopup />)}
          >
            Добавить товар
          </button>
          <hr />
        </div>
      )}
      <ProductsSearchList />
    </Layout>
  )
}

export default Products