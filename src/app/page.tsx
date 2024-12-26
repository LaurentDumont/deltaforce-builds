"use client";
import React, { useEffect, useState } from "react";
import { BuildsTable } from "../components/supertable";

interface Build {
    name: string;
    link: string;
    picture: string;
    comments: string;
}

export default function Home() {
    const [builds, setBuilds] = useState<Build[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBuilds() {
            try {
                const response = await fetch(
                    "https://youtube-music-finder.s3.ca-central-1.amazonaws.com/test-weapons-data.json"
                );
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                setBuilds(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchBuilds();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                header: "Build Name",
                accessorKey: "name",
            },
            {
                header: "Link",
                accessorKey: "link",
                cell: ({ getValue }: { getValue: () => string }) => (
                    <div className="flex items-center">
                        <span>{getValue()}</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(getValue())}
                            className="ml-2 p-1 bg-blue-500 text-white rounded"
                        >
                            Copy
                        </button>
                    </div>
                ),
            },
            {
                header: "Picture",
                accessorKey: "picture",
                cell: ({ getValue }) => (
                    <img src={getValue()} alt="Build" width={100} height={100} />
                ),
            },
            {
                header: "Comments",
                accessorKey: "comments",
            },
        ],
        []
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return <BuildsTable data={builds} columns={columns} />;
}