<script lang="ts">
	let { children } = $props();
</script>

<div class="bg-sky-700 p-6 font-tahoma flex">
    <h1 class="font-bold text-2xl">NUTRITION TRACKER</h1>
    <div class="ml-auto mr-6 flex gap-6 self-center">
        <a href="/signout" class="hover:font-semibold">Sign Out</a>
    </div>
</div>
{@render children()}
