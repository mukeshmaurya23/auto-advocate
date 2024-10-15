import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogoutModal from "./LogoutModal";
import appLogo from "../assets/images/autoadvocatelogo.png"
const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const location = useLocation();
    console.log(location.pathname, "im location from sidebar");
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col md:flex-row h-screen">
                <div
                    className={`md:hidden ${isSidebarOpen ? "bg-[#2a7086]" : "bg-[#2a7086]"
                        }`}
                >
                    <div className="flex justify-between p-2">
                        <button
                            className={`   ${isSidebarOpen ? "text-white" : "text-black "}`}
                            onClick={toggleSidebar}
                            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isSidebarOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    className={`${isSidebarOpen ? "block" : "hidden"
                        } md:block bg-[#2a7086] sm:w-[13rem] 2xl:w-[17rem] overflow-y-auto flex flex-col relative h-screen md:h-auto`}
                >
                    <div className="p-10">
                        <Link to="/">
                            {/* <img
                                src={appLogo}
                                alt="Logo"
                                className="h-28 w-28 rounded-full"
                            /> */}
                            <h4 className="text-white font-poppins text-xl font-extrabold text-gray-700 mb-10">
                                Negotigator
                            </h4>
                        </Link>
                    </div>
                    <div className="flex flex-col absolute bottom-0 w-full mb-10 ">

                        <Link
                            to="/sidebar"
                            className={`w-full block px-12 py-2 text-white cursor-pointer font-sansRegular text-[.8rem] 2xl:text-[20px] 2xl:py-[1.3rem] 
             
              `}
                            style={
                                location.pathname === "/sidebar"
                                    ? { backgroundColor: "#fff", color: "#008282" }
                                    : undefined
                            }
                        >
                            My Profile
                        </Link>

                        <Link
                            to="change-password"
                            style={
                                location.pathname === "/sidebar/change-password"
                                    ? { backgroundColor: "#fff", color: "#008282" }
                                    : undefined
                            }
                            className={`w-full block px-12 py-2 text-white cursor-pointer font-sansRegular text-[.8rem] 2xl:text-[17px] 2xl:py-[1.3rem] `}
                        >
                            Change Password
                        </Link>
                        <span
                            onClick={() => {
                                setDeleteModal(true);
                            }}
                            className="w-full block px-12 py-2 text-white  cursor-pointer font-sansRegular text-[.8rem] 2xl:text-[17px] 2xl:py-[1.3rem]"
                        >
                            Delete Account
                        </span>
                        <span
                            className="w-full block px-12 py-2 text-white  cursor-pointer font-sansRegular text-[.8rem] 2xl:text-[17px] 2xl:py-[1.3rem]"
                            onClick={() => {
                                setModal(true);
                            }}
                        >
                            Sign out
                        </span>
                    </div>
                </div>

                <main className="hidden md:block flex-1 overflow-y-auto">
                    <Outlet />
                </main>
                {!isSidebarOpen ? (
                    <main className="block md:hidden flex-1 overflow-y-auto">
                        <Outlet />
                    </main>
                ) : null}
            </div>
            {modal && (
                <LogoutModal
                    onClose={() => {
                        setModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default SideBar;
