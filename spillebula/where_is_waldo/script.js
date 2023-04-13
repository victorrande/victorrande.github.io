// ------------------ WHERE IS WALDO ----------------

//henter elementer fra DOM
let waldoEl = document.querySelector(`.waldo`)
let overskriftEl = document.querySelector(`#overskrift`)
let waldoFunnetEl = document.getElementById(`waldoFunnet`)
let navbarEl = document.querySelector(`.navbar`)
let boksEl = document.querySelector(`#boks`)
let prikkFunnetEl = document.getElementById(`prikk1`)


var difficultyEls = document.querySelector(`select`)  

var oldNavEl = navbarEl.innerHTML; //Lagrer navbaren i oldNavEl


if(!localStorage.bane){  //if test for å sette localstoragen til bane 1 dersom brukeren er ny
    localStorage.bane = 1
}

let S = Number(localStorage.bane) //lar S være nummeret til localstorage slik at man får muligheten til å komme tilbake på samme bane

console.log("local storage:" + localStorage.bane)


//  ------------ SJEKKER OM BRUKEREN HAR SPILT FØR


if(localStorage.bane < 2){
    console.log("Du starter på bane 1")
    
} else{
    //Dersom brukeren har spilt før må HTMLen endres slik at man blir satt på riktig bane igjen. Dette gjøres med S som tilsvarer et nummer som sier hvilken bane brukeren er på
    console.log(`Du fortsetter på bane ${S}`)

    waldoEl.innerHTML = (`
    <div id="prikk${S}" class="prikk">  
    </div>
    `)

    waldoEl.style.backgroundImage = (`url(bilder/${S}.png)`)

    //legger inn elementet på nytt slik at eventlisteren fortsatt fungerer
    var difficultyEls = document.querySelector(`select`)

    prikkFunnetEl = document.getElementById(`prikk${S}`);
    prikkFunnetEl.addEventListener(`click`, funnetWaldo);

}

//Dersom spilleren har nådd bane ni blir den satt tilbake til nummer 1 igjen. 
if(localStorage.bane >= 9){ 
    console.log("Du har nådd siste nivå, derfor starter du på nytt")
    localStorage.bane = Number(1)
}

//flashlight funksjon inspirert fra https://codemyui.com/flashlight-mouse-pointer/
function update(e){
    var x = e.clientX || e.touches[0].clientX
    var y = e.clientY || e.touches[0].clientY

    document.documentElement.style.setProperty('--cursorX', x + 'px')
    document.documentElement.style.setProperty('--cursorY', y-120 + 'px')
    }
    document.addEventListener('mousemove',update)
    document.addEventListener('touchmove',update)

prikkFunnetEl.addEventListener(`click`,funnetWaldo) //eventlistener for "hitboxen" til Waldo

//Funksjon for funnet waldo som endrer HTMLen slik at bildet av Waldo dukker opp og ny knapp knyttet til funksjonen nyttSpill med "onclick"  
function funnetWaldo(){

        //Legger inn waldo
        waldoEl.innerHTML = (`<div id="waldoFunnet">

        <div class="newGame">
            <p> Du fant Waldo! </p>
            <input type="button" value="Neste bane" onclick="nyttSpill()"> 
        </div>
        
        <img id="funnetWaldo" src="bilder/wally.png" alt="">
        `)

    }

//Funksjon for 
function nyttSpill(){
    navbarEl.innerHTML = oldNavEl //Setter inn den gamle navbaren som har blitt lagret gjennom oldNavEl

    localStorage.bane = Number(localStorage.bane) + 1 //Plusser på localStorage.bane slik at bane nr øker

    S = Number(localStorage.bane) //Forteller koden igjen at S er knyttet til det nr localStorage.bane representerer

    console.log("Prikkens nummer = " + S)

    //Oppdaterer waldos "hitbox" slik at den passer til neste bane
    waldoEl.innerHTML = (`
    <div id="prikk${S}" class="prikk">  
    </div>
    `)

    //Oppdaterer til neste bilde
    waldoEl.style.backgroundImage = (`url(bilder/${S}.png)`)

    //legger inn elementet på nytt og oppdaterer eventListeren slik at den fortsatt fungerer
    prikkFunnetEl = document.getElementById(`prikk${S}`);
    prikkFunnetEl.addEventListener(`click`, funnetWaldo);

    console.log("local storage:" + localStorage.bane)

    if(localStorage.bane > 8){

        waldoEl.innerHTML = (`<div id="waldoFunnet">

        <div class="newGame">
            <p> Du fant alle Waldoene! </p>
            <input type="button" value="Start på nytt" onclick="restartGame()"> 
        </div>
        
        <img id="funnetWaldo" src="bilder/wally.png" alt="">
        `) 
    }
}

//resetter localstorage counten når spilleren har utført alle banene
function restartGame() {
    localStorage.bane = Number(1)
    location.reload();

}
        
