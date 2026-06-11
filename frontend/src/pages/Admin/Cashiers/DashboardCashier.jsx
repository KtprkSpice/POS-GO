import { useEffect, useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Link, useLocation, useNavigate } from 'react-router';
import { AlertConfirm, AlertError, AlertSuccess } from '../../../components/Alert';

import { CaretBigUp, CaretBigDown, ArrowDownNarrowWide, ArrowUpNarrowWide } from "@boxicons/react"

function DashboardCashier() {

    const [cashiers, setCashiers] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.successMessage) {
            AlertSuccess(location.state.successMessage);

            navigate(location.pathname, { replace: true })
        }
    }, [location, navigate])

    // Get Cashier
    useEffect(() => {
        fetch('http://localhost:8080/cashiers')
            .then(res => res.json())
            .then(data => setCashiers(data))
    }, [])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'no',
                header: 'No',
                cell: ({ row }) => row.index + 1,
            },
            {
                accessorKey: 'name',
                header: 'Cashier Name',
            },
            {
                accessorKey: 'email',
                header: 'Cashier Email',
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
            },
            {
                accessorKey: 'home_address',
                header: 'Home Address',
            },
            {
                id: 'actions',
                header: 'Aksi',
                cell: ({ row }) => (
                    <div className="flex gap-2 *:cursor-pointer">
                        <button
                            onClick={() => navigate(`/admin/cashier/edit/${row.original.id}`)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            // onClick={() => deleteEmployee(row.original.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        [navigate]
    );

    const table = useReactTable({
        data: cashiers,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });
    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Cashier</h1>

                <div className="mb-4 flex justify-between">
                    <Link
                        to="/admin/cashier/create"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Create Cashier
                    </Link>

                    <input
                        type="text"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search..."
                        className="px-3 py-2 border rounded"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead className="bg-gray-100">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="px-4 py-2 text-left border">
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="cursor-pointer select-none flex"
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.getIsSorted() === "asc" && <ArrowDownNarrowWide />}
                                                    {header.column.getIsSorted() === "desc" && <ArrowUpNarrowWide />}
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-50 capitalize">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-4 py-2 border">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex gap-2 mt-4 justify-center">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-3 py-1">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

        </>
    );
}

export default DashboardCashier;
