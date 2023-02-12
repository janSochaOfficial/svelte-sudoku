<script lang="ts">
    import { sudoku, validateSudoku, screen } from "../static/store";
	import type { cell } from "../static/store";

	let files: FileList

	async function importSudoku(){
		const file = files[0]

		const newSudo: cell[][] = await file.text().then(e => JSON.parse(e))
		for (const row of newSudo){
			for (const cell of row){
				if (!(cell.ans && cell.hints)){
					alert("Wrong data format")
					return
				}
			}
		}
		try {
			if(validateSudoku(newSudo)){
				sudoku.set(newSudo)
				screen.set("main")
			}
			else {
				alert("Sudoku not valid")
			}
		}
		catch{
			alert("Wrong data format")
		}
		

	}

</script>


<input type="file" bind:files on:change={importSudoku}/>