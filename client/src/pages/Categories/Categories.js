import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from '../../services/api'

const Categories = () => {
  useEffect(() => {
    axios.get('/categories').then(console.log)
  }, [])

  return (
    <Layout>
      Categories list
    </Layout>
  )
}

export default Categories