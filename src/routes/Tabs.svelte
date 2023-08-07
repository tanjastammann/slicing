<script>
// @ts-nocheck

    import { createEventDispatcher } from 'svelte';
    const distpatch = createEventDispatcher();
    // @ts-ignore
    export let items;
    // @ts-ignore
    export let activeItem;
    
    
    </script>
    
    <div class="tabs">
        <ul>
            {#each items as item}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li on:click={() => distpatch('tabChange', item)}>
                    <div class:active={item === activeItem}>{item}</div>
                </li>
            {/each}
        </ul>
    </div>
<style>
    .tabs {
        margin-top:20px;
        margin-bottom: 0px;
    }
    ul {
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
        margin-top: 20px;
        
    }
    li {
        margin-inline: 2% 1%;
        writing-mode: horizontal-tb;
        font-size:  30px ;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: bold;
        color: black;
        cursor: pointer;
        
    }
    .active {
        color: #0066FF;
        border-bottom: 2px solid#0066FF;
        padding-bottom: 8px;
    }
</style>
    