
<script>
// @ts-nocheck

    import Sidebar from "../Sidebar.svelte";
    import Inventar from "./Inventar.svelte";
</script>
<div class="container">
    <div class="sidebar">
      <Sidebar/>
    </div>
  
    <div class="content">
        <Inventar/>
    </div>
  </div>


  
<style>
    .container {
        display: flex;

    }
    .content {
        flex-grow: 1;
        padding: 16px;
    }
    img{
        margin-left: 200px;
        margin-top: 100px;
        width: 1000px;
        height: 600px;
        align-self: center;
    }
   
</style>
