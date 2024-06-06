import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import data from './../assets/data.json'; // Adjust the import path as necessary

const MyTickets = () => {
    const token = sessionStorage.getItem('token')
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
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
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedTickets = React.useMemo(() => {
        let sortableTickets = [...tickets];
        if (sortConfig.key) {
            sortableTickets.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableTickets;
    }, [tickets, sortConfig]);

    const filteredTickets = sortedTickets.filter(ticket => {
        return (
            Object.keys(ticket).some(key =>
                ticket[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
            ) &&
            (filters.priority ? ticket.priority === filters.priority : true) &&
            (filters.department ? ticket.department === filters.department : true) &&
            (filters.ticketType ? ticket.ticketType === filters.ticketType : true) &&
            (filters.identity ? ticket.identity === filters.identity : true)
        );
    });

    const currentPageTickets = filteredTickets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

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
                                <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort('name')}>Ticket Name</th>
                                <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort('ticketType')}>Ticket Type</th>
                                <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort('priority')}>Priority</th>
                                <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort('ticketID')}>Ticket ID</th>
                                <th className="w-1/6 py-3 cursor-pointer" onClick={() => handleSort('subject')}>Subject</th>
                                <th className="w-1/6 py-3">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageTickets.map(ticket => (
                                <tr key={ticket._id} className="bg-white border-b">
                                    <td className="w-1/6 py-4">{ticket.name}</td>
                                    <td className="w-1/6 py-4">{ticket.ticketType}</td>
                                    <td className="w-1/6 py-4" style={{ color: ticket.priority === "Low" ? "#28a745" : ticket.priority === "Medium" ? "#ffc107" : "#dc3545" }}>{ticket.priority}</td>
                                    <td className="w-1/6 py-4">{ticket.ticketID}</td>
                                    <td className="w-1/6 py-4">{ticket.subject}</td>
                                    <td className="w-1/6 py-4">View</td>
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
        </div>
    );
};

export default MyTickets;
