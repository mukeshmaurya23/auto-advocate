import React, { useEffect, useState } from 'react'
import userImage from "../assets/images/User.png"
import hamBurger from "../assets/images/Hamburger.png"
import cross from "../assets/images/Cross.png"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../redux/slice/toggleMenu';
import LogoutModal from './LogoutModal';
const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { isMenuOpen } = useSelector((state: any) => state.toggleMenuApp)
    const dispatch = useDispatch();
    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const handleCLoseLogoutModal = () => {
        setOpenLogoutModal(false);
    }

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };
    const ref = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (!ref?.current?.contains(event.target)) {
                setDropdownVisible(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);


    return (
        <div
            className={`px-6 md:px-2 lg:px-2 xl:px-4 text-slate-700  grid grid-col-12 py-1   bg-white z-10  h-[7rem] relative cursor-pointer shadow-md`}
        >
            <div className="md:flex flex-row justify-between items-center  hidden mx-10  text-gray-900 ">

                <>
                    <div className="flex items-center justify-between ">
                        <Link to="/make-appointment">
                            <div className="font-poppins  font-semibold text-sm lg:text-navText uppercase  tracking-[.15rem] cursor-pointer ">
                                Vechile Service
                            </div>
                        </Link>
                        {/* {showModal && <PortalModal closeModal={closeModal} />} */}
                        <div className="xl:mx-6 mx-2 text-gray-400">|</div>

                        <div
                            className="font-poppins  font-semibold text-sm lg:text-navbarLg tracking-[.15rem] uppercase  cursor-pointer"
                        >
                            Browse
                        </div>
                    </div>
                    {/* <div
                        className="bg-white flex items-center justify-center rounded-full  h-[10rem] w-[10rem] md:h-[10rem] md:w-[10rem]  lg:h-[15rem] lg:w-[15rem]"
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <Link to="/">
                            <img
                                className="h-[8rem] md:h-[10rem]  lg:h-[15rem] cursor-pointer"
                                alt="Logo"
                                src={
                                    "https://res.cloudinary.com/dzcmadjl1/image/upload/v1634495747/Group_7427_2x copy.png"
                                }
                            />
                        </Link>
                    </div> */}
                    <div className="flex items-center justify-between">
                        <Link to="/about-us">
                            <div className=" font-poppins  font-semibold text-sm lg:text-navbarLg uppercase  tracking-[.15rem] cursor-pointer">
                                About Us
                            </div>
                        </Link>
                        <div className="xl:mx-6 mx-2 text-gray-400">|</div>
                        <div
                            className="font-poppins font-semibold text-sm lg:text-navbarLg"
                            ref={ref}
                        >
                            <div className="relative">
                                <button
                                    className="flex items-center px-0 text-sm text-black focus:outline-none font-semibold"
                                    onClick={() => {
                                        setDropdownVisible(!dropdownVisible);
                                    }}
                                >

                                    <img className="h-7" alt="user" src={userImage} />
                                </button>
                                {
                                    dropdownVisible && (
                                        <div className="absolute -left-[11rem] w-[200px] px-3 bg-white rounded-md shadow-lg mt-2 py-2">
                                            <div className="flex flex-col">
                                                <Link
                                                    to="/sidebar"
                                                    className="block font-poppins pl-[10px] py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    Profile
                                                </Link>

                                                <button
                                                    className="block font-poppins pl-[10px] py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
                                                    onClick={() => {
                                                        setOpenLogoutModal(true);
                                                    }}
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </>
            </div>
            {/* Mobile View */}
            <div className="md:hidden flex  items-center text-gray-900 relative">
                <Link to="/">
                    <img
                        className=" w-[105px] h-auto cursor-pointer mr-auto"
                        alt="Logo"
                        src={
                            "https://res.cloudinary.com/dzcmadjl1/image/upload/v1634495747/Group_7427_2x copy.png"
                        }
                    />
                </Link>

                <img
                    src={hamBurger}
                    alt="hamburger"
                    className="h-6 w-7 ml-auto cursor-pointer"
                    onClick={
                        toggleMenuHandler
                    }
                />

                {isMenuOpen && (
                    <div
                        className={`fixed overflow-hidden top-0 right-0 w-screen h-screen bg-white z-10 transform transition-transform duration-300 ease-in-out ${true ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        <div className="relative">
                            <button
                                onClick={toggleMenuHandler}
                                className="absolute top-5 right-5 h-10 w-10 bg-gray-200 flex justify-center items-center rounded-full rounded-full"
                            >
                                <img src={cross} className=" h-4" />
                            </button>
                            <div className="absolute top-20 left-10 w-full">
                                {/* Content of the popup */}
                                <div className="flex flex-col space-y-4">
                                    {/*checkLogged in in mobile */}
                                    {true ? (
                                        <>
                                            <Link to="/sidebar">
                                                <h2 className="font-poppins text-[14px]">
                                                    My Profile
                                                </h2>
                                            </Link>
                                            <div className=" border-b " />

                                        </>
                                    ) : (
                                        <>
                                            <div className="flex gap-7 items-center ">
                                                <h2 className="font-poppins text-[14px]">
                                                    Patients
                                                </h2>
                                                <Link
                                                    to="/login"
                                                    className="text-[11px] font-poppins text-black border-b border-dotted border-gray-600"
                                                >
                                                    Log In
                                                </Link>
                                                <Link
                                                    to="/register"
                                                    className=" text-[11px] text-black font-poppins  border-b border-dotted border-gray-600"
                                                >
                                                    Sign up
                                                </Link>
                                            </div>
                                            <div className=" border-b " />
                                            <div className="flex gap-7">
                                                <h2 className="font-poppins text-[14px]">Doctors</h2>
                                                <Link
                                                    to="/login"
                                                    className="text-[11px] font-poppins text-black border-b border-dotted border-gray-600"
                                                >
                                                    Log In
                                                </Link>
                                                <Link
                                                    to="/register"
                                                    className=" text-[11px] text-black font-poppins  border-b border-dotted border-gray-600"
                                                >
                                                    Sign up
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                    <div className=" border-b " />
                                    <Link to="/make-appointment" onClick={toggleMenuHandler}>
                                        <h2 className="font-poppins text-[14px]">
                                            Vechile Service
                                        </h2>
                                    </Link>
                                    <div className=" border-b " />
                                    <div>
                                        <h2
                                            className="font-poppins text-[14px]"
                                            onClick={toggleMenuHandler}
                                        >
                                            Browse
                                        </h2>
                                    </div>
                                    <div className=" border-b " />
                                    <Link to="/about-us" onClick={toggleMenuHandler}
                                    >
                                        <h2 className="font-poppins text-[14px]">About Us</h2>
                                    </Link>
                                    <div className=" border-b " />
                                    <Link to="/" onClick={toggleMenuHandler}>
                                        <h2 className="font-poppins text-[14px]">Home</h2>
                                    </Link>
                                    {true && (
                                        <>
                                            {" "}
                                            <div className=" border-b " />
                                            <h2
                                                className="font-poppins text-[14px]"
                                                onClick={() => {

                                                }}
                                            >
                                                Logout
                                            </h2>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Logout Modal */}
            {
                openLogoutModal && <LogoutModal onClose={handleCLoseLogoutModal} />
            }
        </div>
    )
}

export default Navbar
