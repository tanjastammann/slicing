<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    let showPopup = false;
  
    function openPopup() {
      showPopup = true;
    }
  
    function closePopup() {
      showPopup = false;
    }
  </script>
  
  <button on:click={openPopup}>Open Popup</button>
  
  {#if showPopup}
    <div class="popup">
      <div class="popup-content">
        <h2>Popup Content</h2>
        <p>This is the content of the popup window.</p>
        <button on:click={closePopup}>Close</button>
      </div>
    </div>
  {/if}
  
  <style>
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .popup-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
    }
  </style>
  