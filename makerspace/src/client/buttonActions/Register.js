 

export async function Register(email,first_name,last_name,password,repeatPassword,setIsLoggedInS,navigate){
     

    if(password!=repeatPassword){
        alert("Your passwords are not matching");
        return;
    }

   let response= await fetch("http://localhost:3000/api/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            first_name:first_name,
            last_name:last_name,
            password:password
        })
    })
          let data=await response.json();
          
          if(data.success){
                localStorage.setItem("token",true);
                sessionStorage.setItem("token",data.token);
                setIsLoggedInS(true);
                alert("you have successfully registered with us ");
                navigate("/home");
            }else{
                alert(data.msg);
            }
}