import Ticketbar from "../components/TicketBar";
 
import TextFields from "../components/TextFields"
import Button from "../components/Button";
import { useState } from "react";
 
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../store/atoms/isLoggedIn";
import { Register } from "../buttonActions/Register";
import PasswordToggle from "../components/PasswordField";
export default function Signup(){
  const[email,setEmail]=useState("");
  const[first_name,setFirstName]=useState("");
  const[last_name,setLastName]=useState("");
  const[password,setPassword]=useState("");
  const[repeatPassword,setRepeatPassword]=useState("");

  const setIsLoggedInS=useSetRecoilState(isLoggedIn)
  const a=useRecoilValue(isLoggedIn)
  const navigate=useNavigate();
  console.log(a+"sign up ");
    return <div >
         
         <div className="font-bold text-5xl mt-20 ml-52">
         WELCOME TO 3D PRINTING 
       </div>
       <div className="text-2xl ml-52 mt-12 text-slate-600" >
       You are welcome to submit 3D printing request or connect to use by submitting a ticket here. If you have any questions, please check FAQ below
       </div>
    
       
       <div className="ml-44">
       <TextFields  onChange={(e)=>{
        setEmail(e.target.value);
       }}  label={"Email *"} placeholder={"Use a valid email here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields onChange={(e)=>{
        setFirstName(e.target.value);
       }} label={"First Name *"} placeholder={"First name here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields onChange={(e)=>{
        setLastName(e.target.value);
       }} label={"Last Name *"} placeholder={"Last name here......"}></TextFields>
       </div>
       <div className="ml-48 mb-4">
        <PasswordToggle onChange={(e)=> {
          setPassword(e.target.value)}} type="Password"   label={"Password *"} placeholder={"Enter Password here......"}/>
       </div>
       <div className="ml-48">
        <PasswordToggle onChange={(e)=> {setRepeatPassword(e.target.value)}} type="Password"   label={"Repeat Password *"} placeholder={"Re-Enter Password here......"}/>
       </div>
        
       <div className="flex ">
       <div className="mt-6 ml-48 mb-2">
        
        <Button onClick={()=>Register(email,first_name,last_name,password,repeatPassword,setIsLoggedInS,navigate)}  label={"REGISTER"}></Button>
     
       </div>
       <div className="mt-6 mb-16 ml-4">
        <Button label={"CANCEL"}></Button>
       </div>
       </div>
    
     
       
    </div>

  
}
  
// async () =>{
//   try {
//    const response = await fetch("http://localhost:3000/api/signup", {
//        method: "POST",
//        headers: {
//            "Content-Type": "application/json",
//        },
//        body: JSON.stringify({
//            email: email,
//            first_name: first_name,
//            last_name: last_name,
//            password: password,
//        }),
//    });

//    if (response.ok) {
//        const data = await response.json();
//        if (data.success) {
//            setIsLoggedIn(true);
//            alert("You have successfully registered!");
//            navigate("/home");
//        } else {
//            alert(data.msg);
//        }
//    } else {
//        console.error("Network response was not ok.");
//    }
// } catch (error) {
//    console.error("An error occurred:", error);
// }