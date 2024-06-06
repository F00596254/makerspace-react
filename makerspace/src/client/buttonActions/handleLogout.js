import axios from 'axios';
export const handleLogout=async ()=>{
    try{
        let response=await axios.post("http://localhost:3000/api/logout",{},{
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
    }catch(err){
        console.error("Error logging out ",err);
    }
}