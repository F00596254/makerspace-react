import Ticketbar from "../components/TicketBar";

import TextFields from "../components/TextFields"
import Button from "../components/Button";
export default function Signin() {
    return <div >

        <div className="font-bold text-7xl mt-16 ml-52">
            My Account
        </div>
        <div className="font-bold text-5xl text-2xl ml-52 mt-12 text-blue-800" >
            Login here
        </div>

        <div className="mt-12 border">
            <div className="ml-44">
                <TextFields label={"Username or Email address *"} placeholder={"Username here......"}></TextFields>
            </div>
            <div className="ml-44">
                <TextFields label={"Password *"} placeholder={"Password here......"}></TextFields>
            </div>
 

            <div className="ml-52 mb-8  flex items-center">
                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label  className="ms-2 text-sm   font-bold text-black ">Remember me </label>
            </div>
            <div className="ml-48 mb-4">
                <Button label={"LOG IN"}></Button>
            </div>
        </div>
    </div>
}