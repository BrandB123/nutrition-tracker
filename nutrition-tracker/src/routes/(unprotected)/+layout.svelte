<script lang="ts">
    import '../../app.css';
	
	let { children } = $props();
</script>

<div class="bg-sky-700 p-6 font-tahoma flex">
    <h1 class="font-bold text-2xl">NUTRITION TRACKER</h1>
    <div class="ml-auto mr-6 flex gap-6 self-center">
        <a href="/login" class="hover:font-semibold">Log In</a>
        <a href="/register" class="hover:font-semibold">Sign Up</a>
    </div>
</div>
{@render children()}
