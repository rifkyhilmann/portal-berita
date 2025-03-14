export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface DashboardStatsProps {
    published: number;
    draft: number;
    category: number;
}

export interface CategoryProps {
    id: string;
    name : string;
}


export interface ArticlesProps {
    id: string;
    title: string;
    slug: string;
    content: string;
    category_id: string;
    image_url: string;
    published_at: string;
    status: "published" | "draft";
    created_at: string;
    updated_at: string;
    category?: CategoryProps; // Opsional, jika ada relasi
}
