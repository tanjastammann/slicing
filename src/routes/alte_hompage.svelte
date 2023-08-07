<script lang="typescript">
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
    import Login from './+page.svelte';

    
  function route_To_AntragNeuerSlice(){
  window.location.href="/Antrag_Slice_Neu_A";
    }
  function home(){
  window.location.href="/";
    }
  function route_To_Availability(){
    window.location.href="/Availability_Check";
    }
  function route_To_Provisionierungsantrag(){
    window.location.href="/Provisionierungsantrag";
    }
  function route_To_SliceStatus(){
    window.location.href="/TEF_Slice_Status";
  }
  function route_To_Login(){
    window.location.href="/Login";
  }

</script>
<div class="Header">
  <img src="https://www.telefonica.de/static/layout/2021_telefonica/header/logo_telefonica_o2_blue.png"/>
    <div class="Anmeldung">
      <img src="https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png" alt="login" style="margin-top:50px;width: 100px; height:100px;" on:click={route_To_Login}/>
    </div>
 </div>
  <hr>
  <div class="Home">
    
    <div class="grid-container">
      <button on:click={home}>Slice Catalogue</button>
      <button on:click={route_To_AntragNeuerSlice}>Slice Request</button>
      <button on:click={route_To_SliceStatus}>Slice Inventar</button>
      <button on:click={home}>SIM Inventar</button>
      <button on:click={route_To_Availability}>Availability Check</button>
      <button on:click={home}>Reports</button>
      <button on:click={home}>Billing</button>
      <button on:click={home}>Customer Service</button>
      <button on:click={home}>Help</button>
      
    </div>
  </div>

<Footer/>
<style>
  .Anmeldung{
    flex:1; 
    align-self: right;
  }
  .Header{
    padding-left: 100px;
    display:grid;
    grid-template-columns: repeat(3, 90%);
    background-color: white;
    height:200px;
  }
  .Home{
    display: flex;
    justify-content: center; 
    position: relative;
  }
  .grid-container {
    margin-top:40px;
    display: grid ;
    grid-template-columns: repeat(3, 2fr); /* Creates 4 columns with equal width */
    grid-template-rows: repeat(4); /* Creates 4 rows with equal height */
    grid-gap: 10px ; /* Adds a gap between grid items */
  }
  button{
    width:400px;
    height:200px;
    font-size:26px;
    color:#0066FF;
    backdrop-filter: blur(10px);
    border: 3px solid #0066FF;
    background: none;
    border-radius: 30px;
    padding: 50px;
  }
  button:hover {
    background-color:#0066FF ;
    color:white;
  }
  hr{
    width:90%;
    color:#6E7894;
    }
</style>





