<script lang="ts">
    import type { PageProps } from './$types';

    const { form }: PageProps = $props();
</script>

<div class="w-1/3 bg-neutral-300 rounded-2xl pt-10 px-10 pb-2 mx-auto mt-14">
    <h2 class="w-full mb-3 font-bold text-xl text-center">Sign Up Here</h2>
    <form method="POST" action="?/addUser" class="mx-auto py-3 grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-2">
            <label 
                for="firstName" 
                class="font-semibold text-lg"
            >
                First Name
            </label>
            <input 
                type="text" 
                name="firstName" 
                placeholder="John" 
                value={form?.firstName || ""}
                class="w-11/12 bg-neutral-200 rounded-lg p-1 pl-2 ml-1 capitalize"
            >
            {#if form?.message.includes("First")}
                <legend class="ml-3 text-red-700">{ form.message }</legend>
            {/if}
        </div>
    
        <div class="flex flex-col gap-2">
            <label 
                for="lastName" 
                class="font-semibold text-lg"
            >
                Last Name
            </label>
            <input 
                type="text" 
                name="lastName" 
                placeholder="Smith" 
                value={form?.lastName || ""}
                class="w-11/12 bg-neutral-200 rounded-lg p-1 pl-2 ml-1 capitalize"
            >
            {#if form?.message.includes("Last")}
                <legend class="ml-3 text-red-700">{ form.message }</legend>
            {/if}
        </div>
    
        <div class="flex flex-col gap-2">
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
                class="w-11/12 bg-neutral-200 rounded-lg p-1 pl-2 ml-1"
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
                class="w-11/12 bg-neutral-200 rounded-lg p-1 pl-2 ml-1"
            >
            {#if form?.message.includes("Password")}
                <legend class="ml-3 text-red-700">{ form.message }</legend>
            {/if}
        </div>
    
        <button type="submit" class="mt-2 col-start-1 col-end-3 text-xl text-neutral-300 hover:text-white">Submit</button>

        {#if form?.message.includes("Unexpected")}
            <p class="col-start-1 col-end-3 text-center text-red-600 rounded-lg">{form?.message}</p>
        {/if}
    </form>
</div>