<script lang="ts">
    export let hints: number[] = [];


    
</script>


<table>
    {#each {length: 3} as _, i}
        <tr>
            {#each {length: 3} as _, j}
                <td>{(hints.includes((i) * 3 + j + 1))? (i) * 3 + j + 1 : " "}</td>
            {/each}
        </tr>
    {/each}
</table>

<style>
    
    table{
        width: 58px;
        height: 48px;
        border-spacing: 0;
        border: 0;
    }
    table td{
        width: 33%;
        height: 100% !important;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.604);
    }
    table tr{
        height: 33%;
        width: 100%;
    }
</style>