<script lang="ts">
    import { get } from "svelte/store";
	import { screen } from "./static/store";
	import { setNumber, acctivePosition, type position, Movement } from "./static/board";

    import ImportSudoku from "./components/importSudoku.svelte";
	import Field from "./components/field.svelte";
    import SidePannel from "./components/sidePannel.svelte";
	

	let screenVal: string;
	screen.subscribe(e =>{
		screenVal = e
	})
	let acctivePos: position;
	acctivePosition.subscribe(data => acctivePos = data)
	document.getRootNode().addEventListener("keydown", (e: KeyboardEvent) => {
		if (Number(e.key)){
			setNumber(acctivePos, Number(e.key))
			return
		}
		const key = e.key
		switch (key){
			case "ArrowUp":
				Movement.above()
				break;
			case "ArrowRight":
				Movement.next()
				break;
			case "ArrowLeft":
				Movement.prev()
				break;
			case "ArrowDown":
				Movement.bellow()
				break;
			case "Backspace":
				Movement.clear()
				break;
			case "Delete":
				Movement.clear()
				Movement.next()
				break;
		}
	})
</script>


<ImportSudoku />
{#if screenVal == "main"}
	<Field />
	<SidePannel />
{/if}
