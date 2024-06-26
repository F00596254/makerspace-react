import { useEffect, useState } from "react";
import axios from 'axios';
import TextFields from "../components/TextFields";
import Button from "../components/Button"
import { updateNames } from "../buttonActions/updateNames";
export default function AccountDetails(){

    const[email,setEmail]=useState("");
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[updateFname,setUpdateFname]=useState("");
    const[updateLname,setUpdateLname]=useState("");
    useEffect(()=>{
        const fetchUserDetails = async () => {
            try {
              const response = await axios.get('http://localhost:3000/api/userDetails', {
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              });
      
              const data = response.data;
              setEmail(data.email);
              setFirstName(data.firstName);
              setLastName(data.lastName);
            } catch (error) {
              console.error('Error fetching user details:', error);
              // Handle error appropriately, e.g., show a notification
            }
        };
      
        fetchUserDetails();
    },[]);  

    return <>
         <div className="flex justify-center mt-20 font-medium text-3xl"> User Profile  </div>
        <div className="mb-auto">
            <div className="m-auto w-1/2 h-auto  border mt-2  ">
                <div className="flex pl-4 mt-12">
                <div className="m-2 font-medium text-2xl">Email address * :</div>
                <div className="m-2 font-medium text-zinc-600 text-2xl">{email}</div>
               </div>
                <div className="flex pl-4 mt-2">
                <div className="m-2 font-medium text-2xl">First Name * :</div>
                <div className="m-2 font-medium text-zinc-600 text-2xl">{firstName}</div>
               </div>
                <div className="flex pl-4 mt-2">
                <div className="m-2 font-medium text-2xl">Last Name * :</div>
                <div className="m-2 font-medium text-2xl text-zinc-600  ">{lastName}</div>
               </div>
               <div className="h-0.5 mt-8 border"></div>
               <div className="mb-28">
                        <div className="mt-8 m-2 pl-4  text-gray-500 font-medium text-2xl">
                            CHANGE YOUR NAME HERE
                        </div>
                        <div >
                            <div className="ml-8 m-4 font-normal text-2xl">
                            FIRST NAME:                               
                            </div>
                            <div className="w-4/12 ml-8">
                                <TextFields onChange={(e)=>{
                                    setUpdateFname(e.target.value)
                                }}/>
                            </div>
                        </div>
                        <div >
                            <div className="ml-8 m-4 font-normal text-2xl">
                            LAST NAME:                               
                            </div>
                            <div className="w-4/12 ml-8">
                                <TextFields onChange={(e)=>{
                                    setUpdateLname(e.target.value)
                                }} />
                            </div>
                        </div>
                        
                        
                        <div className="m-8 w-24">
                            <Button label={"Submit"} onClick={()=>updateNames(updateFname,updateLname)}/>
                        </div>
               </div>

            </div>
        </div>
    
    
    </>
}