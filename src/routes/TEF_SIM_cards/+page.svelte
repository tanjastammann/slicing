<script lang="typescript">
    import TefSimInventar from './TEF_SIM_Inventar.svelte';
    import TefSidebar from '../TEF_Sidebar.svelte';


    
</script>

<div class="container">
    <div class="sidebar">
      <TefSidebar/>
    </div>
  
    <div class="content">
     
        <TefSimInventar/>
        
    </div>
</div>

<style>
     .container {
        display: flex;
    }
    .content {
        flex-grow: 1;
        padding: 16px;
        margin-top:50px;
    }

</style>





