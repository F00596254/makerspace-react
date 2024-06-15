import { useEffect, useState } from "react";
import UserInfo from "../components/UserInfo";
import axios from "axios";

export default function AllUsers(){

    const[Users,setUsers]=useState([{
        email:"",
        first_name:"",
        last_name:""
    }]);
    
    useEffect(() => {

        const fetchUsers= async () => {

            try {
                const response = await axios.get('http://localhost:3000/admin/getAllUsers',{
                        headers:{
                            "authorization":sessionStorage.getItem("token")
                        }  
                });
                 // Adjust the URL as necessary
                  
                setUsers(response.data.Users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    },[]);

    return <>

        <div className="mb-auto ">

        {Users.map((user,index)=>(
            <UserInfo key={index} user={user} ></UserInfo>
        ))}
        </div>
        

    </>
}