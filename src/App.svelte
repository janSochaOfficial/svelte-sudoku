<script lang="ts">
    import { get } from "svelte/store";
	import { screen } from "./static/store";
	import { setNumber, acctivePosition, type position } from "./static/board";

    import ImportSudoku from "./components/importSudoku.svelte";
	import Field from "./components/field.svelte";
    import SidePannel from "./components/sidePannel.svelte";
	

	let screenVal: string;
	screen.subscribe(e =>{
		screenVal = e
	})
	let acctivePos: position;
	acctivePosition.subscribe(data => acctivePos = data)
	document.getRootNode().addEventListener("keypress", (e: KeyboardEvent) => {
		if (Number(e.key)){
			setNumber(acctivePos, Number(e.key))

		}
	})
</script>


<ImportSudoku />
{#if screenVal == "main"}
	<Field />
	<SidePannel />
{/if}
