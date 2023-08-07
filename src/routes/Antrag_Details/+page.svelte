<script>
    import { Router, Route } from 'svelte-routing';
    import Header from "../Header.svelte";
    import Footer from "../Footer.svelte";
    import { onMount } from "svelte";
    import {  ID } from "../LocalStorage";
  
    let data = []; // Initialize an empty array to store the fetched data
    let placeholder=null;
    let id=null;
    let Slices=[];

  
    ID.subscribe(val => id = val)
    Slices = JSON.parse(localStorage.getItem('id'));
    const SliceId = Slices[0] 
  
    // Fetch data from the API
    async function fetchData() {
        const response = await fetch(`http://127.0.0.1:5000/get_slice_entry/${SliceId}`); 
        placeholder= await response.json(); // Parse the response as JSON and assign it to the data variable
        data=placeholder;
        console.log(data)    
    }
  

    // Call the fetchData function when the component is mounted
    onMount(fetchData);
    
</script>
<Header/>
<Footer/> 