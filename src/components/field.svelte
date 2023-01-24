<script lang="ts">
    import { get } from "svelte/store";
    import { sudoku, type cell } from "../static/store";
    import { setNumber, acctivePosition, hint, erase } from "../static/board";

    import type { position } from "../static/board";
    import HintsTable from "./hintsTable.svelte";
    let acctivePos: position
    acctivePosition.subscribe(data => acctivePos = data)


    function isActive(i: number, j: number){
        return (acctivePos.row == i && acctivePos.column == j) ? "acctive" : ""
    }
    let sudokuVar: cell[][]

    sudoku.subscribe(data => sudokuVar = data)


    function setAcctive(i: number, j: number){
        if (sudokuVar[i][j].immut) return
        acctivePos = {row: i, column: j}
        acctivePosition.set(acctivePos)
        if(get(erase))
        sudoku.update(data => {
            data[i][j].num = null
            data[i][j].hints = []
            return data
        })

    }

    function isGood(i: number, j: number){
        if (sudokuVar[i][j].immut) return "";
        if (sudokuVar[i][j].ans == sudokuVar[i][j].num) return "good"
        return "bad"
    }

    

</script>

<table id="board">

    {#key acctivePos, sudokuVar}
        {#each sudokuVar as row, i}
            <tr>
                {#each row as cell, j}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <td
                        class={`${isActive(i, j)} ${isGood(i, j)}`}
                        on:click={() => setAcctive(i, j)}
                    >
                        {cell.num ? cell.num : " "}
                        {#if cell.hints.length}
                            <HintsTable hints={cell.hints}/>
                        {/if}
                        
                    </td>
                {/each}
            </tr>
        {/each}
    {/key}
</table>
<style>
    td {
        width: 60px;
        height: 60px;
        border: 1px solid gray;
        font-size: 25px;
        padding: 0;
    }

    td.good{
        color: green;
    }

    td.bad{
        color: red;
    }

    table {
        border: 2px solid gray;
        border-spacing: 0;
    }


    table tr:nth-of-type(2n) td:nth-of-type(2n),
    table tr:nth-of-type(2n + 1) td:nth-of-type(2n + 1) {
        background: rgba(100, 100, 100, 0.12);
        border-color: rgba(100, 100, 100, 0.12);
    }
    table tr:nth-of-type(2n) td:nth-of-type(2n + 1),
    table tr:nth-of-type(2n + 1) td:nth-of-type(2n) {
        background: transparent;
        border-color: #242424;  
    }

    table tr > td:nth-of-type(3),
    table tr > td:nth-of-type(6){
        border-right-color: gray !important;
    }

    table tr:nth-of-type(3) td,
    table tr:nth-of-type(6) td{
        border-bottom-color: gray !important;
    }

    table tr > td:nth-of-type(4),
    table tr > td:nth-of-type(7){
        border-left-color: gray !important;
    }

    table tr:nth-of-type(4) td,
    table tr:nth-of-type(7) td{
        border-top-color: gray !important;
    }

    table tr td.acctive{
        background: rgba(150, 150, 150, 0.40) !important;
        border: 1px solid rgba(150, 150, 150, 0.40) !important;
    }

</style>
