import React,{useEffect,useState} from 'react'
import Modal from 'react-modal';
import ClipLoader from "react-spinners/ClipLoader";
const AllTickets = () => {
    const [tickets, setTickets] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTickets = async () => {
          try {
            const response = await fetch('http://localhost:3000/ticket/getAllTickets');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTickets(data);
            setLoading(false);
          } catch (error) {
            // setError(error);
            setLoading(false);
console.log(error)
        }
        };
    
        fetchTickets();
      }, []); 

      const openModal = (ticket) => {
        setCurrentTicket(ticket);
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };
    
  return (
    <div>AllTickets

<div className="flex justify-center bg-white text-black">
   {loading ? <ClipLoader color="#080f9c" loading={loading} size={50} /> : 
    <table className="table-auto border-collapse border-2 border-gray-300 text-left">
        <thead>
            <tr>
                <th className="px-6 py-4 border-b-2 border-gray-300">Ticket Type</th>
                <th className="px-6 py-4 border-b-2 border-gray-300">Priority</th>
                <th className="px-6 py-4 border-b-2 border-gray-300">Department</th>
                <th className="px-6 py-4 border-b-2 border-gray-300">Name</th>
                <th className="px-6 py-4 border-b-2 border-gray-300">Role</th>
                <th className="px-6 py-4 border-b-2 border-gray-300">View</th>
            </tr>
        </thead>
        <tbody>
            {tickets.map((ticket) => (
                <tr key={ticket._id}>
                    <td className="px-6 py-4 border-b border-gray-300">{ticket.ticketType}</td>
                    <td className="px-6 py-4 border-b border-gray-300">{ticket.priority}</td>
                    <td className="px-6 py-4 border-b border-gray-300">{ticket.department}</td>
                    <td className="px-6 py-4 border-b border-gray-300">{ticket.name}</td>
                    <td className="px-6 py-4 border-b border-gray-300">{ticket.role}</td>
                    <td className="px-6 py-4 border-b border-gray-300 "><button onClick={() => openModal(ticket)} className='text-blue-500'>View</button></td>
                </tr>
            ))}
            
        </tbody>
    </table>}
</div>
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Ticket Details"
  className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
>
  {currentTicket && (
    <div className="bg-white rounded-lg p-6 w-3/4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Ticket Details</h2>
        <button onClick={closeModal} className="text-red-500">Close</button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p>{currentTicket.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p>{currentTicket.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <p>{currentTicket.phone}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <p>{currentTicket.department}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <p>{currentTicket.priority}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
          <p>{currentTicket.ticketType}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p>{currentTicket.role}</p>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <p>{currentTicket.subject}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Details</label>
        <div
          className="border p-2 rounded"
          dangerouslySetInnerHTML={{ __html: currentTicket.details }}
        ></div>
        {currentTicket.attachments && currentTicket.attachments.length > 0 && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Attachments</label>
          <div className="flex flex-col space-y-2">
            {currentTicket.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center space-x-2">
                <a
href={`http://localhost:3000/uploads/${attachment}`}                  download
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View/Download Attachment {index + 1}
                </a>
              </div>
            ))}
          </div>
        </div>)}
      </div>
      
    </div>
  )}
</Modal>

    </div>
  )
}

export default AllTickets