import prisma from "@/utils/prisma";
import { createResponse } from "@/utils/response";
import { deleteFile, uploadFile } from "@/utils/uploadFile";

enum Status {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();

        // Ambil nilai dari formData
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const category_id = formData.get("category_id") as string;
        const content = formData.get("content") as string;
        const imageFile = formData.get("image_url") as File;
        const publishedAtRaw = formData.get("published_at");
        const statusValue = formData.get("status");

        // Validasi semua field wajib ada
        if (!title || !slug || !content || !imageFile || !publishedAtRaw || !statusValue) {
            return createResponse(400, "All fields are required");
        }

        // Konversi published_at menjadi Date
        if (typeof publishedAtRaw !== "string") {
            return createResponse(400, "Invalid published_at value");
        }
        const published_at = new Date(publishedAtRaw);

        if (isNaN(published_at.getTime())) {
            return createResponse(400, "Invalid date format for published_at");
        }

        // Validasi dan casting status ke enum
        if (typeof statusValue !== "string") {
            return createResponse(400, "Invalid status value");
        }
        if (!Object.values(Status).includes(statusValue as Status)) {
            return createResponse(400, "Invalid status provided");
        }
        const status = statusValue as Status;

        // Upload file dan validasi hasilnya
        const image = await uploadFile(imageFile);
        
        if (!image) {
            return createResponse(400, "Failed to upload image");
        }

        // Buat article di database
        const article = await prisma.article.create({
            data: {
                title,
                slug,
                content,
                category_id,
                image_url: image,
                published_at,
                status : status
            },
        });

        return createResponse(201, "Article created successfully", article);
    } catch (error) {
        console.error("Error creating article:", error);
        return createResponse(500, "Internal Server Error");
    }
};


export const GET = async (request : Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const category = searchParams.get("category");

        let articles;

        if (id) {
            articles = await prisma.article.findUnique({
                where : {
                    id : id
                }
            })
        } else if (category) {
            articles = await prisma.article.findMany({
                where: { category_id: category },
                include: { category: true },
            });
        } else {
            articles = await prisma.article.findMany();
        }

        if (!articles) {
            return createResponse(401, "Article not found");
        }

        return createResponse(200, 'succcess', articles);
    } catch (error) {
        console.error("Error creating article:", error);
        return createResponse(500, "Internal Server Error");
    }
}

export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
    
        if (!id) {
            return createResponse(400, "ID is required");
        }
  
        const article = await prisma.article.findUnique({
            where: { id },
        });

        if (article?.image_url) {
            await deleteFile(article?.image_url);
        }

        if (!article) {
            return createResponse(404, "Article not found");
        }
  
        await prisma.article.delete({
            where: { id },
        });
  
        return createResponse(200, "Article deleted successfully");
    } catch (error) {
        console.error("Error deleting article:", error);
        return createResponse(500, "Internal Server Error");
    }
};
  

export const PUT = async (request: Request) => {
    try {
        const formData = await request.formData();
        const id = formData.get("id") as string;
        
        if (!id) {
            return createResponse(400, "ID is required");
        }

        const existingArticle = await prisma.article.findUnique({
            where: { id }
        });

        if (!existingArticle) {
            return createResponse(404, "Article not found");
        }

        // Ambil nilai dari formData jika ada
        const title = formData.get("title") as string | null;
        const slug = formData.get("slug") as string | null;
        const category_id = formData.get("category_id") as string | null;
        const content = formData.get("content") as string | null;
        const imageFile = formData.get("image_url") as File | null;
        const publishedAtRaw = formData.get("published_at");
        const statusValue = formData.get("status");

        let published_at: Date | undefined;
        if (publishedAtRaw && typeof publishedAtRaw === "string") {
            published_at = new Date(publishedAtRaw);
            if (isNaN(published_at.getTime())) {
                return createResponse(400, "Invalid date format for published_at");
            }
        }

        let status: Status | undefined;
        if (statusValue && typeof statusValue === "string") {
            if (!Object.values(Status).includes(statusValue as Status)) {
                return createResponse(400, "Invalid status provided");
            }
            status = statusValue as Status;
        }

        let image_url: string | undefined;
        if (imageFile) {
            image_url = await uploadFile(imageFile);
            if (!image_url) {
                return createResponse(400, "Failed to upload image");
            }
        }

        const updatedArticle = await prisma.article.update({
            where: { id },
            data: {
                title: title || undefined,
                slug: slug || undefined,
                category_id: category_id || undefined,
                content: content || undefined,
                image_url: image_url || undefined,
                published_at,
                status,
            },
        });

        return createResponse(200, "Article updated successfully", updatedArticle);
    } catch (error) {
        console.error("Error updating article:", error);
        return createResponse(500, "Internal Server Error");
    }
};
