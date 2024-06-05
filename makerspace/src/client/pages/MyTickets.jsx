import {useEffect,useState} from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

const MyTickets = () => {
    const token = sessionStorage.getItem('token')
    const [tickets, setTickets] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('http://localhost:3000/ticket/getMyTickets',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                    }
                }
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTickets(data.reverse());
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
        console.log(tickets)
    }, [])
  return (
    <div>
        <h3>MyTickets</h3>
        <div className="px-16"> {/* Adding padding to the container */}
    <div className="relative overflow-x-auto">
        <table className="w-full table-fixed text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-200">
                <tr>
                    <th className="w-1/6 py-3">Ticket Name</th>
                    <th className="w-1/6 py-3">Ticket Type</th>
                    <th className="w-1/6 py-3">Priority</th>
                    <th className="w-1/6 py-3">Ticket ID</th>
                    <th className="w-1/6 py-3">Subject</th>
                    <th className="w-1/6 py-3">Details</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="6" className="py-4">
                            <ClipLoader color={'#000000'} loading={loading} size={150} />
                        </td>
                    </tr>
                ) : (
                    tickets.map(ticket => (
                        <tr key={ticket._id} className="bg-white border-b">
                            <td className="w-1/6 py-4">{ticket.name}</td>
                            <td className="w-1/6 py-4">{ticket.ticketType}</td>
                            <td className="w-1/6 py-4" style={{ color: ticket.priority === "Low" ? "#28a745" : ticket.priority === "Medium" ? "#ffc107" : "#dc3545" }}>{ticket.priority}</td>
                            <td className="w-1/6 py-4">{ticket.ticketID}</td>
                            <td className="w-1/6 py-4">{ticket.subject}</td>
                            <td className="w-1/6 py-4">View</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
</div>

 
    </div>
  )
}

export default MyTickets