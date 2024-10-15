import ForgetPassword from "../components/ForgetPassword"
import Header from "../components/Header"
import Login from "../components/Login"
export default function ForgetPasswordPage() {
    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Header
                    heading="Forget Password"
                    paragraph="Don't Worry! We are here to help you."
                    linkName=""
                    key={1}
                    linkUrl="/login"
                />
                <ForgetPassword />
            </div>
        </div>
    )
}