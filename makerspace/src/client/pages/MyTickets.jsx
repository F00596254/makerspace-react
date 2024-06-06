import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import data from './../assets/data.json'; 
import Modal from 'react-modal';

const MyTickets = () => {
    const token = sessionStorage.getItem('token');
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        priority: '',
        department: '',
        ticketType: '',
        identity: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTicket, setCurrentTicket] = useState(null);

    const itemsPerPage = 5;
    const openModal = (ticket) => {
        setCurrentTicket(ticket);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const queryParams = new URLSearchParams({
                    searchTerm,
                    ...filters,
                }).toString();

                const response = await fetch(`http://localhost:3000/ticket/getMyTickets?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setTickets(data.reverse());
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [searchTerm, filters, token]);

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

    const filteredTickets = tickets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(tickets.length / itemsPerPage);

    return (
        <div className="p-4">
            <div className="flex mb-4">
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
                    className="px-4 py-2 border rounded"
                >
                    <option value="">All Identities</option>
                    {data.identity.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className="relative overflow-x-auto">
                {loading ? (
                    <ClipLoader color={'#000000'} loading={loading} size={150} />
                ) : (
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
                            {filteredTickets.map(ticket => (
                                <tr key={ticket._id} className="bg-white border-b">
                                    <td className="w-1/6 py-4">{ticket.name}</td>
                                    <td className="w-1/6 py-4">{ticket.ticketType}</td>
                                    <td className="w-1/6 py-4" style={{ color: ticket.priority === "Low" ? "#28a745" : ticket.priority === "Medium" ? "#ffc107" : "#dc3545" }}>{ticket.priority}</td>
                                    <td className="w-1/6 py-4">{ticket.ticketID}</td>
                                    <td className="w-1/6 py-4">{ticket.subject}</td>
                                    <td className="w-1/6 py-4">                                        <button onClick={() => openModal(ticket)} className="text-blue-500">View</button>
</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded"
                >
                    Next
                </button>
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
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MyTickets;
