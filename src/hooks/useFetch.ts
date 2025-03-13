import { useState, useEffect, useCallback } from "react";

const useFetch = <T,>(
    url: string, 
    method: "GET" | "POST" | "PUT" | "DELETE", 
    body?: any, 
    token?: string // Token sebagai parameter opsional
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };

            // Jika ada token, tambahkan ke headers
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const options: RequestInit = {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
            };

            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result: T = await response.json();
            setData(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url, method, body, token]);

    useEffect(() => {
        if (method === "GET") {
            fetchData();
        }
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
