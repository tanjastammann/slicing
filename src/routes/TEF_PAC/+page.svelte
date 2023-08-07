<script lang="typescript">
    import TefAvailability from '../TEF_Open_Tickets/TEF_Availability.svelte';
    import TefSidebar from '../TEF_Sidebar.svelte';


    
</script>

<div class="container">
    <div class="sidebar">
      <TefSidebar/>
    </div>
  
    <div class="content">
     
        <TefAvailability/>
        
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





