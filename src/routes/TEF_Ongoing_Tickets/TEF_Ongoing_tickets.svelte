<script>
    import { onMount } from "svelte";
    let data = []; // Initialize an empty array to store the fetched data
    let selectedSlice=[];
    let selected_technical_slice=[];
    let selected_regulatory_slice=[];
    let selected_preis_laufzeit_slice=[];
    let selected_bestaetigung_slice=[];
    let slice_status={};
    let slice_PM_status={};
    let slice_impl_date={};
    let Slice_tech=null;
    let Slice_regulatorisch=null;
    let Slice_preis_laufzeit=null;
    let Slice_bestaetigung=null;
    let Slice_info=null;
    let placeholder=null;
    let Slice_Details=false;
    let slice_overview=true;
    let objectId=1000;
    let showDetails_general=false;
    let showDetails_approval=false;
    let showDetails_regulatory=false;
    let showDetails_preis_laufzeit=false;
    let showDetails_bestaetigung=false;
    let status='TO BE APPROVED BY PM';
  
  
  
      function show_general(){
        showDetails_general=!showDetails_general;
      }
      function show_approval(){
        showDetails_approval=!showDetails_approval;
      }
  
  
  
    function back_to_overview(){
      Slice_Details=false;
      slice_overview=true;
    }
  
    // Handle the dropdown selection change
      function change_Status(event) {
          slice_status = event.target.value; // Update the selected option
          change_Slice_Status()
          }
  
        function change_PM_Status(event) {
          slice_PM_status = slice_PM_status.target.value; // Update the selected option
          change_PM_Status()
          }
  
      async function fetchData() {
          const response = await fetch(`http://127.0.0.1:5000/open_ticket_overview/${status}`); 
          placeholder= await response.json(); // Parse the response as JSON and assign it to the data variable
          data=placeholder;
          console.log(data);   
      }   
    
    
    async function select_Antrag(object) {
        slice_overview=false;
        Slice_Details=true;
        objectId = object.id;
        // get Slices with Object.id
        const response = await fetch(`http://127.0.0.1:5000/get_slice_general_by_ID/${objectId}`); 
        Slice_info = await response.json(); // Parse the response as JSON and assign it to the data variable
        selectedSlice= Slice_info;
        console.log(selectedSlice) 
        
        const response_1 = await fetch(`http://127.0.0.1:5000/get_slice_technical_by_ID/${objectId}`); 
        Slice_tech = await response_1.json(); // Parse the response as JSON and assign it to the data variable
        selected_technical_slice= Slice_tech;
        console.log("hallo"+{selected_technical_slice})
  
        const response_2 = await fetch(`http://127.0.0.1:5000/get_slice_regulatory_by_ID/${objectId}`); 
        Slice_regulatorisch = await response_2.json(); // Parse the response as JSON and assign it to the data variable
        selected_regulatory_slice= Slice_regulatorisch;
        console.log("hallo"+{selected_regulatory_slice})
  
        const response_3 = await fetch(`http://127.0.0.1:5000/get_slice_preis_laufzeit_by_ID/${objectId}`); 
        Slice_preis_laufzeit = await response_3.json(); // Parse the response as JSON and assign it to the data variable
        selected_preis_laufzeit_slice= Slice_preis_laufzeit;
        console.log("hallo"+{selected_preis_laufzeit_slice})
  
        const response_4 = await fetch(`http://127.0.0.1:5000/get_slice_bestaetigung_by_ID/${objectId}`); 
        Slice_bestaetigung = await response_4.json(); // Parse the response as JSON and assign it to the data variable
        selected_bestaetigung_slice= Slice_bestaetigung;
        console.log("hallo"+{selected_bestaetigung_slice})
    }
  
    async function change_Slice_Status() {
      try {
          const response = await fetch(`http://127.0.0.1:5000/change_BAC_Status/${objectId}/${slice_status}`, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
              console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!'+ objectId);
              // alert("Neue Slice-Anfrage für pdf erfolgreich gesendet!")
          } else {
              console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
              console.log(JSON.stringify(objectId));
          }
          } 
      catch (error) {
              alert("error"+{objectId});
              console.error('Fehler', error);
          }
      }
  
      async function change_BAC_Status() {
      try {
          const response = await fetch(`http://127.0.0.1:5000/change_BAC_Status/${objectId}/${slice_status}`, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
              console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!'+ objectId);
              // alert("Neue Slice-Anfrage für pdf erfolgreich gesendet!")
          } else {
              console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
              console.log(JSON.stringify(objectId));
          }
          } 
      catch (error) {
              alert("error"+{objectId});
              console.error('Fehler', error);
          }
      }
  
    onMount(() => {    
      fetchData();
      });
    </script>
    
    <div class="inventory">
        {#if slice_overview}
        <div class="overview">
          <div class="overview_status">
          <table>
            <thead>
                <th>ID</th>
                <th>Binding Availability Check</th>
                <th>Status</th>
            </thead>
            <tbody>
              {#each data as object}
              <tr on:click={() => select_Antrag(object)}>
                <td>{object.id}</td>
                <td>{object.availability_check}</td>
                <td>{object.status}</td>
              </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
      {/if}
      <i class="fa-sharp fa-solid fa-gear fa-2xs" style="color: #0e091b;"></i>
     
        {#if Slice_Details}
          <div class="overview">
            <div class="overview_status">
              <div class="container">
                <div class="left">
                  {#each selectedSlice as slice}
                  <h3>Binding Availability Check: {slice.id}</h3>
                  {/each}
                </div>
                <div class="right">
                  <button class="toggle" on:click={() => { show_general(); }} style="margin-top:20px;">+</button>
                </div>
              </div>
                <hr>
                {#if showDetails_general}
                  <div class="paragraph">
                    {#each selectedSlice as slice}
                      <TefAvailability/>
                      <div class="container">
                        <div class="left">
                          <br>
                          <h4>Binding Availability Check Status:</h4>                  
                        </div>
                        <div class="left">
                          <br>
                          <br>
                          <select bind:value= {slice.slice_rollout_status} on:change={change_Status}>
                            <option value="UNDECIDED">UNDECIDED</option>
                            <option value="APPROVED BY TEF">APPROVED BY TEF</option>
                            <option value="DECLINED BY TEF">DECLINED BY TEF</option>
                        </select>
                        </div>
                      </div>
                    {/each}  
                  </div>
                {/if}
                <div class="container">
                  <div class="left">
                    {#each selectedSlice as slice}
                    <h3>Approval of Slice request: {slice.id}</h3>
                    {/each}
                  </div>
                  <div class="right">
                    <button class="toggle" on:click={() => { show_approval(); }} style="margin-top:20px;">+</button>
                  </div>
                </div>
              <hr>
              {#if showDetails_approval}
                  <div class="paragraph">
                    {#each selectedSlice as slice}
                      <div class="container">
                        <div class="left">
                          <br>
                          <h4>Binding Availability Check Status:</h4>                  
                        </div>
                        <div class="left">
                          <br>
                          <br>
                          <select bind:value= {slice.slice_rollout_status} on:change={change_PM_Status}>
                            <option value="TO BE ACCEPTED BY PARTNER">TO BE ACCEPTED BY PARTNER</option>
                            <option value="UNDECIDED">UNDECIDED</option>
                        </select>
                        </div>
                      </div>
                    {/each}  
                  </div>
                {/if}
            
        
                  <button class="configuartion_send" on:click={back_to_overview}>Zurück</button>
              </div>
          </div>
      {/if}
  </div>
    <style>
      .inventory{
        margin-right: 0px;
        margin-left: 140px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        background-color: white;
        border-radius: 30px;
      }
      .toggle{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: white;
        border: 1px solid grey;
        margin-top:20px;
        font-size: 26px;
        font-weight: bolder;
        color:grey;
        margin-right:50px;
      }
      .toggle:hover{
        background-color:#6E7894;
        color:white;
      }
      .container{
        display:flex;
      }
      svg {
        width: 34px;
        height: 34px;
        /* Add any additional styling here */
    }
      .left{
        flex:1;
      }
      select{
        font-size: 26px;
        border: 2px solid black;
        border-radius: 5px;
        background-color: white;
        height:50px;
        color: black;
      }
      .paragraph{
        margin-left:50px;
      }
      hr{
        margin-bottom: 20px;
        width:100%;
        color:#6E7894;
    }
    .configuartion_send{
        color:white;
        background-color:#6E7894;
        border-radius: 5px;
        border: 1px solid #6E7894;
        width:200px;
        height:50px;
        margin-top: 40px;
        font-size:18px;
        position:fixed;
    }
      .overview_status{
        margin-right: 100px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;   
        font-size: 26px;
      } 
      th{
        color:#0066FF;
        font-size: 34px;
        border-bottom: 1px solid #0066FF;
        padding: 20px;
      } 
      td{
        padding: 20px;
      }
      tbody{
        font-size: 34px;
        text-align: center;
        vertical-align: middle;
      }
      tr:hover{
        background-color: #0066FF;
        color:white;
      }
      table{
        width:100%;
        padding:20px;
        border-collapse: collapse;
      }
      h3{
        color:#6E7894;
      }
      h5{
        font-size:26px;
        color: #6E7894;
        margin-left: 50px;
      }
      h4{
        font-size:26px;
        color: black;
      }
      .overview{
        margin-top:50px;
        margin-right: 100px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;   
        font-size: 26px;
      }
      h1{
        align-items: center;
        margin-top:150px;
        font-weight: bold;
        font-size:46px;
        text-decoration: underline;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      }
      
    </style>
    