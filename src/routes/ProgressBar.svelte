<!-- ProgressBar.svelte -->
<script>
  export let progress = 0;
  
</script>

<style>
  .progress-bar {
    width: 100%;
    height: 15px;
    background-color: white;
    border-radius: 30px;
  }
  
  .progress {
    height: 100%;
    background-color: #0066FF;
    border-radius: 30px;
    color:white;
    align-content: center;
  }
  
</style>

<div class="progress-bar">
  <div class="progress" style="width: {progress}%" ></div>
</div>
