import Ticketbar from "../components/TicketBar";
 
import TextFields from "../components/TextFields"
import Button from "../components/Button";
export default function Signup(){
    return <div >
         
         <div className="font-bold text-5xl mt-20 ml-52">
         3D PRINTING REQUEST/HELP
       </div>
       <div className="text-2xl ml-52 mt-12 text-slate-600" >
       You are welcome to submit 3D printing request or connect to use by submitting a ticket here. If you have any questions, please check FAQ below
       </div>
       <Ticketbar/>
       <div className="ml-44">
       <TextFields label={"Username *"} placeholder={"Username here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields label={"Email *"} placeholder={"Email here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields label={"First Name "} placeholder={"First name here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields label={"Last Name"} placeholder={"Last name here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields label={"Password *"} placeholder={"Password here......"}></TextFields>
       </div>
       <div className="ml-44">
       <TextFields label={"Repeat Password *"} placeholder={"Repeat Password here......"}></TextFields>
       </div>
       <div className="flex ">
       <div className="mt-6 ml-48 mb-20">
        <Button label={"REGISTER"}></Button>
       </div>
       <div className="mt-6 mb-20 ml-4">
        <Button label={"CANCEL"}></Button>
       </div>
       </div>
    
     
       
    </div>
}
 