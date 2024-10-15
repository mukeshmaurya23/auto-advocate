import { Link } from 'react-router-dom';
import autoAvocateLogo from "../assets/images/autoadvocatelogo.png"
interface HeaderProps {
    heading: string;
    paragraph: string;
    linkName: string;
    linkUrl: string;
}
export default function Header(props: HeaderProps) {
    const {
        heading,
        paragraph,
        linkName,
        linkUrl = "#"
    } = props;
    return (
        <div className="mb-10">
            <div className="flex justify-center">
                {/* <img
                    alt=""
                    className="h-24 w-24 rounded-full object-cover cursor-pointer"
                    src={autoAvocateLogo}

                /> */}
                <h2 className="mt-6 font-poppins text-center text-3xl font-extrabold text-gray-700 mb-10">
                    Negotigator
                </h2>

            </div>
            <h2 className="mt-6 font-poppins text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center font-poppins text-sm text-gray-600 mt-5">
                {paragraph} {' '}
                <Link to={linkUrl} className="font-medium font-poppins text-[#2a7086] hover:text-[#2a7086]">
                    {linkName}
                </Link>
            </p>
        </div>
    )
}