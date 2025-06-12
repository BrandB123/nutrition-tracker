<script lang='ts'>
    import { getTimeFromTimeStampTZ } from "$lib/modules";
    let { nutritionItem } = $props();
</script>

<div class="w-5/6 bg-stone-400 rounded-2xl flex gap-6 px-8 py-5 mx-auto text-lg">
    <div class="text-black/50 w-1/12 text-center">
        {getTimeFromTimeStampTZ(nutritionItem.time) }
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
</div>