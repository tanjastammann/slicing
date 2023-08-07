<script>
    import Sidebar from "../Sidebar.svelte";
</script>
<div class="container">
    <div class="sidebar">
      <Sidebar/>
    </div>
  
    <div class="content">

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
