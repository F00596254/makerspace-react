

export async function updateNames(firstName,lastName){


    

        if(firstName=="" && lastName==""){
            alert("Both Names cannot be empty")
            return;
        }
    
        let response= await fetch("http://localhost:3000/api/updateNames",{
             method:"POST",
             headers:{
                "authorization":sessionStorage.getItem("token"),
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 firstName:firstName,
                 lastName:lastName
             })
         })
    
         let data= await response.json();
         if(data.success){
            alert(data.msg);
            window.location.reload();
         }
    }   



 