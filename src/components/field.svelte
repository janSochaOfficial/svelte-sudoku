<script lang="ts">
    import { get } from "svelte/store";
    import { sudoku, type cell } from "../static/store";

    import type { position } from "../static/board";
    let acctivePos: position = {row: -1, column: -1}
    function isActive(i: number, j: number){
        return (acctivePos.row == i && acctivePos.column == j) ? "acctive" : ""
    }
    let sudokuVar: cell[][]
    sudoku.subscribe(data => sudokuVar = data)
    function setAcctive(i: number, j: number){
        if (!sudokuVar[i][j].immut)
        acctivePos = {row: i, column: j}
    }

    function isGood(i: number, j: number){
        if (sudokuVar[i][j].immut) return;
        if (sudokuVar[i][j].ans == sudokuVar[i][j].num) return "good"
        return "bad"
    } 

</script>

<table>
    {#key acctivePos}
        {#each get(sudoku) as row, i}
            <tr>
                {#each row as cell, j}
                    <td class={isActive(i, j)} on:click={() => setAcctive(i, j)}>{cell.num ? cell.num : " "}</td>
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
        font-size: 25px
    }

    table {
        border: 1px solid gray;
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
