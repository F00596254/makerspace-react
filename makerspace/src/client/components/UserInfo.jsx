import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function UserInfo({ user }) {
    const navigate = useNavigate();
    return <>

        <div className="mt-4 border">

            <div>
                <div className="flex pl-4 mt-2">
                    <div className="m-2 font-medium text-2xl">Email address * :</div>
                    <div className="m-2 font-medium text-zinc-600 text-2xl">{user.email}</div>
                </div>
                <div className="flex pl-4 mt-2">
                    <div className="m-2 font-medium text-2xl">First Name * :</div>
                    <div className="m-2 font-medium text-zinc-600 text-2xl">{user.first_name}</div>
                </div>
                <div className="flex pl-4 mt-2">
                    <div className="m-2 font-medium text-2xl">Last Name * :</div>
                    <div className="m-2 font-medium text-2xl text-zinc-600  ">{user.last_name}</div>
                </div>
            </div>
            <div className="m-4">
                <Button onClick={()=>{
                    navigate(`/edit-user/${user._id}`);
                }} label={"Edit User details"}></Button>
            </div>


        </div>
    </>
}