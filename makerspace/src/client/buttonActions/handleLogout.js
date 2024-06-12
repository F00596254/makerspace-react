import axios from 'axios';
import { setIsAdmin } from '../store/actions';
export const handleLogout = async (dispatch) => {
    try {
        dispatch(setIsAdmin(false));
        let response = await axios.post("http://localhost:3000/api/logout", {}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    } catch (err) {
        console.error("Error logging out ", err);
    }
}