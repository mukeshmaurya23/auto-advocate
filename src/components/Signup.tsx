import { useState } from 'react';
import FormAction from "./FormAction";
import Input from "./Input";
import { signupFields } from '../constant/formFields';
import { toast } from 'react-toastify';
import axios from 'axios';
import networkRequest from '../axios-config/axiosInstance';
import endpoints from '../axios-config/endpoints';
import handleErrorResponse from '../utils/handleErrorResponse';
import MiniLoader from './MiniLoader';

type fieldsStateType = {
    [key: string]: string
}
const fields = signupFields;
let fieldsState: fieldsStateType = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState);
    const [loading, setLoading] = useState(false);
    const handleChange = (e: { target: { id: any; value: any; }; }) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await createAccount()
    }

    //handle Signup API Integration here
    const createAccount = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("first_name", signupState.first_name)
            formData.append("last_name", signupState.last_name)
            formData.append("phone_number", signupState.phone_number)
            formData.append("email", signupState.email_address)
            formData.append("password", signupState.password)
            const response = await networkRequest({}).post(endpoints.register, formData)
            console.log(response)
            if (response.status === 201) {
                setLoading(false)
                setSignupState(fieldsState)
                toast.success(response?.data?.message)
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
            <div className="">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
                <FormAction handleSubmit={handleSubmit} text={loading ? <MiniLoader /> : "Signup"} />
            </div>
        </form>
    )
}