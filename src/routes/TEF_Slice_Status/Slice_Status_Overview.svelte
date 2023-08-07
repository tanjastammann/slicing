<script>
  import { onMount } from "svelte";


  let data = []; // Initialize an empty array to store the fetched data
  let selectedSlice=[];
  let selected_technical_slice=[];
  let selected_regulatory_slice=[];
  let selected_preis_laufzeit_slice=[];
  let selected_bestaetigung_slice=[];
  let slice_status={};
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
  let showDetails_technical=false;
  let showDetails_regulatory=false;
  let showDetails_preis_laufzeit=false;
  let showDetails_bestaetigung=false;



  function show_general(){
    showDetails_general=!showDetails_general;
  }
  function show_technical(){
    showDetails_technical=!showDetails_technical;
  }
  function show_regulatory(){
    showDetails_regulatory=!showDetails_regulatory;
  }
  function show_preis_laufzeit(){
    showDetails_preis_laufzeit=!showDetails_preis_laufzeit;
  }
  function show_bestaetigung(){
    showDetails_bestaetigung=!showDetails_bestaetigung;
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
    function handleDateSelect(event) {
      slice_impl_date = event.target.value;
        update_impl_date();
    }

  // Fetch data from the API
  async function fetchData() {
      const response = await fetch('http://127.0.0.1:5000/get_slice_entry'); 
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
  async function update_impl_date(){
    try {
      const response = await fetch(`http://127.0.0.1:5000/change_Slice_Implementation_date/${objectId}/${slice_impl_date}`, {
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
              <th>Commercial Id</th>
              <th>Kundenname</th>
              <th>Agreement Type</th>
              <th>Aktivierungsdatum</th>
              <th>Antragsstatus</th>
          </thead>
          <tbody>
            {#each data as object}
            <tr on:click={() => select_Antrag(object)}>
              <td>{object.id}</td>
              <td>{object.commercial_id}</td>
              <td>{object.kundenname}</td>
              <td>{object.agreement_type}</td>
              <td>{object.activation_date}</td>
              <td>{object.slice_rollout_status}</td>
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
              <h3>Allgemeine Angaben der Antragstellung</h3>
            </div>
            <div class="right">
              <button class="toggle" on:click={() => { show_general(); }} style="margin-top:20px;">+</button>
            </div>
          </div>
            <hr>
            {#if showDetails_general}
            <div class="paragraph">
              {#each selectedSlice as slice}
                <h4>ID: {slice.id}</h4>
                <h4>Vereinbarungstyp: {slice.agreement_type}</h4>
                <h4>Projektbeschreibung: {slice.comment}</h4>
                <h4>Namen des Kunden: {slice.kundenname}</h4>
                <h4>Tarifmodell: {slice.product_type}</h4>
                <div class="container">
                  <div class="left">
                    <h4>Rollout Status:</h4>                  
                  </div>
                  <div class="left">
                    <select bind:value= {slice.slice_rollout_status} on:change={change_Status}>
                      <option value="SLICE IN PREPARATION">SLICE IN PREPARATION</option>
                      <option value="SLICE ACTIVE">SLICE ACTIVE</option>
                      <option value="SLICE INACTIVE">SLICE INACTIVE</option>
                  </select>
                  </div>
                </div>
              {/each}  
          </div>
          {/if}
          <div class="container">
            <div class="left">
              <h3>Technische Angaben der Antragstellung</h3>
            </div>
            <div class="right">
              <button class="toggle" on:click={() => { show_technical()}} style="margin-top:20px;">+</button>
            </div>
          </div>
        <hr>
        {#if showDetails_technical}
        <div class="paragraph">
          {#each selected_technical_slice as slice}
          <h4>DNN: {slice.dnn}</h4>         
          <h4>Region: {slice.region}</h4>
          <div class="container">
            <div class="left">
                <h4>Implementation Datum: {slice.implementation_date}</h4>
            </div>
              <div class="left">
              <h4>Datum bearbeiten: <input type="date" bind:value={slice.implementation_date} on:change={handleDateSelect} style="width=500px; height=560px; "></h4>
            </div>
          </div>
          {/each}  
      </div>
      {/if}

      <div class="container">
        <div class="left">
          <h3>Regulatorische Angaben der Antragstellung</h3>
        </div>
        <div class="right">
          <button class="toggle" on:click={() => { show_regulatory(); }} style="margin-top:20px;">+</button>
        </div>
      </div>
        <hr>
        {#if showDetails_regulatory}
        <div class="paragraph">
          {#each selected_regulatory_slice as slice}
            <h4>Auflistung der Inhalte/Anwendungen/Dienste, für die die 5G Network Slice optimiert ist bzw. Auflistung der mit dem Dienst bereitgestellten besonderen Qualitätskriterien, die typischerweise und objektiv für bestimmte,
              besonders anspruchsvolle Anwendungsszenarien benötigt werden: </h4>
              <h5>{slice.Auflistung_der_Inhalte_Anwendungen_Dienste}</h5>
            <h4>Darstellung der spezifischen Anforderungen der Inhalte/Anwendungen/Dienste bzw. der besonders anspruchsvollen Anwendungsszenarien an ein bestimmtes Qualitätsniveau (z.B.: Geschwindigkeit, Latenz, Jitter, Interference, 
              Sicherheit):</h4>
              <h5>{slice.Anforderungen_Inhalte_Anwendungen_Dienste}</h5>
            <h4>Darstellung, weshalb diese Anforderungen nicht über den (Best-Effort-) Internetzugangsdienst von TEF sichergestellt werden können: </h4>
              <h5>{slice.Bestaetigung_Internet}</h5>
          {/each}  
        </div>
        {/if}
        <div class="container">
          <div class="left">
            <h3>Angaben zu Preis und Laufzeit der Antragstellung</h3>
          </div>
          <div class="right">
            <button class="toggle" on:click={() => { show_preis_laufzeit(); }} style="margin-top:20px;">+</button>
          </div>
        </div>
        <hr>
        {#if showDetails_preis_laufzeit}
        <div class="paragraph">
          {#each selected_preis_laufzeit_slice as slice}
            <h4>Zahlungsplan: </h4> <h5>{slice.payment_plan}</h5>
            <h4>Maximale Vertragslaufzeit bis: </h4> <h5>{slice.end_date}</h5>
            <h4>Einrichtungsentgelt - Endkundenpreis: </h4> <h5>{slice.Einrichtungsentgelt_Endkundenpreis}</h5>
            <h4>Einrichtungsentgelt - Wholesale Preis: </h4> <h5>{slice.Einrichtungsentgelt_Wholesale_Preis}</h5>
            <h4>Rabatt - Einrichtungsentgelt: </h4> <h5>{slice.Rabatt_Einrichtungsentgelts}</h5>
            <h4>Monatl. Serviceentgelt - Endkundenpreis: </h4> <h5>{slice.Monatl_Serviceentgelt_Endkundenpreis}</h5>
            <h4>Monatl. Serviceentgelt - Wholesale Preis: </h4> <h5>{slice.Monatl_Serviceentgelt_Wholesale_Preis}</h5>
            <h4>Rabatt-Modell - Monatl. Serviceentgelt: </h4> <h5>{slice.Rabatt_Modell_Monatl_Serviceentgelt}</h5>
          {/each}  
        </div>
        {/if}
        <div class="container">
          <div class="left">
            <h3>Bestätigungen der Antragstellung</h3>
          </div>
          <div class="right">
            <button class="toggle" on:click={() => { show_bestaetigung(); }} style="margin-top:20px;">+</button>
          </div>
        </div>
        <hr>
        {#if showDetails_bestaetigung}
        <div class="paragraph">
          {#each selected_bestaetigung_slice as slice}
            <h4>Die Anwendung der 5G Network Slice erfolgt im Hinblick auf die genannten Inhalte/Anwendungen/Dienste bzw. besonders anspruchsvolle Anwendungsszenarien: </h4> <h5>{slice.Bestaetigung_Anwendungsszenarien}</h5>
            <h4>Die eine 5G Network Slice wird primär auf bestimmte Inhalte/Anwendungen/Dienste anspruchsvolle Anwendungsszenarien vermarktet wird und eine Vermarktung allein anhand abstrakter Qualitätskriterien (d.h. ohne Bezug zu I/A/D/Anwendungsszenarien) wird nicht erfolgen: </h4> <h5>{slice.Bestaetigung_Qualitaetskriterien}</h5>
            <h4>Die 5G Network Slice wird dem Endkunden ausdrücklich vertraglich mit dem Zweck geschuldet, bestimmte Inhalte/Anwendungen/Dienste bzw. anspruchsvolle Anwendungsszenarien in der erforderlichen Qualität nutzen zu können: </h4> <h5>{slice.Bestaetigung_Qualitaet}</h5>
            <h4>BestaetiDer dem Endkunden angebotene Dienst bietet keinen Zugang zum offenen Internet ermöglichtgung_Internet:</h4> <h5>{slice.Bestaetigung_Internet}</h5>
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
  