
import type { Actions } from "./$types";
import bcrypt from "bcryptjs";
import { db } from "$lib/db";
import 'dotenv/config'

import { fail, redirect } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
import type { PrivateKey } from "jsonwebtoken";
import type { User } from "$lib/types";

export const actions = {
    addUser : async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString().trim();
        const password = data.get('password')?.toString();

        if (!process.env.PRIVATE_JWT_KEY){
            console.error('env var not found')
            return fail(500, {email, message: "An Unexpected Error Occurred. Please try again later."})
        }

        const privateKey: PrivateKey = process.env.PRIVATE_JWT_KEY;
        let user: User;

        if (!email){
            return fail(422, {email, message: "Email is Required"})
        }
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            return fail(422, {email, message: "Email submitted is not a valid email"})
        }

        if (!password){
            return fail(422, {email, message: "Password is required"})
        }

        try {
            user = await db
            .selectFrom('users')
            .selectAll()
            .where('email', '=', email)
            .executeTakeFirstOrThrow()
        } catch(error){
            console.error(error)
            if ((error as Error).toString().includes("no result")){
                return fail(400, {email, message: "email or password are incorrect."})
            }
            return fail(500, {email, message: "An Unexpected Error Occurred. Please try again later."})
        }

        let authorized = bcrypt.compareSync(password, user.password_hash)

        const token = jwt.sign(
            {
                user : {
                    id: user.id
                }
            },
            privateKey,
            { expiresIn: '1h'}
        )

        cookies.set('token', token, {path: '/'})
        redirect(303, '/')

    }
} satisfies Actions