<script lang="ts">
    import { get } from "svelte/store";
	import { screen } from "./static/store";

    import ImportSudoku from "./components/importSudoku.svelte";
	import Field from "./components/field.svelte";
	

	let screenVal: string;
	screen.subscribe(e =>{
		screenVal = e
	})
</script>


<ImportSudoku />
{#if screenVal == "main"}
	<Field />
{/if}
