 

import TextFields from "../components/TextFields"
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    return <div >

        <div className="font-bold text-7xl mt-16 ml-52">
            My Account
        </div>
        <div className="font-bold text-5xl text-2xl ml-52 mt-12 text-blue-800" >
            Login here
        </div>

        <div className="mt-12 border">
            <div className="ml-44">
                <TextFields onChange={(e)=>{
                        setUsername(e.target.value);
                }} label={"Username or Email address *"} placeholder={"Username here......"}></TextFields>
            </div>
            <div className="ml-44">
                <TextFields type={"Password"} onChange={(e)=>{
                        setPassword(e.target.value);
                }} label={"Password *"} placeholder={"Password here......"}></TextFields>
            </div>


            <div className="ml-52 mb-8  flex items-center">
                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label className="ms-2 text-sm   font-bold text-black ">Remember me </label>
            </div>
            <div className="ml-48 mb-4">
                <Button onClick={async () => {

                    let response = await fetch("http://localhost:3000/makerspace/signin", {
                        method: "POST",
                        body: JSON.stringify({
                            username: username,
                            password:password
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    let data = await response.json();
                    console.log(data);

                    if (data.success) {
                        alert("you have successfully logged in ");
                        navigate("/home");
                    }else{
                        alert("You have entered the wrong inputs ");
                    }
                }} label={"LOG IN"}></Button>
            </div>
        </div>
        <div className="mb-44"></div>
    </div>
}