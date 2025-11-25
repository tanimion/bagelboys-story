"use client";

import { useEffect } from "react";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: Readonly<ErrorPageProps>) {
	useEffect(() => {
		console.error("Route Error:", error);
	}, [error]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
			<h1 className="mb-4 text-4xl font-bold text-red-600">
				Something went wrong!
			</h1>
			<p className="mb-2 text-lg text-gray-700">{error.message}</p>
			{error.digest && (
				<p className="mb-4 text-sm text-gray-500">Error code: {error.digest}</p>
			)}
			<button
				type="button"
				onClick={() => reset()}
				className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			>
				Try Again
			</button>
		</div>
	);
}
