import { useEffect, useState } from "react";
import Button from "../components/Button"
import TextFields from "../components/TextFields"
import { useParams } from "react-router-dom";
import axios from "axios";
import userUpdate from "../adminActions/userUpdate";

export default function EditUserDetails(){

    const { id } = useParams();
    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });

    const[fName,setFname]=useState("");
    const[lName,setLname]=useState("");
    const[email,setEmail]=useState("");
    useEffect(() => {
      
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admin/getUser/${id}`);
                
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);



    return <>
    
             <div className="flex justify-center mt-20 font-medium text-3xl">Edit User Profile  </div>
        <div className="mb-auto">
            <div className="m-auto w-1/2 h-auto  border mt-2  ">
                <div className="flex pl-4 mt-12">
                <div className="m-2 font-medium text-2xl">Email address * :</div>
                <div className="m-2 font-medium text-zinc-600 text-2xl">{user.email}</div>
               </div>
                <div className="flex pl-4 mt-2">
                <div className="m-2 font-medium text-2xl">First Name * :</div>
                <div className="m-2 font-medium text-zinc-600 text-2xl">{user.first_name}</div>
               </div>
                <div className="flex pl-4 mt-2">
                <div className="m-2 font-medium text-2xl">Last Name * :</div>
                <div className="m-2 font-medium text-2xl text-zinc-600  ">{user.last_name}</div>
               </div>
               <div className="h-0.5 mt-8 border"></div>
               <div className="mb-28">
                        <div className="mt-8 m-2 pl-4  text-gray-500 font-medium text-2xl">
                            CHANGE YOUR NAME HERE
                        </div>
                        <div >
                            <div className="ml-8 m-4 font-normal text-2xl">
                            EMAIL ADDRESS:                               
                            </div>
                            <div className="w-4/12 ml-8">
                                <TextFields onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}/>
                            </div>
                        </div>
                        <div >
                            <div className="ml-8 m-4 font-normal text-2xl">
                            FIRST NAME:                               
                            </div>
                            <div className="w-4/12 ml-8">
                                <TextFields onChange={(e)=>{
                                    setFname(e.target.value)
                                }}/>
                            </div>
                        </div>
                        <div >
                            <div className="ml-8 m-4 font-normal text-2xl">
                            LAST NAME:                               
                            </div>
                            <div className="w-4/12 ml-8">
                                <TextFields onChange={(e)=>{
                                     setLname(e.target.value)
                                }} />
                            </div>
                        </div>
                        
                        
                        <div className="m-8 w-24">
                            <Button label={"Submit"} onClick={()=>userUpdate(email,fName,lName,id)}/>
                        </div>
               </div>

            </div>
        </div>
    
    
    </>
}