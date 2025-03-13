import prisma from "@/utils/prisma"
import { createResponse } from "@/utils/response";


export const GET = async () => {
    try {
        const countPublished = await prisma.article.count({
            where: { status: "published" }
        });

        // Hitung jumlah artikel dengan status "draft"
        const countDraft = await prisma.article.count({
            where: { status: "draft" }
        });

        // Hitung jumlah kategori
        const countCategory = await prisma.category.count();

        const data = {
            countPublished,
            countDraft,
            countCategory
        };
        
        return createResponse(200, 'success', data);
    } catch (error) {
        return createResponse(500, 'Internal Server Error');

    }
}