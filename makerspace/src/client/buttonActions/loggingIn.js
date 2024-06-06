import axios from 'axios';
export async function LogginIn(email, password, setIsLoggedInS, navigate,setWarning) {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/signin',
            { email, password },{
                headers:{
                    Authorization: sessionStorage.getItem("token")
                }
            },
            { withCredentials: true }
        );

        const data = response.data;

        if (data.success) {
            setWarning("");  
            setIsLoggedInS(true);
            localStorage.setItem('token', data.success);  // Use data.token to store token in localStorage
            sessionStorage.setItem('token', data.token);
            alert('You have successfully logged in');
            navigate('/home');
        } else {
            setWarning(data.msg);
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        alert('An error occurred. Please try again.');
    }
}
