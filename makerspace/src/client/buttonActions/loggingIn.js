import axios from 'axios';
import { setIsAdmin } from '../store/actions/actions';

export async function LogginIn(email, password, setIsLoggedInS, navigate, setWarning, dispatch) {
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
            const isAdmin = data.isAdmin || false;
            localStorage.setItem('token', data.token);  // Use data.token to store token in localStorage
            sessionStorage.setItem('token', data.token);
            localStorage.setItem('isAdmin', isAdmin);
            dispatch(setIsAdmin(isAdmin));
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
