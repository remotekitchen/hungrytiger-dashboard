import React from 'react'
import CustomerTable from './CustomerTable'


const CustomerProfile = () => {
  return (
    <div className='flex flex-col justify-start items-start gap-10'>
      <h1 className='text-5xl font-bold'>Customer Table</h1>
      <CustomerTable/>

  
    </div>
  )
}

export default CustomerProfile
