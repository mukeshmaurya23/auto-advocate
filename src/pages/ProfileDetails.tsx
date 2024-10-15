import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import address from "../assets/images/Address.png";
import mail from "../assets/images/Mail.png";
import phoneNo from "../assets/images/Number.png";
import genderImg from "../assets/images/gender.png"
const ProfileDetails = () => {

    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(false);
    const calcularteDob = (dob: string) => {
        const today = new Date();
        const birthDate = new Date(dob);
        console.log(birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m > 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    //   useEffect(() => {
    //     const fetchUserProfileData = async () => {
    //       setLoading(true);
    //       try {
    //         const response = await customAxios.post("/patient/profile");
    //         setProfileData(response?.data?.data?.result);
    //         setLoading(false);
    //       } catch (error) {
    //         console.log(error.response.data);
    //       }
    //     };
    //     fetchUserProfileData();
    //   }, []);

    console.log(profileData, "profileData**************");
    return <div className="flex justify-center items-center flex-col py-10 h-screen">
        <h2 className="text-center font-sansRegular font-semibold text-[#292F33] text-[20px] tracking-[3px] mb-10">
            Profile Details
        </h2>
        <div className="border border-[#008282] rounded-xl  p-[30px]">
            <h2 className="text-center font-Henriette text-[20px] mb-5">
                John Doe
            </h2>
            <div className="w-[462px]">
                <div className="flex flex-row">
                    <div className="w-1/4 py-2 border border-[#008282] flex flex-col items-center">
                        <img
                            src={genderImg}
                            alt=""
                            className="w-[30px] h-[23px] object-contain"
                        />
                        <span className="text-[10px] font-sansBold text-gray-600 mt-1">
                            Male
                        </span>
                    </div>
                    <div className="w-1/4 py-2 border border-[#008282] flex flex-col items-center">
                        {" "}
                        <p className="text-center mt-1 text-[10px] font-sansBold text-gray-600">
                            {calcularteDob(
                                "1996-10-10"
                            )}
                        </p>
                        <p className="text-[10px] font-sansBold text-gray-600 mt-1">
                            Years Old
                        </p>
                    </div>
                    <div className="w-1/4 py-2 border border-[#008282] flex flex-col items-center">
                        <img
                            src={phoneNo}
                            alt=""
                            className="w-[30px] h-[23px] object-contain"
                        />

                        <p className="text-[10px] font-sansBold text-gray-600 mt-1">
                            1234567890
                        </p>
                    </div>
                    <div className="w-1/4 py-2 border border-[#008282] flex flex-col items-center">
                        <img
                            src={mail}
                            alt=""
                            className="w-[30px] h-[23px] object-contain"
                        />
                        <span className="text-[10px] font-sansBold text-gray-600 mt-1 truncate break-words">
                            test@gmail.com
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-b w-full"></div>
            <div className="flex flex-col  p-5">
                <div className="flex  mt-5">
                    <img
                        src={address}
                        alt=""
                        className="w-[40px] h-[40px] object-contain"
                    />
                    <div className="flex flex-col">
                        <p className="ml-4 text-[#9597A6] text-[13px] ">Address</p>
                        <p className="ml-4 text-[#292F33] font-sansRegular text-[13px] font-semibold">
                            New York, USA
                        </p>
                    </div>
                </div>
                <div className="flex  mt-5">

                    <div className="flex flex-col">
                        <p className="ml-4 text-[#9597A6] text-[13px] ">
                            Vechile Details
                        </p>
                        <p className="ml-4 text-[#292F33] font-sansRegular text-[13px] font-semibold">
                            {/* {profileData?.insurance_company}, PN:{" "}
                            {profileData?.policy_number} */}
                            VIN : 1234567890
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex mt-5 max-w-[550px] mx-auto">
            <p className="font-sansBold text-[14px]">Note:</p>
            <p className="ml-3 font-sansRegular text-[#6B7276] text-[12px]">
                We attach great importance to protecting your private sphere and
                ensuring that your data are secure. We collect, process and store
                personal data (including IP addresses) only as permitted by law or
                if you have given your consent.
            </p>
        </div>
        <Link
            to="update-profile"
            state={{
                profileData,
            }}
        >
            <button className="mt-10 bg-[#2a7086] px-8 uppercase py-2 text-[12px] rounded-full text-white tracking-[1px] font-semibold">
                Edit Profile
            </button>
        </Link>
    </div>

};

export default ProfileDetails;
