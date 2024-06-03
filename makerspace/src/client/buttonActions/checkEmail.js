
export default async function checkEmailAccount(email,setWarning,setVlabel){

    if(email==null || email==""){
        setWarning("Email can't be empty")    
        return;
    }

    setWarning("")
    const response=await fetch("http://localhost:3000/api/check-email",{
        method:"POST",
        body:JSON.stringify({
            email:email
        }),  
        headers:{
            "Content-Type":"application/json"
        }
    })
        let data= await response.json();
        console.log(data)
            if(data.success){
                setWarning("")
                sessionStorage.setItem("Fkey",data.Fkey);
                setVlabel("Code has been sent to your email successfully ")
                
            }else{
                setWarning(data.msg);
            }
}