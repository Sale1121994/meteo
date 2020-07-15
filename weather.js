/*funzione che al caricamente della pagina richiede le coordinate, se le ottiene,
visualizza il meteo locale se no aspetta un input*/
window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mia_posizione);
  }
  function mia_posizione(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var apiCall='https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=77effa618a04584f1093cda186f54131'
    console.log(apiCall);
    dMeteo(apiCall);
  }
}

/*funzione di ricerca dall'input dell'utente per una città qualsiasi*/
document.addEventListener('DOMContentLoaded', function(e) {
  const btn = document.querySelector('button');
    btn.onclick =function (e) {
    const city = document.getElementById('city').value;
    var url =encodeURI(city);
    e.preventDefault();
    if (city===""){
      alert ('inserisci una citt\u00E0');
    }else {
       var apiCall='https://api.openweathermap.org/data/2.5/weather?q=' + url +
       '&appid=77effa618a04584f1093cda186f54131';
       console.log(apiCall);
       dMeteo(apiCall);
       }
     }
 })

/*funzione di richiesta dei dati ad openweather*/
 function dMeteo(apiCall){
   let request = new XMLHttpRequest();
   request.open('GET', apiCall,true);
     request.responseType='json';
     request.send();
     request.onload = function(){
       const datiMeteo= request.response;
       visualizzaMeteo(datiMeteo,apiCall);
     }
     request.onloadend = function(){
       if(request.status == 404){

          const ricerca = document.getElementById('ricerca');
          const city = document.querySelector('input');
          ricerca.style.backgroundColor = 'red';
          city.style.backgroundColor = 'red';
          city.classList.add("apply-shake");
          city.addEventListener("animationend", (e) => {
            city.classList.remove("apply-shake");
            ricerca.style.backgroundColor = '#acacac';
            city.style.backgroundColor = '#acacac';
          });
      }
}
}

  /*funzione di visualizzazione del meteo delle località trovate o richieste*/
function visualizzaMeteo(datiMeteo,apiCall){

  if (apiCall.includes('lat')===true){
    var nome = datiMeteo.name;
  }else{
    var nome = city.value;
  }
  var nazione = datiMeteo.sys.country;
  var nome = nome.charAt(0).toUpperCase() + nome.slice(1)+', '+nazione;
  var descrizione = datiMeteo.weather[0].description;
  var tempAtt= datiMeteo.main.temp;
  var tempMax= datiMeteo.main.temp_max;
  var tempMin= datiMeteo.main.temp_min;
  var icon = datiMeteo.weather[0].icon;
  /*creo due div all'interno del div dati in modo da dividere i contenuti e gestir emeglio gli stili*/
  const cont= document.getElementById('contenuto');
  const dati = document.createElement('div');
  const datiPrin = document.createElement('div');
  const datiSec = document.createElement('div');
  const p = document.getElementsByTagName('p');
  while (cont.firstChild) {
    cont.removeChild(cont.firstChild);
  }

/*css per i div*/
  cont.appendChild(dati);
  dati.setAttribute('class','dati');
  dati.style.justifyContent='flex-start';
  /*css div superiore img + scritta nome*/
  datiPrin.setAttribute('class','datiprinc');
  /*css per il secondo div dei dati*/
  datiSec.setAttribute('class','datisec');

  /*scegliere immagine*/
  const imgMeteo = document.createElement('img');
  imgMeteo.src = 'https://openweathermap.org/img/wn/'+icon+'.png';
  imgMeteo.setAttribute('class','meteo');
  const para=document.createElement('p')

  para.setAttribute('class','para');
  para.textContent = nome;
  dati.appendChild(datiPrin);
  datiPrin.appendChild(para);
  datiPrin.appendChild(imgMeteo);

  const list = document.createElement('ul');

  const liTempAtt = document.createElement ('li');
  tempAtt=Math.floor(tempMax-273,15);
  liTempAtt.textContent= 'Temperatura attuale: '+tempAtt+'\u00B0C';

  const liTempMax = document.createElement ('li');
  tempMax=Math.floor(tempMax-273,15);
  liTempMax.textContent= 'Temperatura massima: '+tempMax+'\u00B0C';

  const liTempMin = document.createElement ('li');
  tempMin=Math.floor(tempMin-273,15);
  liTempMin.textContent= 'Temperatura minima: '+tempMin+'\u00B0C';

  const liDescr = document.createElement ('li');
  var traduzione ={
    'clear sky' : 'Cielo limpido',
    'few clouds' : 'Poco nuvoloso',
    'scattered clouds' : 'Nubi sparse',
    'broken clouds' : 'Nuvoloso',
    'overcast clouds' : 'Molto nuvoloso',
    'shower rain' : 'Acquazzoni',
    'light rain': 'Pioggierella',
    'rain' : 'Pioggia',
    'thunderstorm':'Temporali',
    'snow':'Nevicate',
    'mist':'Nebbia',
  }
  liDescr.textContent= traduzione[descrizione];
  liTempAtt.setAttribute('class','lista');
  liTempMax.setAttribute('class','lista');
  liTempMin.setAttribute('class','lista');
  liDescr.setAttribute('class','lista');

  dati.appendChild(datiSec);
  datiSec.appendChild(list);
  list.appendChild(liDescr);
  list.appendChild(liTempAtt);
  list.appendChild(liTempMax);
  list.appendChild(liTempMin);
  document.getElementById('city').value="";
  document.getElementById('city').placeholder="Inserisci un'altra citt\u00E0";
}
