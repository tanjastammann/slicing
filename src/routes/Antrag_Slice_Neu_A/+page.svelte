<script lang="typescript">

    import { onMount } from "svelte";
    import Sidebar from "../Sidebar.svelte";
    import Footer from "../Footer.svelte";
 
    let general=true;
    let technical=false;
    let regulatorisch=false;
    let bestaetigung=false;
    let preis_laufzeit=false;
    let showPopup=false;
    let frequenz='';
    let progress=10;
    let kundenname='';    
    let id='';
    let commercial_id='';
    let property_id='xxxx';
    let antragstyp='Antragstellung'
    let agreement_type='Slice';
    let payment_plan='';
    let end_agreement='';
    let product = '';
    let cell_id = 'xxxx';
    let currentDate='';
    let projektbeschreibung='';
    let Produktmerkmale='';
    let DNN='';
    let region='';
    let selectedDate = '';
    let Inhalte_Anwendungen_Dienste='';
    let Anforderungen ='';
    let Best_Effort_Internetzugangsdienst='';
    let Bestaetigung_Anwendungsszenarien=false;
    let Bestaetigung_Qualitaet =false;
    let Bestaetigung_Qualitaetskriterien =false;
    let Bestaetigung_Internet =false;
    let Einrichtungsentgelt_Endkundenpreis='';
    let Einrichtungsentgelt_Wholesale_Preis='';
    let Rabatt_Einrichtungsentgelts='';
    let Monatl_Serviceentgelt_Endkundenpreis='';
    let Monatl_Serviceentgelt_Wholesale_Preis='';
    let Rabatt_Modell_Monatl_Serviceentgelt='';
    let Minimale_Vertragslaufzeit_in_Monaten='0 Monate';
    let idCounter = 1;

    function hide_general() {
        general = false;
        show_technical()
    }
    function show_general(){
        general=true;
        technical=false;
        regulatorisch=false;
        preis_laufzeit=false;
        bestaetigung=false;        
    }
    function show_technical() {
        technical = true;
        preis_laufzeit=false;
        general=false;
        regulatorisch=false;
        bestaetigung=false;        
        progress=36;  
    }
    function hide_technical() {
        technical = false;
        show_regulatorisch()
    }
    function show_regulatorisch() {
        regulatorisch=true;
        general=false;
        technical=false;
        preis_laufzeit=false;
        bestaetigung=false;        
        progress=54;
    }
    function hide_regulatorisch() {
        regulatorisch = false;
        show_Preis_laufzeit()
    }
    function show_Preis_laufzeit() {
        preis_laufzeit=true;
        general=false;
        technical=false;
        regulatorisch=false;
        bestaetigung=false;        
        progress=72;
    }
    function hide_preis_laufzeit() {
        preis_laufzeit = false;
        show_bestaetigung()
    }
    function hide_bestaetigung(){
        bestaetigung=false;
    }
    function show_bestaetigung() {
        bestaetigung=true;
        general=false;
        technical=false;
        regulatorisch=false;
        preis_laufzeit=false;
        progress=90;
    }
    function openPopup() {
        showPopup = true;
    }
    function closePopup() {
        next()
        showPopup = false;
    }
    function next(){
        window.location.href="/TEF_Slice_Status/";
    }
    
    function handleDateSelect(event) {
        selectedDate = event.target.value;
    }
    function handle_end_agreement(event) {
        selectedDate = event.target.value;
    }
    function handleCheckboxChange(event) {
        Bestaetigung_Anwendungsszenarien = event.target.checked;
    }
    function generateId() {
        // Generate a random number between 1000 and 9999
        return Math.floor(Math.random() * (99999 - 10000 + 1)) + 1000;
    }
    function generate_commercial_Id() {
        commercial_id = `K-${idCounter.toString().padStart(4, '7')}`;
        idCounter++;
    } 
    async function handle_general() {
        const data ={
            id,
            antragstyp,
            product,
            agreement_type,
            selectedDate
        };
        try {
            const response = await fetch(`http://127.0.0.1:5000/general_agreement/${id}/${commercial_id}/${kundenname}/${agreement_type}/${product}/${selectedDate}/${projektbeschreibung}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!'+ data);
            } else {
                console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
                console.log(JSON.stringify(data));
            }
            } 
            catch (error) {
                console.error('Fehler', error);
            }
        }

    async function handle_technical() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/technical_agreement/${id}/${commercial_id}/${DNN}/${region}/${selectedDate}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!');
            } else {
                console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
            }
            } 
        catch (error) {
                console.error('Fehler', error);
            }
    }
    async function handle_cells() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/cell_ids_agreement/${cell_id}/${id}/${commercial_id}/${property_id}/${region}/${frequenz}/${selectedDate}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!');
            } else {
                console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
                // console.log(JSON.stringify(data));
            } 
            } 
        catch (error) {
                console.error('Fehler', error);
            }
        }
    async function handle_payment() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/payment_agreement/${id}/${commercial_id}/${payment_plan}/${end_agreement}/${Einrichtungsentgelt_Endkundenpreis}/${Einrichtungsentgelt_Wholesale_Preis}/${Rabatt_Einrichtungsentgelts}/${Monatl_Serviceentgelt_Endkundenpreis}/${Monatl_Serviceentgelt_Wholesale_Preis}/${Rabatt_Modell_Monatl_Serviceentgelt}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!');
            } else {
                console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
            }
            } 
        catch (error) {
                console.error('Fehler', error);
            }
    }

    async function handle_regulatorisch() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/regulatory_agreement/${id}/${commercial_id}/${Inhalte_Anwendungen_Dienste}/${Anforderungen}/${Best_Effort_Internetzugangsdienst}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!');
            } else {
                console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
            }
            } 
        catch (error) {
                console.error('Fehler', error);
            }
    }
    async function handle_bestaetigung() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/consent_agreement/${id}/${commercial_id}/${Bestaetigung_Anwendungsszenarien}/${Bestaetigung_Qualitaetskriterien}/${Bestaetigung_Qualitaet}/${Bestaetigung_Internet}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!');
            } else {
                console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
            }
            } 
        catch (error) {
                console.error('Fehler', error);
            }
    }

    async function handle_initial_status() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/initial_slice_status/${id}/${commercial_id}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!');
            } else {
                console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
            }
            } 
        catch (error) {
                console.error('Fehler', error);
            }
    }


    async function handle_PDF() {
        let email=localStorage.getItem('email');
        try {
            const response = await fetch(`http://127.0.0.1:5000/get_Content_for_PDF/${id}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!');
            } else {
                console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
            }
            } 
        catch (error) {
                console.error('Fehler', error);
            }
    }

    async function handle_Email() {
        let email=localStorage.getItem('email');
        try {
            const response = await fetch(`http://127.0.0.1:5000/email_handling/${id}/${email}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Neue Slice-Anfrage für PDF erfolgreich gesendet!');
            } else {
                console.error('Slice-Anfrage konnte nicht ausgeführt werden!');
            }
            } 
        catch (error) {
                console.error('Fehler', error);
            }
    }




    onMount(() => {
        currentDate = new Date().toLocaleDateString();
        // add_cell_id_Field(); // Fügt beim Laden der Seite ein Textfeld hinzu
        id = JSON.stringify(generateId());
        generate_commercial_Id();
    });

</script>
<div class="container">
    <div class="sidebar">
      <Sidebar/>
    </div>
  
<div class="content">
    <div class="antrag">
        {#if general}
        <div class="bestaetigung">
            <div class="überschrift">
                <div class="grid-item"><h1>Antrag für die Bereitstellung von lokalen Slices</h1></div>
                <div class="box" style="margin-top:10px; font-size:30px; color:#0066FF">
                    <p>Datum: {currentDate}</p>
                    <p>ID: {id}</p>
                </div>
            </div>
            <h2>Bitte fülle Sie nachfolgenden Fragen vollstaendig aus.</h2>
            <h3>Bitte waehlen Sie den bevorzugten Vereinbarungstyp: </h3>
                    <select bind:value= {agreement_type}>
                        <option value="SLICE">SLICE</option>
                        <option value="SLICE ADD-ON">SLICE ADD-ON</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                <div class="table">
                    <div class="grid-beschreibung">
                        <h3>Bitte beschreiben Sie das Projekt in kurzen Worten.</h3>
                        <input type="text" bind:value={projektbeschreibung}  placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 16px;">
                    </div>
                    <div class="boxname" style="margin-top:10px; font-size:20px;">
                        <h3>Bitte nennen Sie den Namen des Kunden:</h3>
                        <input type="text" bind:value={kundenname}  placeholder="Kundename:" style="width: 800px; height: 80px; font-size: 16px;">
                    </div>
                </div>
            
            <h3>Welches Tarifmodell wird beantragt?</h3>
            <h4>Bitte kreuzen Sie an:</h4>
            <div class="grid-container">
                <br>
                <h1> Slice S</h1>
                <h1> Slice M</h1>
                <h1> Slice L</h1>
                <h2>Monitoring - Basic Packages</h2>
                <label style="padding:0px">
                    <label>
                        <input type=radio bind:group={product}  name="product" value={'Monitoring S'}>
                        Monitoring S
                    </label>
                        <div class="details">
                            <p>SIMs: 100 pcs</p>
                            <p>Uplink: 0,5Mbps Guaranteed</p>
                            <p>Downlink: Best effort</p>
                            <p>Latency: 100 ms</p>
                            <p>Availability: 98 %</p>
                    </div>
                    </label>
                    <label style="padding:0px">
                        <label>
                            <input type=radio bind:group={product} name="product" value={'Monitoring M'}>
                            Monitoring M
                        </label>
                        <div class="details">
                            <p>SIMs: 500 pcs</p>
                            <p>Uplink: 1Mbps Guaranteed</p>
                            <p>Downlink: Best effort</p>
                            <p>Latency: 100 ms</p>
                            <p>Availability: 98 %</p>
                        </div>
                    </label>
                    <label>
                        <label>
                            <input type=radio bind:group={product} name="product" value={'Monitoring L'}>
                            Monitoring L
                        </label>
                        <div class="details">
                            <p>SIMs: 2500 pcs</p>
                            <p>Uplink: 2Mbps Guaranteed</p>
                            <p>Downlink: Best effort</p>
                            <p>Latency: 100 ms</p>
                            <p>Availability: 98 %</p>
                        </div>
                    </label>
                <h2>Control - Upgrade </h2>
                <label style="padding:0px">
                    <label>
                        <input type=radio bind:group={product} name="product" value={'Control S'}>
                        Control S
                    </label>
                        <div class="details">
                        <p>Downlink: 0,5 Mbps Guaranteed</p>
                        <p>Latency: shorter than 30 ms</p>
                        </div>
                    </label>
                    
                    <label style="padding:0px">
                        <label>
                            <input type=radio bind:group={product} name="product" value={'Control M'}>
                            Control M
                        </label>
                            <div class="details">
                                <p>Downlink: 0,5 Mbps Guaranteed</p>
                                <p>Latency: shorter than 30 ms</p>
                            </div>
                    </label>
                    <label style="padding:0px">
                        <label>
                            <input type=radio bind:group={product} name="svcoops" value={'Control L'}>
                            Control L
                        </label>
                            <div class="details">
                                <p>Downlink: 0,5 Mbps Guaranteed</p>
                                <p>Latency: shorter than 30 ms</p>
                            </div>
                    </label>
                    <h2> Individual Upgrade</h2>
                <div class="grid-item combined">
                
                    <label style="padding:0px">
                        <input type=radio bind:group={product} name="product" value={'KORERO TEST'}>
                        KORERO TEST
                        <br>
                    </label>
                    <br>
                    <label style="padding:0px">
                        <input type=radio bind:group={product} name="product" value={'INDIVIDUAL SLICE'}>
                        INDIVIDUAL SLICE
                        <br>
                    </label>
                    <br>
                    <label style="padding:0px">
                        <input type=radio bind:group={product} name="product" value={'OTHER'}>
                        OTHER (NON -SLICE)
                        <br>
                    </label>
                </div>
            </div>
            <h3>Ab wann soll die Slice frühestens aktiv werden?</h3>
                <input type="date" bind:value={selectedDate} on:change={handleDateSelect} style="width=500px; height=560px;">
                <br>
                <h4>Frühestes Aktivierungsdatum: {selectedDate} </h4>
            <button class="configuartion_send" on:click={() => { hide_general(); handle_general()}}>Speichern und Weiter</button>
            
    </div>
            {/if}

            {#if technical}
                <div class="bestaetigung">
                    <h2>Technische Angaben:</h2>
                    <h3>Sind weitere Produktmerkmale gewünscht, die nicht im Standardprodukt spezifiziert sind? </h3>
                    <input type="text" bind:value={Produktmerkmale} placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 16px;">
                    <br>
                    <h3>Bitte waehlen Sie den bevorzugten DNN:</h3>
                    <select bind:value= {DNN}>
                        <option value="KORERO STANDARD">KORERO STANDARD</option>
                        <option value="CUSTOMER SPECIFIC">CUSTOMER SPECIFIC</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                    <br>
                    <h3>Bitte waehlen Sie die gewünschte Frequenz: </h3>
                    <select bind:value= {frequenz}>
                        <option value="5G700">5G700</option>
                        <option value="5G1800">5G1800</option>
                        <option value="5G3600">5G3600</option>
                    </select>

                    <h3>Bitte waehlen Sie die gewünschte Region: </h3>
                    <div class="container_slice_id">
                        <div class="left" style="flex:1.5; width:100px;height:50px;">
                            <select bind:value={region} >
                            <option style="flex:1.5; width:100px;height:50px;" value="München">München</option>
                            <option style="flex:1.5; width:100px;height:50px;" value="Berlin">Berlin</option>
                            <option style="flex:1.5; width:100px;height:50px;" value="Hamburg">Hamburg</option>
                            <option style="flex:1.5; width:100px;height:50px;" value="Köln">Köln</option>
                            <option style="flex:1.5; width:100px;height:50px;" value="Düsseldorf">Düsseldorf</option>
                            <option style="flex:1.5; width:100px;height:50px;" value="Dortmund">Dortmund</option>
                            <option style="flex:1.5; width:100px;height:50px;" value="Stuttgart">Stuttgart</option>
                            </select>
                        </div>
                    </div>
                    <button class="configuartion_send" on:click={() => { show_general(); }}>Zurück</button>
                    <button class="configuartion_send" on:click={() => { handle_technical();handle_cells(); hide_technical();}}>Speichern und Weiter</button>
                </div>
        {/if}

        {#if regulatorisch}
        <div class="bestaetigung">

            <h2>Regulatorische Angaben:</h2>
            <h3>Auflistung der Inhalte/Anwendungen/Dienste, für die die 5G Network Slice optimiert ist bzw. Auflistung der mit dem Dienst bereitgestellten besonderen Qualitaetskriterien,
                die typischerweise und objektiv für bestimmte, besonders anspruchsvolle Anwendungsszenarien benötigt werden.</h3>
            <input type="text" bind:value={Inhalte_Anwendungen_Dienste}  placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 16px;">

            <h3>Darstellung der spezifischen Anforderungen der Inhalte/Anwendungen/Dienste
                bzw. der besonders anspruchsvollen Anwendungsszenarien an ein bestimmtes Qualitaetsniveau (z.B.: Geschwindigkeit, Latenz, Jitter, Interference, Sicherheit)	</h3>
            <input type="text" bind:value={Anforderungen}  placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 16px;">

            <h3>Darstellung, weshalb diese Anforderungen nicht über den (Best-Effort-) Internetzugangsdienst von TEF sichergestellt werden können.</h3>
            <input type="text" bind:value={Best_Effort_Internetzugangsdienst} placeholder="Ihre Beschreibung!" style="width: 800px; height: 80px; font-size: 16px;">
            <br>
            <button class="configuartion_send" on:click={() => { hide_regulatorisch(); show_technical(); }}>Zurück</button>
            <button class="configuartion_send"  on:click={() => { handle_regulatorisch(); hide_regulatorisch(); }}  >Speichern und Weiter</button>
        </div>
        {/if}

        {#if preis_laufzeit}
        <div class="bestaetigung">
            <h2>Angaben zu Preis & Laufzeit</h2>
            <h3>Bitte waehlen Sie den gewünschte Zahlungsplan:</h3>    
                <select bind:value= {payment_plan}>
                    <option value="50% DISCOUNT IN 1ST 3 MONTHS">50% DISCOUNT IN 1ST 3 MONTHS</option>
                    <option value="CONSTANT PAYMENT">CONSTANT PAYMENT</option>
                    <option value="TBD">TBD</option>
                </select>
        </div>
            <br>
            <br>
            <div class="grid-preis-laufzeit">
                <div class="grid-item">Einrichtungsentgelt - Endkundenpreis</div>
                <input type="text" bind:value={Einrichtungsentgelt_Endkundenpreis} placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 26px;">

                <div class="grid-item">Einrichtungsentgelt - Wholesale Preis  </div>
                <input type="text" bind:value={Einrichtungsentgelt_Wholesale_Preis} placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 26px;">

                <div class="grid-item">Rabatt -<br>Einrichtungsentgelt</div>
                <input type="text" bind:value={Rabatt_Einrichtungsentgelts}  placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 26px;">

                <div class="grid-item">Monatl. Serviceentgelt - Endkundenpreis</div>
                <input type="text" bind:value={Monatl_Serviceentgelt_Endkundenpreis} placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 26px;">

                <div class="grid-item">Monatl. Serviceentgelt - Wholesale Preis  </div>
                <input type="text" bind:value={Monatl_Serviceentgelt_Wholesale_Preis} placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 26px;">

                <div class="grid-item">Rabatt-Modell - Monatl. Serviceentgelt</div>
                <input type="text" bind:value={Rabatt_Modell_Monatl_Serviceentgelt}  placeholder="Ihre Angabe!" style="width: 600px; height: 40px; font-size: 26px;">
                </div> 

                <h3>Wann soll das Agreement deaktiviert werden:</h3>
                    <input type="date" bind:value={end_agreement} on:change={handle_end_agreement} style="width=500px; height=560px;">
                    <br>
                    <h4>Deaktivierungsdatum: {end_agreement} </h4>
                <button class="configuartion_send" on:click={() => { hide_preis_laufzeit(); show_regulatorisch(); }}>Zurück</button>
                <button class="configuartion_send" on:click={() => { hide_preis_laufzeit(); handle_payment(); }}>Speichern und Weiter</button>
        {/if}

        {#if bestaetigung}
        <div class="bestaetigung">
            <br>
            <h2>Bestätigen Sie folgende Aspekte:</h2>  
            <input type=checkbox bind:checked={Bestaetigung_Anwendungsszenarien} on:change={handleCheckboxChange} style="font-size: 11px; text-decoration: underline;"  >
            Die Anwendung der 5G Network Slice erfolgt im Hinblick auf die genannten Inhalte/Anwendungen/Dienste bzw. besonders anspruchsvolle Anwendungsszenarien. 
            <br>
            <br>
            <input type=checkbox bind:checked={Bestaetigung_Qualitaetskriterien} on:change={handleCheckboxChange} style="font-size: 11px; text-decoration: underline;"  >
            Die eine 5G Network Slice wird primär auf bestimmte Inhalte/Anwendungen/Dienste anspruchsvolle Anwendungsszenarien vermarktet wird und eine Vermarktung allein anhand abstrakter Qualitätskriterien (d.h. ohne Bezug zu I/A/D/Anwendungsszenarien) wird nicht erfolgen.
            <br>
            <br>
            <input type=checkbox bind:checked={Bestaetigung_Qualitaet} on:change={handleCheckboxChange} style="font-size: 11px; text-decoration: underline;"  >
            Die 5G Network Slice wird dem Endkunden ausdrücklich vertraglich mit dem Zweck geschuldet, bestimmte Inhalte/Anwendungen/Dienste bzw. anspruchsvolle Anwendungsszenarien in der erforderlichen Qualität nutzen zu können
            <br>
            <br>
            <input type=checkbox bind:checked={Bestaetigung_Internet} on:change={handleCheckboxChange} style="font-size: 11px; text-decoration: underline;"  >
            Der dem Endkunden angebotene Dienst bietet keinen Zugang zum offenen Internet 
            <br>
            <button class="configuartion_send" on:click={() => { hide_bestaetigung(); show_Preis_laufzeit(); }}>Zurück</button>
            <button class="configuartion_send" on:click={() => { handle_bestaetigung(); handle_initial_status(); handle_PDF(); handle_Email();  openPopup(); }}>Speichern und Senden</button>
        </div>
        {/if}
    </div>
</div>
</div>
{#if showPopup}
    <div class="popup">
        <div class="popup-content">
            <table>
                <tr>
                  <th><svg xmlns="http://www.w3.org/2000/svg" height="5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#0066ff}</style><path d="M320 488c0 9.5-5.6 18.1-14.2 21.9s-18.8 2.3-25.8-4.1l-80-72c-5.1-4.6-7.9-11-7.9-17.8s2.9-13.3 7.9-17.8l80-72c7-6.3 17.2-7.9 25.8-4.1s14.2 12.4 14.2 21.9v40h16c35.3 0 64-28.7 64-64V153.3C371.7 141 352 112.8 352 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V320c0 70.7-57.3 128-128 128H320v40zM456 80a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM192 24c0-9.5 5.6-18.1 14.2-21.9s18.8-2.3 25.8 4.1l80 72c5.1 4.6 7.9 11 7.9 17.8s-2.9 13.3-7.9 17.8l-80 72c-7 6.3-17.2 7.9-25.8 4.1s-14.2-12.4-14.2-21.9V128H176c-35.3 0-64 28.7-64 64V358.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V192c0-70.7 57.3-128 128-128h16V24zM56 432a24 24 0 1 0 48 0 24 24 0 1 0 -48 0z"/></svg></th>
                  <td> <h2 style="color:#0066FF;">Vielen Dank!</h2>
                    <p>Der Slice wurde erfolgreich konfiguriert und die Anfrage gesendet.</p>
                    <p>Die Antrags-ID:{id}</p>
                    <button class="configuartion_send" on:click={closePopup}>Schließen</button></td>
                </tr>
              </table>
        </div>
    </div>
{/if}

<style>
     .container {
        display: flex;

    }
    .content {
        flex-grow: 1;
        padding: 16px;
        margin-top:50px;
    }
    select {
        padding: 8px;
        font-size: 26px;
        border: 1px solid black;
        border-radius: 0px;
        background-color: #fff;
        color: black;
    }
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
    }
    
    .überschrift{
        display: grid;
        width: 150%;
        grid-template-columns: repeat(2, 2fr);
    }
    .table{
        display: grid;
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
    }
    .antrag{
        margin-left: 140px;
        margin-right: 50px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
    .details{
        margin-left:50px;
    }
    .bestaetigung{
        font-size:30px;
    }
    .grid-container {
        display: grid ;
        grid-template-columns: repeat(4, 1fr); /* Creates 4 columns with equal width */
        grid-template-rows: repeat(2); /* Creates 4 rows with equal height */
        grid-gap: 5px ; /* Adds a gap between grid items */
    }
    .grid-preis-laufzeit {
        display: grid;
        width: 900px;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
        font-size:20px;
    }
    .grid-item {
        background-color: 1px #6E7894;
        font-size:26px;
        padding: 5px;
    }
    .grid-item.combined {
        grid-column: span 3; /* Combine the cell with a span of 2 columns */
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
    svg{
        margin-right:50px;
    }
     
</style>




