<script>
    import { get } from "svelte/store";
    import { sudoku } from "../static/store";


</script>

<table>
    {#each get(sudoku) as row}
        <tr>
            {#each row as cell}
                <td>{cell.ans}</td>
            {/each}
        </tr>
    {/each}
</table>


<style>

    td{
        width: 40px;
        height: 40px;
        border: 1px solid gray;
    }

    table{
        border: 1px solid gray;
        border-spacing: 0;
    }
</style>