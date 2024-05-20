
export async function LogginIn(email,password,setIsLoggedInS,navigate){
     
    let response= await fetch("http://localhost:3000/api/signin",{
         method:"POST",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             email:email,
             password:password
         })
     })
           let data=await response.json();
             if(data.success){
                 setIsLoggedInS(true)
                 localStorage.setItem("token",data.success)
                 sessionStorage.setItem("token",data.token);
                 alert("you have successfully logged in ");
                 navigate("/home");
             }else{
                 alert(data.msg);
             }
 }