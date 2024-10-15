import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import networkRequest from '../axios-config/axiosInstance';
import endpoints from '../axios-config/endpoints';
import handleErrorResponse from '../utils/handleErrorResponse';
import { toast } from 'react-toastify';
const EmailVerificationSuccess = () => {
    const navigate = useNavigate();
    const { uid, token } = useParams();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await networkRequest({}).get(`${endpoints.activateAcc}${uid}/${token}/`);
                if (response.status === 200) {
                    console.log('Email verified successfully!', response.data);
                    setShowSuccessPopup(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 5000);
                }
            } catch (error) {
                const errMsg = handleErrorResponse(error);
                toast.error(errMsg);
                navigate('/signup');
            }
        };

        if (uid && token) {
            verifyEmail();
        } else {
            toast.error('Email verification token not found!');
        }
    }, [uid, token, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {showSuccessPopup && (
                <div className="bg-white p-8 rounded-lg shadow-lg text-center text-poppins-medium">
                    <svg
                        className="w-12 h-12 text-green-500 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                    <h1 className="text-2xl font-poppins font-medium text-gray-800 mb-2">Email Verified!</h1>
                    <p className="text-poppins font-regular text-gray-600">Your email has been successfully verified.</p>
                </div>
            )}
        </div>
    );
};

export default EmailVerificationSuccess;
