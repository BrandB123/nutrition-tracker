<script lang='ts'>
    import type { PageProps } from "./$types";
    import NutritionLineItem from "$lib/components/NutritionLineItem.svelte";

    let { data }: PageProps = $props();

    let showForm = $state(false);

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

    // TODO: find a way to allow the client to select a time that will then be used in a date object to be submitted to the db
    let defaultDate = new Date().toLocaleTimeString().replace(' ', ':').split(':').splice(2, 1).join(':')
    console.log(defaultDate);

</script>

    <div class="bg-gray-700 text-white p-1 text-right flex gap-8">
        <div class="ml-6">
            Totals Calories: {totalCalories}   
        </div>
        <div>
            Total Protein: {totalProtein} grams
        </div>
            
    </div>

    <!-- <div class="w-full flex">
        <button 
            class="rounded-2xl px-2 ml-auto mr-3 text-3xl text-neutral-500 hover:text-black"
            onclick={ () => {
                console.log('clicked')
                nutritionItems.push({            
                    title: "milk",
                    amount: "36 oz",
                    time: "8:05am",
                    calories: 675,
                    protein: 36
                }) 
            }
            }
        >+</button>
    </div> -->

    <div class="w-full flex">
        <button 
            class="rounded-2xl px-2 ml-auto mr-3 text-3xl text-neutral-500 hover:text-black"
            onclick = { () => showForm = true }
        >+</button>
    </div>

    {#if showForm }
    <form action="" class="p-6 w-1/2 mx-auto mb-10 rounded-xl bg-neutral-500 grid grid-cols-3 grid-rows-2 gap-4 relative">
        <div class="flex flex-col col-span-2">
            <label for="title">Title</label>
            <input type="text" name="title" placeholder="Chicken Breast" class="border border-black rounded-md bg-neutral-300 pl-2 py-1">
        </div>

        <div class="flex flex-col">
            <label for="time">Time</label>
            <input type="text" name="time" value={new Date().toLocaleTimeString()} class="border border-black rounded-md bg-neutral-300 pl-2 py-1">
        </div>

        <div class="flex flex-col">
            <label for="amount">Amount</label>
            <input type="text" name="amount" placeholder="8oz, 2 servings, etc." class="border border-black rounded-md bg-neutral-300 pl-2 py-1">
        </div>

        <div class="flex flex-col">
            <label for="calories">Calories</label>
            <input type="number" name="calories" placeholder="250" class="border border-black rounded-md bg-neutral-300 pl-2 py-1">
        </div>

        <div class="flex flex-col">
            <label for="protein">Protein (in grams)</label>
            <input type="number" name="protein" placeholder="30" class="border border-black rounded-md bg-neutral-300 pl-2 py-1">
        </div>
        <button type="submit" class="col-start-2 col-end-3 hover:font-semibold">Submit</button>
        <button 
            type="button" 
            class="absolute top-1 right-3 font-light hover:font-semibold"
            onclick={ () => showForm = false }
        >x</button>
    </form>
{/if}
    

{#if (!nutritionItems || nutritionItems.length === 0)}
    <div class="w-1/2 py-6 mx-auto text-center font-semibold">Add An Item To See It Here</div>
{:else}
    <div class="flex flex-col gap-4">
        {#each nutritionItems as item}
        <NutritionLineItem nutritionItem={item}/>
        {/each}
    </div>
{/if}

