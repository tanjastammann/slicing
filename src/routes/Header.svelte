<script>
    function route_To_Home() {
        // Action to perform when the image button is clicked
        window.location.href="/"
  }

</script>

<div class="Header">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKoxHF3AFy5ZV21Uz_2-WMA5IE7D-35PT6w&usqp=CAU" alt="Button Image" on:click={route_To_Home} style="width:600px; height:100px; margin-top:30px; margin-left:40px;"/>
  
</div>
<hr>

<style>
    .Header{
        padding-left: 100px;
        display:flex;
        background-color: white;
        height:150px;
        width:200px;
    }
    a{
        color:#58617A;
        font-size:28px;
        margin-left:50px;
        text-decoration: none;  
    }
    hr{
        width:90%;
    }

</style>