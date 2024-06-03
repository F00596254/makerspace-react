import { useState } from "react";
import Button from "../components/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { warning } from "../store/atoms/isLoggedIn";

import { useNavigate } from "react-router-dom";
import forgotPassword from "../buttonActions/forgotPassword";
import VerificationCode from "../components/VerificationCode";
import checkEmailAccount from "../buttonActions/checkEmail";


export default function EnterYourEmail() {
    const [email, setEmail] = useState("");
    const warningS = useRecoilValue(warning);
    const setWarning = useSetRecoilState(warning);
    const [Vlabel, setVlabel] = useState("Get the verification code ")
    const navigate = useNavigate();
    return <>

        <div className="mb-auto flex justify-center">
            <div className=" w-3/4 h-auto">

                <div className="mt-52">
                    <div className="border flex justify-center">
                        <div className="m-4 w-1/2">
                            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-black">{"ENTER YOUR EMAIL HERE"}</label>
                            <input onChange={(e) => {
                                setEmail(e.target.value)
                            }} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={"john@gmail.com"} required />

                            {/* <div className="mt-1 ml-2 normal text-red-500">{warningS !== "" ? warningS : ""}</div> */}
                            <div className="mt-2">

                                <div className="hover:cursor-pointer underline " onClick={() => {
                                    checkEmailAccount(email, setWarning, setVlabel, navigate)
                                }} > {Vlabel} </div>

                                <div className="mt-8">
                                    <VerificationCode email={email} setWarning={setWarning} />
                                </div>

                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}