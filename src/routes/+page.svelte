<script lang="typescript">
  import Header from "./Header.svelte";
  import {  Account, isAuthenticated ,logout, EMAIL} from "./LocalStorage";
  import { onMount } from "svelte";
  import Tabs from "./Tabs.svelte";
  import axios from 'axios';

  

  let items =['Login', 'Registrierung'];
  let activeItem = 'Login';
  const tabChange = (e) => {
      activeItem = e.detail;
  }

  let auth=false;
  isAuthenticated.subscribe(val => auth = val)

  function generateId() {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 10000;
  }

  onMount(() => {
  });
  
  //Login
    let identitaet='';
    let Remail="";
    let Rpassword="";
    let repeatPassword="";
    let Firstname="";
    let Lastname="";
    let email= '';
    let password= "";



    async function handleLogin() {
      localStorage.setItem('account', JSON.stringify(identitaet));
      localStorage.setItem('email', JSON.stringify(email));
      localStorage.setItem('isAuthenticated', 'true');
      if (identitaet === 'TEF') {
            window.location.href="/TEF_Ticket_Overview/"   
        } 
        else if (identitaet === "Partner") {
            window.location.href="/Antrag_Slice_Neu_A"   
        } else {
          alert("Select an identity!")
    }
  }

       
    

    async function handleRegistration(){
        let id=generateId()
        if (Rpassword !== repeatPassword) {
        alert("Passwords do not match!")
        }
        else{
            fetch(`http://127.0.0.1:5000/add_account/${id}/${Firstname}/${Lastname}/${Remail}/${Rpassword}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              mode:'no-cors'
            })
              .then(response => {
                console.log(response);
                if (response.ok) {
                  console.log(response);
                  console.log(JSON.stringify({Remail, Rpassword, Lastname, Firstname}));
                  alert('Your account was created. Please login!');
                  window.location.href="/Antrag_Slice_Neu_A";
                  return response.json();
                }
                else{
                  console.log('Registration failed:');
                  console.error();
                  alert('Registration failed!');
              }
              });
            }
        }

  </script>
  <Header/>
  <div class="login">
      <Tabs {activeItem} {items} on:tabChange={tabChange}/>
      {#if activeItem === 'Login'}
      <div style="Anmeldung">
          <form on:submit|preventDefault={handleLogin}>
            <input type=radio bind:group={identitaet} value={'TEF'} style="font-size: 11px; text-decoration: underline; margin-bottom:20px;" required  >
                Telefónica
                <input type=radio bind:group={identitaet} value={'Partner'} style="font-size: 11px; text-decoration: underline;" >
                Partner
              <label>
              Email
              <input type="email" bind:value={email} required/>
            </label>
            <button type="submit" on:click={handleLogin}>Login</button>
          </form>
      </div>
      
      {:else}
      <div style="Registrierung">

          <form on:submit|preventDefault={handleRegistration}> 
            <label>
              Firstname
              <input type="name" bind:value={Firstname} required/>
            </label>
            <label>
              Lastname
              <input type="name" bind:value={Lastname} required/>
            </label>
            <label>
              Email
              <input type="email" bind:value={Remail} required/>
            </label>
            <label>
              Password
              <input type="password" bind:value={Rpassword} required/>
            </label>
            <label>
              Repeat Password
              <input type="password" bind:value={repeatPassword}/>
            </label>
            <button type="submit">Register</button>
          </form>
      </div>
      {/if}
    </div>

  <style>
    .login{
      margin-top: 50px;
    }
    input{
      color: black;
      border-color: black;
      border-radius: 5px;
      width:100px;
      height:30px;
    }
    div[style="Registrierung"] {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      border-radius: 10px;
      padding: 2rem;
      margin-bottom: 40px;
      max-width: 550px;
      margin: 0 auto;
    }
    div[style="Anmeldung"] {
      display: flex;
      font-size: 26px;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      border-radius: 10px;
      padding: 2rem;
      margin-bottom: 40px;
      max-width: 550px;
      margin: 0 auto;
    }
    /* Style the form labels */
    label {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;  
      font-size: 26px;
    }
    /* Style the form inputs */
    input[type="email"], input[type="password"] ,input[type="name"] {
      border: none;
      border-radius: 10px;
      padding: 1rem;
      width: 100%;
      background-color: #FFFFFF;
      border-color: grey;
      color: #555555;
      font-size: 26px;
      margin-bottom: 1rem;
      border-style: solid;
      border-color: #dfe4e9;
      border-width: 2px;
    }
  
    /* Style the submit button */
    button[type="submit"] {
      border: none;
      border-radius: 5px;
      padding: 1rem 2rem;
      background-color: grey;
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      display: block;
    }    
   
    </style>
    