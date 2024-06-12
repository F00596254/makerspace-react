import axios from 'axios';
import { setIsAdmin } from '../store/actions/actions';

export async function LogginIn(email, password, setIsLoggedInS, navigate, dispatch) {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/signin',
            { email, password },
            { withCredentials: true }
        );

        const data = response.data;

        if (data.success) {
            setIsLoggedInS(true);
            const isAdmin = data.isAdmin || false;
            localStorage.setItem('token', data.token);  // Use data.token to store token in localStorage
            sessionStorage.setItem('token', data.token);
            dispatch(setIsAdmin(isAdmin));
            alert('You have successfully logged in');
            navigate('/home');
        } else {
            alert(data.msg);
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        alert('An error occurred. Please try again.');
    }
}
