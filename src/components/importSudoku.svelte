<script lang="ts">
    import { sudoku, validateSudoku, screen } from "../static/store";
	import type { cell } from "../static/store";

	let files: FileList

	async function importSudoku(){
		const file = files[0]

		const newSudo: cell[][] = await file.text().then(e => JSON.parse(e))
		console.log(newSudo)
		console.log(validateSudoku(newSudo))
		if(validateSudoku(newSudo)){
			sudoku.set(newSudo)
		}

        screen.set("main")
	}

</script>


<input type="file" bind:files on:change={importSudoku}/>