<script lang='ts'>
    import { formatTimeField } from "$lib/modules";
    let { nutritionItem } = $props();
</script>

<div class="w-5/6 bg-stone-400 rounded-2xl flex gap-6 px-8 py-5 mx-auto text-lg relative">
    <div class="text-black w-1/12 text-center">
        {formatTimeField(nutritionItem.time) }
    </div>
    <div class=" w-5/12 capitalize">
        {nutritionItem.amount ? `${nutritionItem.title}: ${nutritionItem.amount}` : nutritionItem.title}
    </div>
    <div class=" w-3/12 capitalize">
        {nutritionItem.calories} calories
    </div>
    <div class=" w-3/12 capitalize">
        {nutritionItem.protein} grams protein
    </div>
    <form method="POST" action="?/deleteNutritionItem" class="absolute -top-1 right-2">
        <input type="text" name='id' value={nutritionItem.id} class="invisible">
        <button class="text-sm text-neutral-200 hover:text-white">x</button>
    </form>
</div>