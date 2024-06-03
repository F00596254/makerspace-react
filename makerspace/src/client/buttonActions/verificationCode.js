
export default async function verificationCode(digit1,digit2,digit3,digit4,digit5,digit6,email,setWarning,navigate){

    let code=digit1+digit2+digit3+digit4+digit5+digit6
    console.log(code)
    if(code==null || code==""){
      setWarning("input field cannot be empty")
      return
    }else if(code.length < 6){
      setWarning("You have not entered 6-digit code")
      return
    }
    setWarning("")
    let response= await fetch("http://localhost:3000/api/reset-password",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },body:JSON.stringify({
          resetCode:code,  
          email:email
        })
      })
      let data=await response.json();
      if(data.success){

        alert(data.msg);
        // sessionStorage.removeItem("Fkey");
        // window.location.href = "/signin";
        navigate("/forgotpassword")
      }else{
        setWarning(data.msg);
      }
}