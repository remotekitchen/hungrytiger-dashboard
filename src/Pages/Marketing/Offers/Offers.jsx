import React from 'react'
import Email from './Email'
import Sms from './Sms'
import WhatsApp from './WhatsApp'

const Offers = () => {
    return (
        <div className="p-5">
            <h1 className="text-4xl font-bold mb-4">Offers</h1>
            <p className='my-3 font-bold'>Promotion Set-up</p>
            <Email/>
            <Sms/>
            {/* <WhatsApp/> */}
        </div>
    )
}

export default Offers