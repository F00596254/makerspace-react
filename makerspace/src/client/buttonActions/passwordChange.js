
import { z } from 'zod';
import { schema } from '../Validation/zod';

 

export default async function passwordChange(currpassword,newPassword,repNewPassword,setWarning){

    const formData = {
        password: currpassword,
        newPassword: newPassword,
        repeatNewPassword: repNewPassword
      };
      try {
        schema.parse(formData);
      } catch (e) {
        if (e instanceof z.ZodError) {
          setWarning("Validation failed: Follow the above rules")
          // alert("Validation failed: Follow the below rules");
          return;
        } else {
          setWarning("An unexpected error occurred")
          alert("An unexpected error occurred");
          return;
        }
      }
     

    
        let response= await fetch("http://localhost:3000/api/updatepassword",{
             method:"POST",
             headers:{
                "authorization":sessionStorage.getItem("token"),
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                password:currpassword,
                newPassword:newPassword
             })
         })
         let data=await response.json();
         if(data.success){
            alert(data.msg)
            window.location.reload();
         }else{
            setWarning(data.msg);
            // alert(data.msg);
         }
    
}
 