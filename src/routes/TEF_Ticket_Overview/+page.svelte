<script lang="typescript">
    import TicketOverview from './Ticket_Overview.svelte';
    import TefSidebar from '../TEF_Sidebar.svelte';


    
</script>

<div class="container">
    <div class="sidebar">
      <TefSidebar/>
    </div>
  
    <div class="content">
     
        <TicketOverview/>
        
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





