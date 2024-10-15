import React, { useEffect, useState, useRef } from "react";

import greenArrowDown from "../assets/images/Drop down.png";
import { useLocation } from "react-router-dom";
const EditProfile = () => {


    const location = useLocation();


    return (
        <>
            <h2 className="text-[1.4rem] mt-14 font-poppins  text-black  text-center">
                Update Profile
            </h2>
            <form onSubmit={() => { }}>
                <div className="grid grid-cols-2 ">
                    <div>
                        <div className="flex flex-wrap px-10 py-5">
                            <div className="flex flex-col  w-1/2 sm:w-1/2 p-[10px]">
                                <label
                                    htmlFor="user_first_name"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="user_first_name"
                                    id="user_first_name"
                                    //   onChange={formik.handleChange}
                                    //   onBlur={formik.handleBlur}
                                    //   value={
                                    //     formik.values.patient_first_name ||
                                    //     profileData?.patient_first_name
                                    //   }
                                    placeholder="Enter your first name"
                                    className="border border-[#2a7086] outline-[#2a7086] text-black rounded py-2 px-4 text-[12px] sm:text-[14px]"
                                />


                            </div>
                            <div className="flex flex-col w-1/2 sm:w-1/2 p-[10px]">
                                <label
                                    htmlFor="user_last_name"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="user_last_name"

                                    id="user_last_name"
                                    placeholder="Enter your last name"
                                    className="border border-[#2a7086] outline-[#2a7086] text-black rounded py-2 px-4 text-[12px] sm:text-[14px]"
                                />

                            </div>

                            <div className="flex flex-col  w-1/2 sm:w-1/2 p-[10px]">
                                <label
                                    htmlFor="gender"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    Gender
                                </label>
                                <select
                                    className="border border-[#2a7086]  rounded py-2 px-4 text-black text-[12px] sm:text-[14px]"
                                    id="gender"
                                    name="gender"

                                >
                                    <option value="" className="text-formLabel">
                                        Select
                                    </option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="Other">Other</option>
                                </select>

                            </div>
                            <div className="flex flex-col w-1/2 p-[10px]">
                                <label
                                    htmlFor="user_dob"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    BirthDay
                                </label>
                                <input
                                    type="date"
                                    name="user_dob"
                                    id="user_dob"
                                    placeholder="MM/DD/YYYY"
                                    // onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    // value={formik.values.patient_dob || profileData?.patient_dob}
                                    className="border border-[#2a7086] outline-verifiCation text-black rounded py-[6px] px-4 text-[12px] sm:text-[14px]"
                                />

                            </div>
                            <div className="flex flex-col  w-1/2 p-[10px] relative">
                                <label
                                    htmlFor="user_phone"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    Mobile Number
                                </label>
                                <div className="absolute left-2 top-[2.3rem] sm:top-[2.86rem] w-3 pl-2  h-full text-md text-formLabel">
                                    +1
                                </div>
                                <input
                                    type="number"
                                    name="user_phone"
                                    id="user_phone"

                                    placeholder="XXX XXX XXXX"
                                    className="border border-[#2a7086] outline-[#2a7086]  text-black rounded py-2 px-7 sm:px-8 text-[10px] sm:text-[14px] w-full"
                                />

                            </div>
                            <div className="flex flex-col  w-1/2 p-[10px]">
                                <label
                                    htmlFor="user_email"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    Email ID
                                </label>
                                <input
                                    type="email"
                                    name="user_email"

                                    id="user_email"
                                    placeholder="email@domain.com"
                                    className="border border-[#2a7086] text-black outline-verifiCation rounded py-2 px-4 text-[12px] sm:text-[14px]"
                                />

                            </div>

                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap px-4 sm:px-24 mt-5">
                            <div className="flex flex-col  w-full p-[10px]">
                                <label
                                    htmlFor="apartment"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    Apartment/Building
                                </label>
                                <input
                                    type="text"
                                    name="apartment"
                                    id="apartment"

                                    placeholder="Building/Apartment/Unit"
                                    className="border border-[#2a7086] outline-verifiCation text-black rounded py-2 px-4 text-[12px] sm:text-[14px]"
                                />

                            </div>
                        </div>
                        <div className="flex flex-wrap px-4 sm:px-24">
                            <div className="flex flex-col  w-full p-[10px]">
                                <label
                                    htmlFor="address1"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    name="address1"
                                    id="address1"

                                    placeholder="Enter your address"
                                    className="border border-[#2a7086] outline-verifiCation text-black rounded py-2 px-4 text-[12px] sm:text-[14px]"
                                />

                            </div>
                        </div>
                        <div className="flex flex-wrap px-4 sm:px-24">

                            <div
                                className="relative flex flex-col w-1/3 p-[10px]"
                            >
                                <label
                                    htmlFor="city_id"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city_id"
                                    id="city_id"

                                    placeholder="city"
                                    autoComplete="nope"
                                    className="border border-[#2a7086] outline-verifiCation text-black rounded py-2 px-4 text-[12px] sm:text-[14px]"
                                />
                                {/* {IscityDropDown ? (
                                    <ul
                                        className={`${IscityDropDown
                                                ? "absolute mt-1 px-6 top-20 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                : ""
                                            }`}
                                    >
                                        {cityStatus === "loading"
                                            ? "Loading..."
                                            : cityData &&
                                            cityData.map((item) => (
                                                <li
                                                    className="text-formLabel text-[12px] cursor-pointer relative"
                                                    key={item.id}
                                                    onClick={() =>
                                                        handleSelectedItem(
                                                            {
                                                                id: item.id,
                                                                city_name: item.city_name,
                                                            },
                                                            "city_id"
                                                        )
                                                    }
                                                >
                                                    {item.city_name}
                                                </li>
                                            ))}
                                    </ul>
                                ) : null} */}
                            </div>
                            <div
                                className="flex relative flex-col w-1/3 p-[10px]"
                            >
                                <label
                                    htmlFor="zip_code_id"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    Zip
                                </label>
                                <input
                                    type="text"
                                    name="zip_code_id"
                                    id="zip_code_id"
                                    placeholder="zip code"
                                    autoComplete="nope"
                                    className="border border-[#2a7086] outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
                                />


                            </div>
                            <div className="flex relative flex-col w-1/3 p-[10px]">
                                <label
                                    htmlFor="state"
                                    className="font-poppins text-formLabel text-sm py-1"
                                >
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    placeholder="select"
                                    className="border border-[#2a7086] outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
                                />
                                <img
                                    src={greenArrowDown}
                                    alt=""

                                    className={`w-3 h-3 mr-2 cursor-pointer absolute right-4 top-[3.3rem] `}
                                />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-10 mb-10">
                    <button
                        onClick={() => { }}
                        type="submit"
                        className="bg-verifiCation cursor-pointer text-white font-sansMedium text-[14px] py-2 px-16 rounded-full"
                    >
                        Update
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditProfile;
