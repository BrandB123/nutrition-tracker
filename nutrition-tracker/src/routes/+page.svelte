<script lang='ts'>
    import type { PageProps } from "./$types";
    // import type { NutritionItem } from "$lib/types";
  import NutritionLineItem from "$lib/components/NutritionLineItem.svelte";

    let { data }: PageProps = $props();

    // let nutritionItems = $state([]);
    let nutritionItems = $state(data.items || []);

    // if (!!data.items){
    //     nutritionItems.push(data.items);
    // }

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
    </div>

{#if (!nutritionItems || nutritionItems.length === 0)}
    <div class="w-1/2 py-6 mx-auto text-center font-semibold">Add An Item To See It Here</div>
{:else}
    <div class="flex flex-col gap-4">
        {#each nutritionItems as item}
        <NutritionLineItem nutritionItem={item}/>
        {/each}
    </div>
{/if}

