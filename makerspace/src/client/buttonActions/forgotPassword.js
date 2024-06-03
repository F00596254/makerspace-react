import { z } from "zod";
import { forgotPassSchema } from "../Validation/zod";

export default async function forgotPassword(newPassword,repNewPassword,setWarning,navigate ){

    const formData = {
        newPassword: newPassword,
        repeatNewPassword: repNewPassword
      };
      try {
        forgotPassSchema.parse(formData);
      } catch (e) {
        if (e instanceof z.ZodError) {
          setWarning("Validation failed: Follow the above rules / Both the fields must be same")
          // alert("Validation failed: Follow the below rules");
          return;
        } else {
          setWarning("An unexpected error occurred")
          alert("An unexpected error occurred");
          return;
        }
      }
      setWarning("");
      

      let response= await fetch("http://localhost:3000/api/forgot-password",{
        method:"POST",
        headers:{
          "authorization":sessionStorage.getItem("Fkey"),
          "Content-Type":"application/json"
        },body:JSON.stringify({
          newPassword:newPassword
        })
      })

      let data=await response.json();
      if(data.success==false){
          setWarning(data.msg);
      }else{
         sessionStorage.removeItem("Fkey");
         alert(data.msg)
         navigate("/signin")
      }
}