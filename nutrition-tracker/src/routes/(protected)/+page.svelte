<script lang='ts'>
    import { formatTimeField } from "$lib/modules";
    import NutritionLineItem from "$lib/components/NutritionLineItem.svelte";
    import type { PageProps } from "./$types";

    let { data, form }: PageProps = $props();

    let showForm = $state(data.showForm);
    let commonItemsForm = $state(false);

    let nutritionItems = $state(data.items || []);

    let totalCalories = $derived.by(() => {
        const caloriesArray = nutritionItems.map(item => item.calories)
        const totalCals = caloriesArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
        )
        return totalCals;
    });

    let totalProtein = $derived.by(() => {
        const proteinArray = nutritionItems.map(item => item.protein)
        const totalProtein = proteinArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
        )
        return totalProtein;
    });

</script>

    <div class="bg-gray-700 text-white p-1 text-right flex gap-8">
        <div class="ml-6">
            Totals Calories: {totalCalories}   
        </div>
        <div>
            Total Protein: {totalProtein} grams
        </div>
    </div>

    <div class="w-full flex">
        <button 
            class="rounded-2xl px-2 ml-auto mr-3 text-3xl text-neutral-500 hover:text-white"
            onclick = { () => showForm = true }
        >+</button>
    </div>

    {#if showForm }
    <form 
        method="POST" 
        action="?/addNutritionItem" 
        class="p-6 w-1/2 mx-auto mb-10 rounded-xl bg-neutral-500 grid grid-cols-3 grid-rows-2 gap-4 relative"
    >
        <div class="flex flex-col col-span-2">
            {@render formField("title", "text", "Chicken Breast", form?.submittedData?.title || "", "Title", form?.message)}
        </div>

        <div class="flex flex-col">
            {@render formField("time", "text", "", form?.submittedData?.time ||  formatTimeField(new Date()), "Time", form?.message)}
        </div>

        <div class="flex flex-col">
            {@render formField("Amount", "text", "8oz, 2 servings, etc.", form?.submittedData?.amount || "")}
        </div>

            <div class="flex flex-col">
                {@render formField("calories", "number", "250", form?.submittedData?.calories || "", "Calories", form?.message)}
            </div>

        <div class="flex flex-col">
            {@render formField("protein", "number", "30", form?.submittedData?.protein || "", "Protein", form?.message)}
        </div>

        <div class="col-start-1 col-end-4 text-right pr-8">
            <label for="common-item">Make this a Common Item?</label>
            <input type="checkbox" name="common-item" bind:checked={commonItemsForm}/>
        </div>

        {#if commonItemsForm}
            <div class="flex flex-col">
                {@render formField("unit", "text", "servings, oz, etc.", form?.submittedData?.unit || "",)}
            </div>
            <div class="flex flex-col">
                {@render formField("calories-per-unit", "number", "250", form?.submittedData?.caloriesPerUnit || "", undefined, undefined, "Calories Per Unit")}
            </div>
            <div class="flex flex-col">
                {@render formField("protein-per-unit", "text", "servings, oz, etc.", form?.submittedData?.proteinPerUnit || "", undefined, undefined, "Protein Per Unit")}
            </div>
        {/if}

        {#if form?.message && form?.message.includes("Common")}
            <p class="col-start-1 col-end-3 text-center text-red-600 rounded-lg">{form?.message}</p>
        {/if}

        {#if form?.message && form?.message.includes("Unexpected")}
            <p class="col-start-1 col-end-3 text-center text-red-600 rounded-lg">{form?.message}</p>
        {/if}

        <button type="submit" class="col-start-2 col-end-3 hover:font-semibold">Submit</button>

        <button 
            type="button" 
            class="absolute top-1 right-3 font-light hover:font-semibold"
            onclick={ () => showForm = false }
        >x</button>
    </form>
{/if}
    
{#if form?.message?.includes('Invalid Submission') || form?.message?.includes('Error Deleting Item') }
<div 
    class="w-full rounded-xl  bg-red-600/40 font-sm text-white text-center p-5 my-10 mx-4">{form?.message}</div>
{/if}

{#if (!nutritionItems || nutritionItems.length === 0)}
    <div class="w-1/2 py-6 mx-auto text-center font-semibold">Add An Item To See It Here</div>
{:else if form?.message && form?.message.includes("while loading")}
    <p class="col-start-1 col-end-3 text-center text-red-600 rounded-lg">{form?.message}</p>
{:else}
    <div class="flex flex-col gap-4">
        {#each nutritionItems as item}
        <NutritionLineItem nutritionItem={item}/>
        {/each}
    </div>
{/if}

{#snippet formField(
    name: string, 
    type: string, 
    placeholder: string, 
    value: FormDataEntryValue | number, 
    errorStringPrompt?: string, 
    errorMessage?: string,
    label?: string
    )}
<label for={name} class="capitalize">{label || name}</label>
<input 
    {type} 
    {name}
    {placeholder}
    {value}
    class="border border-black rounded-md bg-neutral-300 pl-2 py-1"
/>
{#if errorMessage && errorStringPrompt && errorMessage.includes(errorStringPrompt)}
    <legend class="font-sm text-red-700 px-3">{errorMessage}</legend>
{/if}
{/snippet}

