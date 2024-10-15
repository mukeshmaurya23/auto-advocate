import { useState } from 'react';
import Input from "./Input";
import { forgotPasswordFields } from '../constant/formFields';
import FormExtra from './FormExtra';
import FormAction from './FormAction';
import { useNavigate } from 'react-router-dom';
import networkRequest from '../axios-config/axiosInstance';
import endpoints from '../axios-config/endpoints';
import { toast } from 'react-toastify';
import handleErrorResponse from '../utils/handleErrorResponse';
import MiniLoader from './MiniLoader';
type fieldsStateType = {
    [key: string]: string
}
const fields = forgotPasswordFields;
let fieldsState: fieldsStateType = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [forgetPasswordState, setForgetPasswordState] = useState(fieldsState);
    const [loading, setLoading] = useState(false)

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        setForgetPasswordState({ ...forgetPasswordState, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Forget Password State", forgetPasswordState)
        await handleForgetPassword();
    }

    //Handle Login API Integration here
    const handleForgetPassword = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("email", forgetPasswordState?.email_address)
            const response = await networkRequest({}).post(endpoints.sendResetPasswordEmail, formData)
            console.log(response, "response")
            if (response?.data?.status === 'success') {
                setLoading(false)
                toast.success(response?.data?.message)
            }
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            const errMsg = handleErrorResponse(error)
            toast.error(errMsg)
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
                            value={forgetPasswordState[field.id]}
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

            {/* <FormExtra /> */}
            <FormAction handleSubmit={handleSubmit} text={loading ? <MiniLoader /> : "Submit"} />

        </form>
    )
}