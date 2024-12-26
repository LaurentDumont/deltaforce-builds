import React, { useState } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { GlobalFilter } from "./GlobalFilter"; // adjust path as needed

import { ColumnDef } from "@tanstack/react-table";

interface BuildsTableProps {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    data: any[];
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    columns: ColumnDef<any, any>[];
}

export function BuildsTable({ data, columns }: BuildsTableProps) {
    const [globalFilter, setGlobalFilter] = useState("");
    const table = useReactTable({
        data,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <>
            <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <table className="border border-gray-300 w-full text-left">
                <thead className="bg-gray-700 text-white border-b border-gray-300">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="p-2 border-r last:border-r-0 border-gray-300">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <tr key={row.id} className={rowIndex % 2 === 0 ? "bg-gray-800 text-white" : "bg-gray-700 text-white"}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-2 border-b border-r last:border-r-0 border-gray-300">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}