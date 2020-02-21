import { useState, useEffect } from 'react'

import styled from 'styled-components'
import Layout from '../../components/Layout'
import Page from '../../components/Page'
import PageBanner from '../../components/PageBanner'
import PageContent from '../../components/styles/PageContent'
import Table from '../../components/table/Table'
import TableContext from '../../context/table-context'

/**
 * Post request to server. Insert customer into db.
 */
const ManageCustomers = () => {
  const url = `http://localhost:3000`
  const isEditable = true
  
  const [tableData, setTableData] = useState([])
  const [tableHeaders, setTableHeaders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/get-customers`)
        const customerData = await response.json()

        setTableHeaders(Object.keys(customerData[0]))
        setTableHeaders(
          isEditable ? headers => [...headers, 'modify'] : headers => [...headers]
        )
        setTableData(customerData)
      } catch(error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Page>
      <PageBanner bannerUrl="/banners/admin-banner.jpeg" />
      <Layout>
        <PageContent pageTitle="Admin: Manage Customers">
          
          <TableContext.Provider value={{ tableData, tableHeaders, setTableData, isEditable }}>
            <Table />
          </TableContext.Provider>

        </PageContent>
      </Layout>
    </Page>

  )
}

export default ManageCustomers