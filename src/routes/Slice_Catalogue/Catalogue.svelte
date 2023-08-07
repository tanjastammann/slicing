<script>
    import { onMount } from "svelte";

    let data = []; // Initialize an empty array to store the fetched data
    let selectedSlice=[];
    let selected_technical_slice=[];
    let selected_regulatory_slice=[];
    let selected_preis_laufzeit_slice=[];
    let selected_bestaetigung_slice=[];
    let slice_status={};
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
    let showDetails_technical=false;
    let showDetails_regulatory=false;
    let showDetails_preis_laufzeit=false;
    let showDetails_bestaetigung=false;
    let isLoading = true;

  // Simulate loading delay for demonstration purposes
  setTimeout(() => {
    // Replace this timeout with your actual data loading logic
    data=[];
    isLoading = false;
  }, 14000);
  
    function back_to_overview(){
      Slice_Details=false;
      slice_overview=true;
    }
  
  // Handle the dropdown selection change
    function change_Status(event) {
      slice_status = event.target.value; // Update the selected option
      change_Slice_Status()
      }
  
    // Fetch data from the API
    async function fetchData() {
        const response = await fetch('http://127.0.0.1:5000/get_connections_entry'); 
        placeholder= await response.json(); // Parse the response as JSON and assign it to the data variable
        data=placeholder;
        console.log(data)    
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
          const response = await fetch(`http://127.0.0.1:5000/change_Slice_Status/${objectId}/${slice_status}`, {
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

  let searchICCID = '';
  let searchcall_number = '';
  let searchconnection_status = '';
  
  
  $: filteredData = data.filter(item => 
    item.ICCID.toLowerCase().includes(searchICCID.toLowerCase()) &&
    item.ICCID.toString().includes(searchICCID)&&
    item.call_number.toLowerCase().includes(searchcall_number.toLowerCase()) &&
    item.call_number.toString().includes(searchcall_number) &&
    item.connection_status.toLowerCase().includes(searchconnection_status.toLowerCase()) &&
    item.connection_status.toString().includes(searchconnection_status)
  );

    onMount(() => {    
    //   fetchData();
      });
    </script>
    
<div class="inventory">
    <br>
    <div class="overview">
        <div class="overview_status">
          <div class="filter" style="margin-bottom:60px; align-items:center;">
            <div class="filter_items">
              <h6>Filter by ICCID:</h6>
              <input type="text" style="font-size:16px; height:20px;" bind:value={searchICCID} placeholder="Search ICCID">      
            </div>
            <div class="filter_items">
              <h6>Filter Call Number:</h6>
              <input type="text" style="font-size:16px; height:20px;" bind:value={searchcall_number} placeholder="Search Call Number">      
            </div>
            <div class="filter_items">
              <h6>Filter Status:</h6>
              <input type="text" style="font-size:16px; height:20px;" bind:value={searchconnection_status} placeholder="Search Status">      
            </div>
        </div>   
        <table>
            <thead>
                <th>Commercial Id</th>
                <th>ICCID</th>
                <th>PIN1</th>
                <th>PIN2</th>
                <th>PUK1</th>
                <th>PUK2</th>
                <th>Call number</th>
                <th>Connection Status</th>
            </thead>
            <tbody>
                {#if isLoading}
                <br>
                <h2 style="margin-left:300px;"> Loading data....</h2>
                {:else}
                    {#each filteredData as object}
                    <tr on:click={() => select_Antrag(object)}>
                    <td>{object.id}</td>
                    <td>{object.ICCID}</td>
                    <td>{object.PIN1}</td>
                    <td>{object.PIN2}</td>
                    <td>{object.PUK1}</td>
                    <td>{object.PUK2}</td>
                    <td>{object.call_number}</td>
                    <td>{object.connection_status}</td>
                  </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>
    </div>
</div>


    <style>
      .filter_items{
        flex:1;
      }
      .filter{
        display:flex;
      }
    .inventory{
        margin-right: 50px;
        margin-left: 140px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
        border-color: #0066FF;
        border-collapse: collapse;
      }
      .overview{
        margin-top:50px;
        margin-right: 100px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;   
        font-size: 26px;
      }

    </style>
    