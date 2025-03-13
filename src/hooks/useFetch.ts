import { useState, useEffect, useCallback } from "react";

const useFetch = <T,>(
    initialUrl: string, 
    method: "GET" | "POST" | "PUT" | "DELETE", 
    body?: any, 
    token?: string, 
    manual = false 
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (url = initialUrl): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const headers: HeadersInit = { "Content-Type": "application/json" };
            if (token) headers["Authorization"] = `Bearer ${token}`;

            const options: RequestInit = {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
            };

            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result: T = await response.json();
            setData(result);
            return result; // ✅ Kembalikan data langsung
        } catch (err) {
            setError((err as Error).message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [initialUrl, method, body, token]);

    useEffect(() => {
        if (!manual && method === "GET") {
            fetchData();
        }
    }, [fetchData, manual, method]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;

