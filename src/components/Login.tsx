import { useState } from 'react';
import Input from "./Input";
import { loginFields } from '../constant/formFields';
import FormExtra from './FormExtra';
import FormAction from './FormAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleErrorResponse from '../utils/handleErrorResponse';
import networkRequest from '../axios-config/axiosInstance';
import endpoints from '../axios-config/endpoints';
import MiniLoader from './MiniLoader';
import { useDispatch } from 'react-redux';
import { setRefreshToken, setToken } from '../redux/slice/authSlice';
import { fetchChatBotQuestions } from '../redux/slice/chatBotSlice';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

type fieldsStateType = {
    [key: string]: string
}
const fields = loginFields;
let fieldsState: fieldsStateType = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const [user, setUser] = useState<any>([]);
    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            setUser(codeResponse)
            const googleResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                },
            });
            const googleUser = await googleResponse.json();
            console.log(googleUser)
        },
        onError: (error) => console.log('Login Failed:', error)
    });
    console.log(user, 'user')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // navigate('/home')
        // return
        await authenticateUser();
    }

    //Handled Login API Integration here
    const authenticateUser = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("email", loginState.email_address)
            formData.append("password", loginState.password)
            const response = await networkRequest({}).post(endpoints.login, formData)
            console.log(response)
            console.log(response.status)
            if (response?.data?.status === 'success') {
                setLoading(false)
                toast.success(response?.data?.message)
                dispatch(setToken(response?.data?.access))
                dispatch(setRefreshToken(response?.data?.refresh))
                navigate('/home')
            }
            setLoading(false)

        } catch (error: any) {
            setLoading(false)
            console.log(error)
            const errorMsg = handleErrorResponse(error)
            toast.error(errorMsg)

        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text={loading ? <MiniLoader /> : "Login"} />
            <div className="flex items-center justify-center ">
                <button onClick={() => login()} className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                    <span>Continue with Google</span>
                </button>
            </div>
        </form>
    )
}