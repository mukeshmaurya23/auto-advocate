import React from 'react'
import Header from '../components/Header'
import ChangePassword from '../components/ChangePassword'

const ChangePasswordPage = () => {
    return (
        <div className='flex justify-center items-center w-full pt-20'>
            <div className='space-y-8 w-full md:w-1/3'>
                <Header
                    heading="Welcome back!"
                    paragraph="Want to change your password? "
                    linkName=""
                    key={1}
                    linkUrl=""
                />
                <ChangePassword />
            </div>
        </div>
    )
}

export default ChangePasswordPage
