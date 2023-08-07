<script>
  import { onMount } from "svelte";
  import TefAvailability from "./TEF_Availability.svelte";
  import Tabs from "../Tabs.svelte";

  let items =['NEW',  "WAITING FOR APPROVAL",'IMPLEMENTATION'];
  let activeItem = 'NEW';
  const tabChange = (e) => {
      activeItem = e.detail;
  }
  let data = []; // Initialize an empty array to store the fetched data
  let selectedSlice=[];
  let data_WFA=[];
  let data_IMPL=[];
  let placeholder_WFA=null;
  let placeholder_IMPL=null;
  let slice_status={};
  let slice_PM_status={};
  let Slice_WFA_info=null;
  let Slice_info=null;
  let placeholder=null;
  let Slice_Details=false;
  let slice_overview=true;
  let slice_WFA_overview=true;
  let Slice_WFA_Details=false;
  let objectId=1000;
  let showDetails_general=false;
  let show_Deatails_general_Agreement=false;
  let showDetails_approval=false;
  let showDetails_WFP_approval=false;
  let status='TO BE APPROVED BY PM';
  let status_WFP='TO BE ACCEPTED BY PARTNER';
  let status_IMPL='IMPLEMENTATION';
  
    function show_general(){
      showDetails_general=!showDetails_general;
    }
    function show_general_Agreement(){
      show_Deatails_general_Agreement=!show_Deatails_general_Agreement;
    }
    function show_approval(){
      showDetails_approval=!showDetails_approval;
    }
    function show_showDetails_WFP_approval(){
      showDetails_WFP_approval=!showDetails_WFP_approval;
    }
    function back_to_overview(){
      Slice_Details=false;
      slice_overview=true;
    }
    function back_to_WFA_overview(){
      Slice_WFA_Details=false;
      slice_WFA_overview=true;
    }
    function back_to_IMPLoverview(){
      Slice_Details=false;
      slice_overview=true;
    }
    function change_PM_Status(event) {
      slice_PM_status = event.target.value;; // Update the selected option
      change_WFP_Status()
      }

    async function fetchData() {
        const response = await fetch(`http://127.0.0.1:5000/open_ticket_overview/${status}`); 
        placeholder= await response.json(); // Parse the response as JSON and assign it to the data variable
        data=placeholder;
        console.log(data);   
    }   

    async function fetch_WFA_Data() {
      slice_WFA_overview=true;
      Slice_WFA_Details=false;
      const response = await fetch(`http://127.0.0.1:5000/open_WFP_overview/${status_WFP}`); 
      placeholder_WFA= await response.json(); // Parse the response as JSON and assign it to the data variable
      data_WFA=placeholder_WFA;
      console.log(data_WFA);   
    }
    async function fetch_IMPL_Data() {
      const response = await fetch(`http://127.0.0.1:5000/open_IMPL_overview/${status_IMPL}`); 
      placeholder_IMPL= await response.json(); // Parse the response as JSON and assign it to the data variable
      data_IMPL=placeholder_IMPL;
      console.log(data_IMPL);   
    }   
  
    async function select_Antrag(object) {
      slice_overview=false;
      Slice_Details=true;
      objectId = object.id;
      const response = await fetch(`http://127.0.0.1:5000/get_slice_general_by_ID/${objectId}`); 
      Slice_info = await response.json(); // Parse the response as JSON and assign it to the data variable
      selectedSlice= Slice_info;
      console.log(selectedSlice)
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

    async function change_WFP_Status() {
    change_BAC_Status();
      try {
        const response = await fetch(`http://127.0.0.1:5000/change_WFP_Status/${objectId}/${status_WFP}`, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!'+ objectId);
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
  
    function change_BAC(event) {
      slice_status = event.target.value; // Update the selected option
      change_BAC_Status();
    }

  onMount(() => {    
    fetchData();
    fetch_WFA_Data();
    fetch_IMPL_Data();
    });


  function check_BAC_to_WFP() {
    if (slice_status==="APPROVED BY TEF") {
      // Perform the desired action here when the button is not deactivated
      change_WFP_Status();
    }
    else{
      alert("Binding Availability Check needs to be approved!")
    }
  }
  </script>

   <Tabs {activeItem} {items} on:tabChange={tabChange}/>
   {#if activeItem === 'NEW'}
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
      </div>
      {#if Slice_Details}
        <div class="overview">
          <div class="overview_status">
            <div class="container">
              <div class="left">
                <h3>Allgemeine Angaben der Antragstellung</h3>
              </div>
              <div class="right">
                <button class="toggle" on:click={() => { show_general_Agreement(); }} style="margin-top:20px;">+</button>
              </div>
            </div>
              <hr>
              {#if show_Deatails_general_Agreement}
                <div class="paragraph">
                  {#each selectedSlice as slice}
                    <h4>ID: {slice.id}</h4>
                    <h4>Vereinbarungstyp: {slice.agreement_type}</h4>
                    <h4>Projektbeschreibung: {slice.comment}</h4>
                    <h4>Namen des Kunden: {slice.kundenname}</h4>
                    <h4>Tarifmodell: {slice.product_type}</h4>
                  {/each}  
              </div>
              {/if}
            <div class="container">
              <div class="left">
                <h3>Binding Availability Check: </h3>
              </div>
              <div class="right">
                <button class="toggle" on:click={() => { show_general(); }} style="margin-top:20px;">+</button>
              </div>
            </div>
              <hr>
              {#if showDetails_general}
                <div class="paragraph">
                    <TefAvailability/>
                    <div class="container">
                      <div class="left">
                        <br>
                        <h4>Binding Availability Check Status:</h4>                  
                      </div>
                      <div class="left">
                        <br>
                        <br>
                        <select bind:value= {slice_status} on:change={change_BAC}>
                          <option value="APPROVED BY TEF">APPROVED BY TEF</option>
                          <option value="DECLINED BY TEF">DECLINED BY TEF</option>
                      </select>
                      </div>
                    </div>
                </div>
              {/if}
              <div class="container">
                <div class="left">
                  <h3>Approval of Slice request:</h3>
                </div>
                <div class="right">
                  <button class="toggle" on:click={() => { show_approval(); }} style="margin-top:20px;">+</button>
                </div>
              </div>
            <hr>
            {#if showDetails_approval}
                <div class="paragraph">
                    <div class="container">
                      <div class="left">
                        <br>
                        <h4>Slice Approval Status:</h4>    
                      </div>
                      <div class="left">
                        <button class="configuartion_send" on:click={() => { check_BAC_to_WFP(); back_to_overview()}} >APPROVED BY TEF</button>
                      </div>
                    </div>
                </div>
              {/if}
              <button class="configuartion_send" on:click={back_to_overview}>Zurück</button>
            </div>
          </div>
    {/if}
   {/if}


   {#if activeItem === 'WAITING FOR APPROVAL'}
   <div class="inventory">
     {#if slice_WFA_overview}
     <div class="overview">
       <div class="overview_status">
       <table>
         <thead>
             <th>ID</th>
             <th>Binding Availability Check</th>
             <th>Status</th>
         </thead>
         <tbody>
           {#each data_WFA as object}
           <tr on:click={() => fetch_WFA_Data(object)}>
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
   </div>
{#if Slice_WFA_Details}
     <div class="overview">
       <div class="overview_status">
         <div class="container">
           <div class="left">
             <h3>Binding Availability Check:</h3>
           </div>
           <div class="right">
             <h3>APPROVED BY TEF</h3>
           </div>
         </div>
           <hr>
           <div class="container">
             <div class="left">                
               <h3>Approval of Slice request:</h3>
             </div>
             <div class="right">
               <h3>TO BE ACCEPTED BY PARTNER</h3>
             </div>
           </div>
         <hr>
         <button class="configuartion_send" on:click={back_to_WFA_overview}>Zurück</button>
        </div>  
      </div>


 {/if}
 {/if}

































  <style>
    
    .inventory{
      margin-right: 0px;
      margin-left: 100px;
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
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;   
      font-size: 26px;
      margin-left:150px;
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
      width:90%;
      border-collapse: collapse;
      background-color: white;
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
  