import axios from "axios";

export default async function userUpdate(email,firstName,lastName,id){

    try {
       let response= await axios.put(`http://localhost:3000/admin/updateUser/${id}`,{
                email:email,
                firstName:firstName,
                lastName:lastName       
        } );

        if(response.data.success){
            alert('User updated successfully!');
            window.location.reload();
        }

    } catch (error) {
        console.error('Error updating user:', error);
    }
}