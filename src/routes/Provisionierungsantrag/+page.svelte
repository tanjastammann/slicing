<script lang="typescript">
import { onMount } from "svelte";
import Header from '../Header.svelte';
import Footer from '../Footer.svelte';
let tarif_Aenderung = false;
let no_Tarif_Aenderung = false;
let selectedCheckbox = null;

let selectedDate = '';
let cell_id_Fields = [];

function handleDateSelect(event) {
    selectedDate = event.target.value;
}

function handleCheckboxChange(event) {
    selectedCheckbox = event.target.value;
  }
  

function add_cell_id_Field() {
    cell_id_Fields = [...cell_id_Fields, {}];
}
let currentDate;

onMount(() => {
    add_cell_id_Field(); // Fügt beim Laden der Seite ein Textfeld hinzu
    currentDate = new Date().toLocaleDateString();
});

</script>
<Header/>
<div class="provisionierung">
    <div class="Antragstellung">
        <div class="überschrift">
        <div class="grid-item"><h1>Provisionierungsantrag von SIM-Karten vor Bereitstellung der Slices</h1></div>
        <div class="box" style="margin-top:10px; font-size:20px; color:#0066FF">
            <p>Datum: {currentDate}</p>
        </div>
        </div>
        
        <h4>Bitte fülle Sie nachfolgenden Fragen vollständig aus.</h4>
    <div class="container_slice_id">
        <div class="left" style="flex:1.5;">
            <h3>1. Bitte geben Sie die ID des Slices an, an welchem Änderungen vorgenommen werden soll:</h3>
        </div>
        <div class="right" style="align-items:left;">
            <input type="text" placeholder="Slice-ID" style="width: 200px; height: 45px; font-size: 11px; border:solid 2px #0066FF;">
        </div>
    </div>

    <h3>2. Bitte beschreibe das Projekt in kurzen Worten.</h3>
    <input type="text" placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 11px;">

    <h3>3. Sind weitere Produktmerkmale gewünscht, die nicht im Standardprodukt spezifiziert sind? </h3>
    <input type="text" placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 11px;">

    <h3>4. Bitte wählen Sie den bevorzugten DNN! </h3>
    <input type="text"  placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 11px;">

    <h3>5. Bitte benennen Sie die Region im folgenden Textfeld und liste alle gewünschten cell IDs in Tabellenblatt B auf. </h3>
    <input type="text"  placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 11px;">

    <h3>6. Bitte benennen Sie die Region im folgenden Textfeld und listen Sie alle gewünschten cell IDs auf. </h3>
    <div class="container_slice_id">
        <div class="left" style="flex:1.5;">
            <input type="text" placeholder="Region" style="margin-left:10px;margin-bottom:20px; width: 200px; height: 45px; font-size: 11px; border:solid 1px #0066FF;">
                </div>
        <div class="right" style="align-items:left;">
            
            {#each cell_id_Fields as cell_id_Fields, index}
            <input type="text" style="width: 200px; height: 45px;margin-left:10px; font-size: 11px; border:solid 1px #0066FF;" placeholder={`cell_ID ${index + 1}`} />
            {/each}
            <button class="configuartion_send" style="" on:click={add_cell_id_Field}>+ cell-ID</button>
        </div>
    </div>

    <h3>7. Ab wann soll die Slice frühestens aktiv werden?</h3>
    <input type="date" bind:value={selectedDate} on:change={handleDateSelect} style="width=500px; height=560px;">
    <h4>Frühestes Aktivierungsdatum: {selectedDate} </h4>

    <h3>8.Auflistung der Inhalte/Anwendungen/Dienste, für die die 5G Network Slice optimiert ist bzw. Auflistung der mit dem Dienst bereitgestellten besonderen Qualitätskriterien,
        die typischerweise und objektiv für bestimmte, besonders anspruchsvolle Anwendungsszenarien benötigt werden.</h3>
    <input type="text"   placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 11px;">

    <h3>9. Darstellung der spezifischen Anforderungen der Inhalte/Anwendungen/Dienste
        bzw. der besonders anspruchsvollen Anwendungsszenarien an ein bestimmtes Qualitätsniveau (z.B.: Geschwindigkeit, Latenz, Jitter, Interference, Sicherheit)	</h3>
    <input type="text"  placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 11px;">

    <h3>10. Darstellung, weshalb diese Anforderungen nicht über den (Best-Effort-) Internetzugangsdienst von TEF sichergestellt werden können.</h3>
    <input type="text"  placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 11px;">

    <h3>11. Bestätigen Sie folgende Aspekte:</h3>

    <input type=checkbox style="font-size: 11px; text-decoration: underline;"  >
    Die Anwendung der 5G Network Slice erfolgt im Hinblick auf die genannten Inhalte/Anwendungen/Dienste bzw. besonders anspruchsvolle Anwendungsszenarien. 
    <br>
    <br>
    <input type=checkbox style="font-size: 11px; text-decoration: underline;"  >
    Die eine 5G Network Slice wird primär auf bestimmte Inhalte/Anwendungen/Dienste anspruchsvolle Anwendungsszenarien vermarktet wird und eine Vermarktung allein anhand abstrakter Qualitätskriterien (d.h. ohne Bezug zu I/A/D/Anwendungsszenarien) wird nicht erfolgen.
    <br>
    <br>
    <input type=checkbox style="font-size: 11px; text-decoration: underline;"  >
    Die 5G Network Slice wird dem Endkunden ausdrücklich vertraglich mit dem Zweck geschuldet, bestimmte Inhalte/Anwendungen/Dienste bzw. anspruchsvolle Anwendungsszenarien in der erforderlichen Qualität nutzen zu können
    <br>
    <br>
    <input type=checkbox style="font-size: 11px; text-decoration: underline;"  >
    Der dem Endkunden angebotene Dienst bietet keinen Zugang zum offenen Internet ermöglicht
    <br>
    <br>
    <h3>12. Angaben zu Preis & Laufzeit</h3>

    <div class="grid-preis-laufzeit">
    <div class="grid-item">Einrichtungsentgelt - Endkundenpreis</div>
    <input type="text"  placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 11px;">

    <div class="grid-item">Einrichtungsentgelt - Wholesale Preis  </div>
    <input type="text"  placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 11px;">

    <div class="grid-item">Rabatt - Einrichtungsentgelt</div>
    <input type="text"  placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 11px; margin-bottom:2px;">

    <div class="grid-item">Monatl. Serviceentgelt - Endkundenpreis</div>
    <input type="text" placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 11px;">

    <div class="grid-item">Monatl. Serviceentgelt - Wholesale Preis  </div>
    <input type="text"  placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 11px;">

    <div class="grid-item">Rabatt-Modell - Monatl. Serviceentgelt</div>

    <input type="text"   placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 11px;">

    <div class="grid-item">Minimale Vertragslaufzeit - in Monaten</div>
    <input type="text"  placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 11px;">
    </div>

    <button class="configuartion_send">Provisionierungsantrag senden!</button>
</div>
</div>
<style>
    .überschrift{
        display: grid;
        width: 150%;
        grid-template-columns: repeat(2, 2fr);
    }
    .Antragstellung{
    margin-left: 140px;
    margin-right: 50px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
    .grid-container {
        display: grid ;
        grid-template-columns: repeat(4, 1fr); /* Creates 4 columns with equal width */
        grid-template-rows: repeat(2); /* Creates 4 rows with equal height */
        grid-gap: 5px ; /* Adds a gap between grid items */
    }
    .grid-item {
        background-color: 1px #6E7894;
        padding: 5px;
    }
    .grid-item.combined {
        grid-column: span 3; /* Combine the cell with a span of 2 columns */
    }
    .grid-preis-laufzeit {
        display: grid;
        width: 800px;
        grid-template-columns: repeat(2, 1fr);
    }
    .configuartion_send{
        color:white;
        background-color: #0066FF;
        border-radius: 10px;
        width:200px;
        height:40px;
        margin-top: 40px;
        margin-left: 40px;
    }
    .left{
        flex:1;
    }
    .right{
        flex:1;
    }
    h2{
        color:#6E7894;
    }
    h1{
        align-items: center;
        text-decoration: underline;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    h4{
        color:#6E7894;
    }
</style>




