import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ cookies }) => {
    cookies.set('token', '', {path: '/'});
    throw redirect(303, '/login')
}