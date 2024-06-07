import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ClipLoader from 'react-spinners/ClipLoader';
import { submitComment } from '../buttonActions/submitAdminComment';
import data from './../assets/data.json'; // Adjust the import path as necessary

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState({});
    const [oldComments, setOldComments] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        priority: '',
        department: '',
        ticketType: '',
        identity: ''
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
                setTickets(data.reverse());
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:3000/ticket/getAllComments');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const commentsByTicketId = data.reduce((acc, comment) => {
                    acc[comment.ticketId] = comment.comment;
                    return acc;
                }, {});
                setOldComments(commentsByTicketId);
            } catch (error) {
                console.error('There was an error retrieving the comments:', error);
            }
        };

        fetchTickets();
        fetchComments();
    }, [searchTerm, filters]);

    const openModal = (ticket) => {
        setCurrentTicket(ticket);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const updateComment = (id) => (e) => {
        setComment({ ...comment, [id]: e.target.value });
    };

    const newComment = async (currentTicket) => {
        try {
            await submitComment(currentTicket._id, comment[currentTicket._id]);
            setOldComments({ ...oldComments, [currentTicket._id]: comment[currentTicket._id] });
        } catch (error) {
            console.error('There was an error submitting the comment:', error);
        }
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

    const filteredTickets = tickets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                    className="px-4 py-2 border rounded"
                >
                    <option value="">All Identities</option>
                    {data.identity.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
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
                                    <td className="px-6 py-4 border-b border-gray-300">
                                        <button onClick={() => openModal(ticket)} className="text-blue-500">View</button>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-300">
                                        <input
                                            type="text"
                                            placeholder="Comment"
                                            onChange={(e) => updateComment(ticket._id)(e)}
                                            value={comment[ticket._id] || oldComments[ticket._id] || ''}
                                        />
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-300">
                                        <button className="text-green-500" onClick={() => newComment(ticket)}>Submit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
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
