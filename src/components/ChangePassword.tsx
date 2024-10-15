import { useState } from 'react';
import Input from "./Input";
import { changePasswordFields } from '../constant/formFields';
import FormExtra from './FormExtra';
import FormAction from './FormAction';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleErrorResponse from '../utils/handleErrorResponse';
import networkRequest from '../axios-config/axiosInstance';
import endpoints from '../axios-config/endpoints';
import MiniLoader from './MiniLoader';
import { useAppSelector } from '../redux/store/store';
type fieldsStateType = {
    [key: string]: string
}
const fields = changePasswordFields;
let fieldsState: fieldsStateType = {};
fields.forEach(field => fieldsState[field.id] = '');
type ChangePasswordProps = {
    fromResetPassword?: boolean
}
export default function ChangePassword(props: ChangePasswordProps) {
    const { fromResetPassword } = props
    const [changePasswordState, setChangePasswordState] = useState(fieldsState);
    const { uid, token: resetToken } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { token } = useAppSelector(state => state.auth)
    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        setChangePasswordState({ ...changePasswordState, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await handleChangePassword();
    }
    //Handled Login API Integration here
    const handleChangePassword = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("password", changePasswordState.password)
            formData.append("password2", changePasswordState.password2)
            const endPointUrl = resetToken ? `${endpoints.resetPassword}${uid}/${resetToken}/` : endpoints.changepassword
            const response = await networkRequest({ token }).post(endPointUrl, formData)
            console.log(response, "response")
            if (response.status === 200) {
                setLoading(false)
                setChangePasswordState(fieldsState)
                toast.success(response?.data?.message)
                resetToken && navigate('/login')
            } else {
                setLoading(false)
                toast.error(response?.data?.message)

            }

        } catch (error: any) {
            setLoading(false)
            const errMsg = handleErrorResponse(error)
            toast.error('Something went wrong ! Please try again later')
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
                            value={changePasswordState[field.id]}
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
            <FormAction handleSubmit={handleSubmit} text={loading ? <MiniLoader /> : resetToken ? "Reset Password" : "Update Password"} />

        </form>
    )
}