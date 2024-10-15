import { Link } from "react-router-dom";

export default function FormExtra() {
    return (
        <div className="flex items-center justify-between ">
            <div className="flex items-center">
                <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 font-poppins text-[#2a7086] focus:ring-[#2a7086] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 font-poppins block text-sm text-gray-900">
                    Remember me
                </label>
            </div>

            <div className="text-sm">
                <Link to="/forgot-password" className="font-medium font-poppins text-[#2a7086] hover:text-[#2a7086]">
                    Forgot your password?
                </Link>
            </div>
        </div>

    )
}