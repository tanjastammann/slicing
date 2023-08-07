<script lang="typescript">
    import Sidebar from '../Sidebar.svelte';
    import PartnerInbox from './Partner_inbox.svelte';


    
</script>

<div class="container">
    <div class="sidebar">
      <Sidebar/>
    </div>
  
    <div class="content">
        <PartnerInbox/>
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





