import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = ({ cookies }) => {
    if (!!cookies.get('token')){
        throw redirect(303, '/');
    }
}