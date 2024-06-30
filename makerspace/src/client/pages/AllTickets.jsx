import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ClipLoader from 'react-spinners/ClipLoader';
import { submitComment } from '../buttonActions/submitAdminComment';
import data from './../assets/data.json'; // Adjust the import path as necessary

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chatModalIsOpen, setChatModalIsOpen] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [fetchComment, setFetchComment] = useState([{}]);
    const [filters, setFilters] = useState({
        priority: '',
        department: '',
        ticketType: '',
        identity: '',
        status: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const queryParams = new URLSearchParams({
                    searchTerm,
                    ...filters,
                }).toString();

                const response = await fetch(`http://localhost:3000/ticket/getAllTickets?${queryParams}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTickets(data.sort((a, b) => (a.status === 'Closed' ? 1 : -1)));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

      

        fetchTickets();
    }, [searchTerm, filters]);

    const getComment = async (ticket) => {
        setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/ticket/getAllComments?ticketId=${ticket._id}`,{
                    method: 'GET',
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFetchComment(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
    const openModal = (ticket) => {
        setCurrentTicket(ticket);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const chatOpenModal = (ticket) => {
        setCurrentTicket(ticket);
        getComment(ticket);
        setChatModalIsOpen(true);
    };
    const chatCloseModal = () => {
        setChatModalIsOpen(false);
    };



    



    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        setCurrentPage(1); // Reset to first page on filter
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleStatusChange = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:3000/ticket/updateStatus/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedTicket = await response.json();
            setTickets(tickets.map(ticket => ticket._id === id ? updatedTicket : ticket).sort((a, b) => (a.status === 'Closed' ? 1 : -1)));
        } catch (error) {
            console.error('There was an error updating the ticket status:', error);
        }
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setCurrentTicket({
            ...currentTicket,
            [name]: value,
        });
    };

    const saveTicketDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/ticket/updateTicket/${currentTicket._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentTicket),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedTicket = await response.json();
            setTickets(tickets.map(ticket => ticket._id === currentTicket._id ? updatedTicket : ticket));
            closeModal();
        } catch (error) {
            console.error('There was an error updating the ticket details:', error);
        }
    };

    const filteredTickets = tickets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const sendMessage = () => {
        // Send the message to the server
        const data = {
            ticketID: currentTicket._id,
            message: newMessage,
            from: 'admin',

        }
        submitComment(data);
    }
    const totalPages = Math.ceil(tickets.length / itemsPerPage);

    return (
        <div className="p-4">
            <div className="flex flex-wrap mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="px-4 py-2 border rounded mr-4"
                />
                <select
                    name="priority"
                    value={filters.priority}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border rounded mr-4"
                >
                    <option value="">All Priorities</option>
                    {data.priority.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <select
                    name="department"
                    value={filters.department}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border rounded mr-4"
                >
                    <option value="">All Departments</option>
                    {data.department.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <select
                    name="ticketType"
                    value={filters.ticketType}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border rounded mr-4"
                >
                    <option value="">All Ticket Types</option>
                    {data.ticketType.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <select
                    name="identity"
                    value={filters.identity}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border rounded mr-4"
                >
                    <option value="">All Identities</option>
                    {data.identity.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border rounded"
                >
                    <option value="">All Statuses</option>
                    {data.status.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center bg-white text-black">
                {loading ? (
                    <ClipLoader color="#080f9c" loading={loading} size={50} />
                ) : (
                    <div className="w-full overflow-x-auto"> {/* Add this container */}
                        <table className="table-auto border-collapse border-2 border-gray-300 text-left w-full"> {/* Add w-full to the table */}
                            <thead>
                                <tr>
                                    <th className="px-6 py-4 border-b-2 border-gray-300">Ticket Type</th>
                                    <th className="px-6 py-4 border-b-2 border-gray-300">Priority</th>
                                    <th className="px-6 py-4 border-b-2 border-gray-300">Department</th>
                                    <th className="px-6 py-4 border-b-2 border-gray-300">Name</th>
                                    <th className="px-6 py-4 border-b-2 border-gray-300">Role</th>
                                    <th className="px-6 py-4 border-b-2 border-gray-300">Code</th>
                                    <th className="px-6 py-4 border-b-2 border-gray-300">View</th>
                                    <th className="px-6 py-4 border-b-2 border-gray-300">Status</th>
                                    <th className="px-6 py-4 border-b-2 border-gray-300 col-span-2">Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTickets.map((ticket) => (
                                    <tr key={ticket._id}>
                                        <td className="px-6 py-4 border-b border-gray-300">{ticket.ticketType}</td>
                                        <td className="px-6 py-4 border-b border-gray-300">{ticket.priority}</td>
                                        <td className="px-6 py-4 border-b border-gray-300">{ticket.department}</td>
                                        <td className="px-6 py-4 border-b border-gray-300">{ticket.name}</td>
                                        <td className="px-6 py-4 border-b border-gray-300">{ticket.role}</td>
                                        <td className="px-6 py-4 border-b border-gray-300">{ticket.ticketID}</td>
                                        <td className="px-6 py-4 border-b border-gray-300">
                                            <button className="text-blue-500" onClick={() => openModal(ticket)}>View</button>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-300">
                                            <select
                                                value={ticket.status}
                                                onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                                                className={`border rounded px-2 py-1 ${
                                                    ticket.status === 'Open' ? 'text-green-500' :
                                                    ticket.status === 'In Progress' ? 'text-yellow-500' :
                                                    ticket.status === 'Ready' ? 'text-blue-500' :
                                                    ticket.status === 'Shipped' ? 'text-indigo-500' :
                                                    'text-gray-500'
                                                }`}
                                            >
                                                {data.status.map(status => (
                                                    <option key={status.value} value={status.value}>{status.label}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-300" colSpan={2}>
                                            <button className="text-blue-500" onClick={() => chatOpenModal(ticket)}>chat</button>

                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
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
                                <input
                                    type="text"
                                    name="email"
                                    value={currentTicket.email}
                                    onChange={handleFieldChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={currentTicket.name}
                                    onChange={handleFieldChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={currentTicket.phone}
                                    onChange={handleFieldChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={currentTicket.department}
                                    onChange={handleFieldChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <input
                                    type="text"
                                    name="priority"
                                    value={currentTicket.priority}
                                    onChange={handleFieldChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
                                <input
                                    type="text"
                                    name="ticketType"
                                    value={currentTicket.ticketType}
                                    onChange={handleFieldChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={currentTicket.role}
                                    onChange={handleFieldChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={currentTicket.subject}
                                onChange={handleFieldChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
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
                                                    href={`http://localhost:3000/uploads/${attachment}`}
                                                    download
                                                    className="text-blue-500 hover:underline"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View/Download Attachment {index + 1}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={saveTicketDetails}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
    isOpen={chatModalIsOpen}
    onRequestClose={chatCloseModal}
    contentLabel="Chat Modal"
    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
>
    <div className="bg-white rounded-lg p-6 w-3/4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Chat with Support</h2>
            <button onClick={chatCloseModal} className="text-red-500">Close</button>
        </div>
        
        {/* Chat Messages Display */}
        <div className="space-y-4">
           {loading ? <ClipLoader color="#080f9c" loading={loading} size={50} /> :   
           (fetchComment.map((comment,key) => (
            comment.from === 'admin' ? (<div className="flex justify-end" key={key}>
            <div className="bg-blue-500 text-white rounded-lg p-2 max-w-2/3">
                <p className="text-sm">{comment.comment}</p>
            </div>
        </div>):(<div className="flex justify-start" key={key}>
                <div className="bg-gray-200 rounded-lg p-2 max-w-2/3">
                    <p className="text-sm">{comment.comment}</p>
                </div>
            </div>)
           ))
            )}

          
        </div>

        {/* Input Box for Sending Message */}
        <div className="flex mt-4">
            <textarea
                className="border-gray-300 rounded-md shadow-sm p-2 flex-1 resize-none"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <label className="ml-2 flex items-center">
                <input
                    type="file"
                    // onChange={handleFileUpload}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                >
                    Send
                </button>
            </label>
        </div>
    </div>
</Modal>



            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <ul className="flex">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li
                            key={i}
                            className={`px-3 py-1 cursor-pointer ${
                                currentPage === i + 1 ? 'bg-gray-300' : 'hover:bg-gray-200'
                            }`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AllTickets;
