import React from "react";

interface GlobalFilterProps {
    globalFilter: string;
    setGlobalFilter: (filterValue: string) => void;
}

export const GlobalFilter: React.FC<GlobalFilterProps> = ({
    globalFilter,
    setGlobalFilter,
}) => {
    return (
        <div className="mb-4">
            <input
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded w-full"
            />
        </div>
    );
};