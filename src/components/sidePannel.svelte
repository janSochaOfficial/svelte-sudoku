<script lang="ts">
    import { sudoku, getInfo, type cell } from "../static/store"
    import { solveSudoku, acctivePosition, type position, setNumber, erase, hint } from "../static/board";
    import { get } from "svelte/store";

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

    function getSaveUrl(){
        const blob = new Blob([JSON.stringify(sudokuVar)], {type: 'application/json'});
        return URL.createObjectURL(blob);
    }


</script>
{#key sudokuVar}
<div id="sidePanel">
    <div id="infoPanel">
        <h2>Numbers Left</h2>
        <ul>
            
            {#each getInfo() as num}
                <li>{num[0]}: {num[1]}</li>
            {/each}
            
        </ul>
    </div>
    <div id="optionPanel">
        <div id="erase" class={(eraseVar)? "selected": ""}>
            <input type="checkbox" id="eraseCheck" bind:checked={eraseVar} on:change={handleErase}>
            <label for="eraseCheck">Erase</label>
        </div>
        <div id="hint" class={(hintVar)? "selected": ""}>
            <input type="checkbox" id="hintCheck" bind:checked={hintVar} on:change={handleHint}>
            <label for="hintCheck">Hint</label>
        </div>
        
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
    <a id="download" href={getSaveUrl()} download="sudoku.json">Download to solve later</a >
</div>
{/key}
<style>
    #numpad{
        display: grid;
        grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
    }

    #infoPanel{
        margin-bottom: 40px;
    }

    #infoPanel ul{
        list-style: none;
        display: grid;
        grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
        font-size: 1.2rem;
        margin-top: 10px;
    }

    #optionPanel{
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
    }

    #erase, #hint{
        border-radius: 5px;
        padding: 0.5rem;
        transition: background-color 0.5s ;
    }
    .selected{
        background: rgb(28, 5, 34);
        border-radius: 5px;
        padding: 0.5rem;
    }
    #numpad{
        margin-left: 20px;
        margin-bottom: 20px;
    }
    #solve{
        margin-left: 20px;
        
    }
</style>