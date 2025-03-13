export interface DashboardStatsProps {
    published: number;
    draft: number;
    category: number;
}

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}
