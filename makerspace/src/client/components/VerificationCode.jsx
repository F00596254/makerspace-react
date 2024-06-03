import { useState } from "react";
import Button from "./Button";
import verificationCode from "../buttonActions/verificationCode";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { warning } from "../store/atoms/isLoggedIn";
import checkEmailAccount from "../buttonActions/checkEmail";

export default function VerificationCode({email,setWarning}) {
    const [digit1, setDigit1] = useState('');
    const [digit2, setDigit2] = useState('');
    const [digit3, setDigit3] = useState('');
    const [digit4, setDigit4] = useState('');
    const [digit5, setDigit5] = useState('');
    const [digit6, setDigit6] = useState('');
    const[resend,setResend]=useState("Resend");
    const warningS = useRecoilValue(warning);
    const navigate=useNavigate();
    return <>
        <div className="mt-4">
            <div className="flex mb-2">
                <div className="w-12 h-12 mr-2">
                    <input onChange={(e)=>{
                        setDigit1(e.target.value);
                    }} className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-700 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text"  maxLength={1} name="" id="" />
                </div>
                <div className="w-12 h-12 mr-2">
                    <input onChange={(e)=>{
                        setDigit2(e.target.value);
                    }} className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-700 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength={1} name="" id="" />
                </div>
                <div className="w-12 h-12 mr-2">
                    <input onChange={(e)=>{
                        setDigit3(e.target.value);
                    }} className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-700 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength={1} name="" id="" />
                </div>
                <div className="w-12 h-12 mr-2">
                    <input onChange={(e)=>{
                        setDigit4(e.target.value);
                    }} className="w-full h-full flex flex-col items-center justify-center text-center   outline-none rounded-xl border border-gray-700 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength={1} name="" id="" />
                </div>
                <div className="w-12 h-12 mr-2">
                    <input onChange={(e)=>{
                        setDigit5(e.target.value);
                    }} className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-700 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength={1} name="" id="" />
                </div>
                <div className="w-12 h-12 mr-2">
                    <input onChange={(e)=>{
                        setDigit6(e.target.value);
                    }} className="w-full h-full flex flex-col items-center justify-center text-center   outline-none rounded-xl border border-gray-700 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength={1} name="" id="" />
                </div>

            </div>
            <div className="flex space-y-2">

                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didnt recieve code?</p> <a onClick={()=>{
                        setResend("Sent")
                        checkEmailAccount(email,setWarning)
                    }} className="flex flex-row items-center text-blue-600 hover:cursor-pointer" target="_blank" rel="noopener noreferrer"> {resend}</a>
                </div>
            </div>
            <div className="mt-1 ml-2 normal text-red-500">{warningS !== "" ? warningS : ""}</div>
            <div className="mt-4">   
                <Button onClick={()=>{

                    verificationCode(digit1,digit2,digit3,digit4,digit5,digit6,email,setWarning,navigate)
                }} label={"Submit"}></Button>
                </div>
        </div>

    </>
}