import Ticketbar from "../components/TicketBar";
 
import TextFields from "../components/TextFields"
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function Signup(){
  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[firstName,setfirstName]=useState("");
  const[lastName,setlastName]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
    return <div >
         

         <div className="font-bold text-5xl mt-20 ml-52">
         3D PRINTING REQUEST/HELP
       </div>
       <div className="text-2xl ml-52 mt-12 text-slate-600" >
       You are welcome to submit 3D printing request or connect to use by submitting a ticket here. If you have any questions, please check FAQ below
       </div>
       <Ticketbar/>
       <div className="ml-44">
       <TextFields onChange={e=>{
                 setUsername(e.target.value);
        }} type={"text"} label={"Username *"} placeholder={"Use a valid name here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields onChange={e=>{
                setEmail(e.target.value);
        }} type={"text"} label={"Email *"} placeholder={"Use a valid email here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields onChange={e=>{
                            setfirstName(e.target.value);
        }} type={"text"} label={"First Name "} placeholder={"First name here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields onChange={e=>{
                setlastName(e.target.value);
        }} type={"text"} label={"Last Name"} placeholder={"Last name here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields onChange={e=>{
                setPassword(e.target.value);
        }} type={"Password"}label={"Password *"} placeholder={"Password here......"}></TextFields>
       </div>
        
       <div className="flex ">
       <div className="mt-6 ml-48 mb-20">
        <Button onClick={async ()=>{

          let response= await fetch("http://localhost:3000/makerspace/signup",{
            method:"POST",
            body:JSON.stringify({
                username:username,
                email:email,
                firstName:firstName,
                lastName:lastName,
                password:password
            }),
            headers: {
                "Content-Type": "application/json"
              }
        })
        let data=await response.json();
        console.log(data);

        if(data.success){
            localStorage.setItem("token",data.token )
            localStorage.setItem("userId",data.userId)
            alert("you have successfully logged in ");
            navigate("/home");
        }else{
          alert(data.msg);
        } 
        }} label={"REGISTER"}></Button>
       </div>
     
       <div className="mt-6 mb-20 ml-4">
        <Button label={"CANCEL"}></Button>
       </div>
         
       </div>
    
     
       
    </div>
}
 