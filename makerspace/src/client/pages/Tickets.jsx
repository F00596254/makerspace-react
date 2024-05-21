import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextFields from "../components/TextFields";
import dropdownData from "./../assets/data.json"
import { submitTicket } from "../buttonActions/submitTicket";
const Tickets = () => {
  const [email, setEmail] = useState('')  
  const [name, setName] = useState('')
  const [phone, setPhone] = useState();
  const [department, setDepartment] = useState('Choose');
  const [priority, setPriority] = useState('Choose');
  const [ticketType, setTicketType] = useState('Choose');
  const [role, setRole] = useState('Choose');
  const [subject, setSubject] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [details, setDetails] = useState("");
  const [attachments, setAttachments] = useState([{ id: Date.now(), file: null }]);
  const fileInputRefs = useRef([]);

  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validatePhoneNumber = (phoneNumber) => {
    return phoneRegex.test(phoneNumber);
  };
  
  const validateEmail = (email) => {
    return emailRegex.test(email);
  };


  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    setAttachments(attachments.map((attachment, i) => (i === index ? { ...attachment, file } : attachment)));
  };

  const handleAdd = () => {
    setAttachments([...attachments, { id: Date.now(), file: null }]);
  };

  const handleRemove = (id, index) => {
    if (attachments.length > 1) {
      setAttachments(attachments.filter((attachment) => attachment.id !== id));
    } else {
      // Clear the file input value
      fileInputRefs.current[index].value = "";
      setAttachments([{ id, file: null }]);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));

  }

  const handleName = (e) => {
    setName(e.target.value);
}

  const handlePhone = (e) => {
            const { value } = e.target;
            setPhone(value);
            setIsValidPhone(validatePhoneNumber(value));
        };

   const handleDepartment = (e) => {     
    setDepartment(e.target.value);
    }

   const handlePriority = (e) => {
    setPriority(e.target.value);
    } 

    const handleTicketType = (e) => {
        setTicketType(e.target.value);
    }

    const handleRole = (e) => {
        setRole(e.target.value);
    }

    const handleSubject = (e) => {
        setSubject(e.target.value);
    }

    // const handleDetails = (e) => {
    //     setDetails(e.target.value);
    // }

    const handleSubmit = () => {
        if ((isValidPhone && isValidEmail) && (department !== 'Choose' && priority !== 'Choose' && ticketType !== 'Choose' && role !== 'Choose')) {
            submitTicket({email, name, phone, department, priority, ticketType, role, subject, details, attachments});
        }
        else
        {alert("Please fill all the fields correctly")}}
                
  return (
    <div className="flex flex-col items-center justify-center">
      <legend>3D PRINTING REQUEST/HELP</legend>
      <form className="grid grid-cols-2 gap-4" encType="">
        <div className="m-4 w-96">
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleEmail}
          />
        </div>
        <div className="m-4 w-96">
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleName}
          />
        </div>
        <TextFields label="Phone" type="number" className="mt-1 block w-full" onChange={handlePhone} />
        <div className="m-4 w-96">
          <label className="block text-xl font-medium text-gray-900 dark:text-black mb-2">
            Department
          </label>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleDepartment}
          >
            <option value={null} key={null} selected>Choose</option>
           { dropdownData.department.map((d)=>(<option key={d.value} value={d.value}>{d.label}</option>))}
          </select>
        </div>
        <div className="m-4 w-96">
          <label className="block text-xl font-medium text-gray-900 dark:text-black mb-2">
            Priority
          </label>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handlePriority}>
          <option value={null} key={null} selected>Choose</option>
          { dropdownData.priority.map((p)=>(<option key={p.value} value={p.value}>{p.label}</option>))}
          </select>
        </div>
        <div className="m-4 w-96">
          <label className="block text-xl font-medium text-gray-900 dark:text-black mb-2">
            Ticket Type
          </label>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleTicketType}
          >
                        <option value={null} key={null} selected>Choose</option>
          { dropdownData.ticketType.map((t)=>(<option key={t.value} value={t.value}>{t.label}</option>))}
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="m-4 w-96">
          <label className="block text-xl font-medium text-gray-900 dark:text-black mb-2">
            Identity/Role
          </label>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleRole}
          >
                        <option value={null} key={null} selected>Choose</option>

          { dropdownData.identity.map((i)=>(<option key={i.value} value={i.value}>{i.label}</option>))}
        
          </select>
        </div>
        <div></div>
        <div className="p-4 col-span-2">
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">
            Subject
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleSubject}
          />
        </div>
        <div className="col-span-2 p-4">
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">
            Issue Details item, color, size, material, purpose
          </label>
          <ReactQuill className="mb-5 h-[15vh]" theme="snow" value={details} onChange={setDetails} />
        </div>
        <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">
            Attachments
          </label>
        <div className="col-span-2 p-4">
          {attachments.map((attachment, index) => (
            <div key={attachment.id} className="flex items-center mb-2">
              <input
                type="file"
                ref={(el) => (fileInputRefs.current[index] = el)}
                onChange={(e) => handleFileChange(e, index)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemove(attachment.id, index)}
                className="text-white bg-blue-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-10 py-3 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                REMOVE
              </button>
            </div>
          ))}
          <p className="mt-2 text-sm text-gray-600">Maximum File Size: 100000KB</p>
          <p className="mt-1 text-sm text-gray-600">File Extension Type: jpg, jpeg, png, stl, pdf</p>
        </div>
        <div>
          <button
            type="button"
            onClick={handleAdd}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-3 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            ADD MORE FILES
          </button>
        </div>
        <div>
            
        <button
                type="button"
                className="text-white bg-blue-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-10 py-3 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Clear
              </button>
        <button
                type="button"
                onClick={handleSubmit}
                className="text-white bg-blue-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-10 py-3 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
        </div>
      </form>
    </div>
  );
};

export default Tickets;
