const loginFields = [
    {
        labelText: "Email address",
        labelFor: "email_address",
        id: "email_address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"
    }
]

const signupFields = [
    // {
    //     labelText: "Username",
    //     labelFor: "username",
    //     id: "username",
    //     name: "username",
    //     type: "text",
    //     autoComplete: "username",
    //     isRequired: true,
    //     placeholder: "Username"
    // },
    {
        labelText: "First Name",
        labelFor: "first_name",
        id: "first_name",
        name: "first_name",
        type: "text",
        autoComplete: "first_name",
        isRequired: true,
        placeholder: "First Name"
    },
    {
        labelText: "Last Name",
        labelFor: "last_name",
        id: "last_name",
        name: "last_name",
        type: "text",
        autoComplete: "last_name",
        isRequired: true,
        placeholder: "Last Name"
    },
    {
        labelText: "Phone Number",
        labelFor: "phone_number",
        id: "phone_number",
        name: "phone_number",
        type: "number",
        autoComplete: "phone_number",
        isRequired: true,
        placeholder: "Phone Number"

    },
    {
        labelText: "Email address",
        labelFor: "email_address",
        id: "email_address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"
    }
]

const forgotPasswordFields = [
    {
        labelText: "Email address",
        labelFor: "email_address",
        id: "email_address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"
    }
]
const changePasswordFields = [
    {
        labelText: "New Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"
    },
    {
        labelText: "Confirm Password",
        labelFor: "password2",
        id: "password2",
        name: "password2",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Confirm Password"
    }
]

export { loginFields, signupFields, forgotPasswordFields, changePasswordFields }
