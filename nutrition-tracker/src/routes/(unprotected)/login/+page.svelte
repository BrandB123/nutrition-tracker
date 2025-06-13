<script lang="ts">
    import type { PageProps } from './$types';

    const { form }: PageProps = $props();
</script>

<div class="w-1/3 bg-neutral-300 rounded-2xl pt-10 px-10 pb-2 mx-auto mt-14">
    <h2 class="w-full mb-3 font-bold text-xl text-center">Log In</h2>
    <form method="POST" action="?/addUser" class="mx-auto py-3 flex flex-col content-center gap-3">
        <div class="flex flex-col content-center gap-2">
            <label 
                for="email" 
                class="font-semibold text-lg"
            >
                Email
            </label>
            <input 
                type="text" 
                name="email" 
                placeholder="john@email.com" 
                value={form?.email || ""}
                class="bg-neutral-200 rounded-lg p-1 pl-2 ml-1"
            >
            {#if form?.message.includes("Email")}
                <legend class="ml-3 text-red-700">{ form.message }</legend>
            {/if}
        </div>
    
        <div class="flex flex-col gap-2">
            <label 
                for="password" 
                class="font-semibold text-lg"
            >
                Password
            </label>
            <input 
                type="password" 
                name="password" 
                class="bg-neutral-200 rounded-lg p-1 pl-2 ml-1"
            >
            {#if form?.message.includes("Password")}
                <legend class="ml-3 text-red-700">{ form.message }</legend>
            {/if}
        </div>
    
        <button type="submit" class="mt-2 col-start-1 col-end-3 text-xl text-neutral-300 hover:text-white">Submit</button>

        {#if form?.message.includes("Unexpected") || form?.message.includes("email or password")}
            <p class="col-start-1 col-end-3 text-center text-red-600 rounded-lg">{form?.message}</p>
        {/if}
    </form>
</div>