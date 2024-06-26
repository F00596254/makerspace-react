import { useDispatch } from "react-redux";
import TextFields from "../components/TextFields";
import Button from "../components/Button";
import PasswordToggle from "../components/PasswordField";
import { LogginIn } from "../buttonActions/loggingIn";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedIn, warning } from "../store/atoms/isLoggedIn";
export default function Signin() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setIsLoggedInS = useSetRecoilState(isLoggedIn);
    const warningS = useRecoilValue(warning)
    const setWarning = useSetRecoilState(warning)
    const navigate = useNavigate();
    return (
        <div className="mb-auto">
            <div className="font-bold text-7xl mt-16 ml-52">My Account</div>
            <div className="font-bold text-5xl text-2xl ml-52 mt-12 text-blue-800">
                Login here
            </div>
            <div className="mt-12 border">
                <div className="ml-44">
                    <TextFields onChange={(e) => {
                        setEmail(e.target.value)
                    }} label={"Email address *"} placeholder={"Username here......"} />
                </div>
                <div className="ml-48">
                    <PasswordToggle onChange={(e) => {
                        setPassword(e.target.value)
                    }} label={"Password *"} placeholder={"Password here......"} />
                </div>

                <div className="ml-48 mt-1 normal text-red-500">{warningS !== "" ? warningS : ""}</div>

                {/* <div className="mt-4 ml-48 mb-8  flex items-center">
            <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label  className="ms-2 text-sm   font-bold text-black ">Remember me </label>
        </div> */}
                <div onClick={() => { window.location.reload() }} className="ml-48 mt-3 hover:cursor-pointer font-medium text-primary-600  underline text-red-500"><Link to={"/enteremail"}>Forgot Password?</Link></div>
                <div className="ml-48 mt-4  mb-4">
                    <Button onClick={() => LogginIn(email, password, setIsLoggedInS, navigate, setWarning, dispatch)} label={"LOG IN"}></Button>
                </div>
            </div>
        </div>
    );
}
