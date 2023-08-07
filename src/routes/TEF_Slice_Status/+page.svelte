<script lang="typescript">
    import SliceStatusOverview from './Slice_Status_Overview.svelte';
    import Sidebar from '../Sidebar.svelte';

    
    let isAuth = localStorage.getItem('isAuthenticated') === 'true';
    
</script>

<div class="container">
    <div class="sidebar">
      <Sidebar/>
    </div>
  
    <div class="content">
        {#if isAuth}
        <SliceStatusOverview/>
        {:else}
        <h1> Please login to your account!</h1>
        {/if}
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





