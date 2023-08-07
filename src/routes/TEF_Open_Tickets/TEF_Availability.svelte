<script>
    let region='';
</script>

  
    
      <h3>Bitte waehlen Sie die gewünschte Region: </h3>
        <div class="container_slice_id">
            <div class="left" style="flex:1.5; width:100px;height:50px;">
                <select bind:value={region} >
                <option style="flex:1.5; width:100px;height:50px;" value="München">München</option>
                <option style="flex:1.5; width:100px;height:50px;" value="Berlin">Berlin</option>
                <option style="flex:1.5; width:100px;height:50px;" value="Hamburg">Hamburg</option>
                <option style="flex:1.5; width:100px;height:50px;" value="Köln">Köln</option>
                <option style="flex:1.5; width:100px;height:50px;" value="Düsseldorf">Düsseldorf</option>
                <option style="flex:1.5; width:100px;height:50px;" value="Dortmund">Dortmund</option>
                <option style="flex:1.5; width:100px;height:50px;" value="Stuttgart">Stuttgart</option>
                </select>
            </div>
        </div>
      <img src="src\routes\availability_adobe_express (1).svg" alt="AvailabilityCheck">




<style>
  
   select {
      padding: 8px;
      font-size: 26px;
      border: 1px solid #0066FF;
      border-radius: 0px;
      background-color: #fff;
      color: black;
    }
    .container {
        display: flex;

    }
    h3{
        align-items: center;
        text-decoration: underline;
        font-size:26px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .content {
      margin-left:150px;
      flex-grow: 1;
      padding: 16px;
      margin-top: 100px;

    }
    img{
        margin-left: 200px;
        margin-top: 50px;
        width: 1000px;
        height: 600px;
        align-self: center;
    }
   
</style>
