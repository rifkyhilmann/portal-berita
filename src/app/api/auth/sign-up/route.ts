import prisma from "@/utils/prisma";
import { createResponse } from "@/utils/response";
import bcrypt from "bcryptjs";

export const POST = async (request : Request) => {
    try {
        const body = await request.json();
        const { nama, email, password } = body;

        if (!body || !nama || !email || !password) {
            return createResponse(400, "All fields are required");
        }

        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })

        if (user) {
            return createResponse(401, "user already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data : {
                nama : nama,
                email : email,
                password : hashedPassword
            }
        })

        return createResponse(200, "success");
    } catch {
        return createResponse(500, "Internal Server Error");
    }
}