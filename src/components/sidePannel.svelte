<script lang="ts">
    import { sudoku, getInfo, type cell } from "../static/store"
    import { solveSudoku, acctivePosition, type position, setNumber, erase, hint } from "../static/board";

    let sudokuVar: cell[][];
    sudoku.subscribe(data => sudokuVar = data)
    let acctivePos: position
    acctivePosition.subscribe(data => acctivePos = data)

    function handleErase(){
        erase.set(eraseVar)
    }
    function handleHint(){
        hint.set(hintVar)
    }

    let eraseVar: boolean = false,
        hintVar: boolean = false

</script>
{#key sudokuVar}
<div id="sidePanel">
    <div id="infoPanel">
        <ul>
            
            {#each getInfo() as num}
                <li>{num[0]}: {num[1]}</li>
            {/each}
            
        </ul>
    </div>
    <div id="optionPanel">
        <input type="checkbox" id="eraseCheck" bind:checked={eraseVar} on:change={handleErase}>
        <label for="eraseCheck">Erase</label><br>
        <input type="checkbox" id="hintCheck" bind:checked={hintVar} on:change={handleHint}>
        <label for="hintCheck">Hint</label>
    </div>
    <div id="numpad">
        {#each {length: 9} as _, i}
            <button
                on:click={() => {setNumber(acctivePos, i+1)}}
                disabled={(getInfo()[i][1] <= 0)}
            >
                {i + 1}
            </button>
        {/each}
    </div>
    <button id="solve" on:click={solveSudoku}>Solve</button>
</div>
{/key}
<style>
    #numpad{
        display: grid;
        grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
    }


</style>