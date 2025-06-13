import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/db";
import bcrypt from "bcryptjs";

export const actions = {
    addUser : async ({ request }) => {
        const data = await request.formData();
        const firstName = data.get('firstName')?.toString().trim();
        const lastName = data.get('lastName')?.toString().trim();
        const email = data.get('email')?.toString().trim();
        const password = data.get('password')?.toString();

        if (!firstName){
            return fail(422, {firstName, lastName, email, message: "First Name is Required"})
        }
        if (!lastName){
            return fail(422, {firstName, lastName, email, message: "Last Name is Required"})
        }

        if (!email){
            return fail(422, {firstName, lastName, email, message: "Email is Required"})
        }
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            return fail(422, {firstName, lastName, email, message: "Email submitted is not a valid email"})
        }

        if (!password || password?.length < 8){
            return fail(422, {firstName, lastName, email, message: "Password of at least 8 characters is required"})
        }

        try {
            const res = await db
            .selectFrom('users')
            .select('email')
            .where('email', '=', email)
            .executeTakeFirst()

            if (res !== undefined){
                return fail(422, {firstName, lastName, email, message: "A user with this email already exists"})
            }
        } catch(error){
            console.error(error)
            return fail(500, {firstName, lastName, email, message: "An Unexpected Error Occurred. Please try again later."})
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        try {
            const res = await db
                .insertInto('users')
                .values({
                    email,
                    first_name: firstName,
                    last_name: lastName,
                    password_hash: passwordHash
                })
                .executeTakeFirst()

        } catch(error){
            console.error(error)
            return fail(500, {firstName, lastName, email, message: "An Unexpected Error Occurred. Please try again later."})
        }
        redirect(303, "/login")
    }
} satisfies Actions
