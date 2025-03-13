import prisma from "@/utils/prisma";
import { createResponse } from "@/utils/response";


export const POST = async (request : Request) => {
    try {
        const body = await request.json();
        const { name } = body;

        const category = await prisma.category.findUnique({
            where : {
                name : name,
            }
        })

        if (category) {
            return createResponse(401, "Category already exists");
        }
        
        await prisma.category.create({
            data : {
                name : name,
            }
        })

        return createResponse(200, "success");
    } catch (error) {
        return createResponse(500, "Internal Server Error");
    }
}

export const GET = async (request : Request) => {
    try {
        const url = new URL(request.url);
        const { id, name } = Object.fromEntries(url.searchParams);

        let category;

        if (id) {
            category = await prisma.category.findUnique({
                where : {
                    id : id,
                }
            })
        } else if (name) {
            category = await prisma.category.findMany({
                where : {
                    name : name
                }
            })
        } else {
            category = await prisma.category.findMany();
        }

        if (!category) {
            return createResponse(404, "Not Found");
        }

        return createResponse(200, "success", category);
    } catch (error) {
        return createResponse(500, "Internal Server Error");
    }
}

export const DELETE = async (request : Request) => {
    try {
        const url = new URL(request.url);
        const { id } = Object.fromEntries(url.searchParams);

        const category = await prisma.category.findUnique({
            where : {
                id : id
            }
        })

        if (!category) {
            return createResponse(401, "Category not found");
        }
        
        await prisma.article.deleteMany({
            where : {
                category_id : id
            }
        });
        
        await prisma.category.delete({
            where : {
                id : id
            }
        })


        return createResponse(200, 'succees');
    } catch (error) {
        console.log(error);
        return createResponse(500, "Internal Server Error");
    }
}

export const PUT = async (request : Request) => {
    try {
        const url = new URL(request.url);
        const { id } = Object.fromEntries(url.searchParams);
        const body = await request.json();
        const { name } = body;

        const category = await prisma.category.findUnique({
            where : {
                id : id
            }
        })

        if (!category) {
            return createResponse(401, "Category not found");
        }

        await prisma.category.update({
            where : {
                id : id
            },
            data : {
                name : name
            }
        })

        return createResponse(200, 'success');
    } catch (error) {
        return createResponse(500, "Internal Server Error");
    }
}