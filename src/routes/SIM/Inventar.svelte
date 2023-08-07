<script>
    let data = []; // Initialize an empty array to store the fetched data
    let slice_status={};
    let placeholder=null;
    let objectId=1000;
    let isLoading = true;

    // Simulate loading delay for demonstration purposes
    setTimeout(() => {
      // Replace this timeout with your actual data loading logic
      data=[];
      isLoading = false;
    }, 4000);
   
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

    let searchICCID = '';
  
    $: filteredData = data.filter(item => 
      item.ICCID.toString().includes(searchICCID)
    );
  
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
  
</script>
    
<div class="inventory">
    <br>
    <button class="configuartion_send" on:click={fetchData}>Load Data!</button>
    <input type="text" bind:value={searchICCID} placeholder="Filter by ICCID" style="margin-left:50px; width: 800px; height: 80px; font-size: 16px;">
    <div class="overview">  
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
                    {#each filteredData as object}
                    <tr>
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
            </tbody>
        </table>
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
    }
    .configuartion_send:hover{
        color:white;
        background-color:#0066FF;
        border-radius: 5px;
        border: 1px solid #6E7894;
        width:200px;
        height:50px;
        margin-top: 40px;
        font-size:18px;
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
    