import React from 'react'
import Header from '../components/Header'
import ChangePassword from '../components/ChangePassword'
import { useParams } from 'react-router-dom'

const ResetPasswordPage = () => {
    const [showResetPassword, setShowResetPassword] = React.useState(false)
    const { uid, token } = useParams();
    React.useEffect(() => {
        if (uid && token) {
            setShowResetPassword(true)
        }
    }, [uid, token])

    return (
        <div>
            {showResetPassword && <div className='flex justify-center items-center w-full pt-20'>
                <div className='space-y-8 w-full md:w-1/3'>
                    <Header
                        heading="Welcome back!"
                        paragraph="Want to Reset your password? "
                        linkName=""
                        key={1}
                        linkUrl=""
                    />
                    <ChangePassword />
                </div>
            </div>}
        </div>
    )
}

export default ResetPasswordPage