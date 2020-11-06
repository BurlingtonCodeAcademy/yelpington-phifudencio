let id = window.location.href.slice(window.location.href.lastIndexOf('/') + 1); // This gets the name of the resturant in the url.

//DOM query
let restDetail = document.getElementById("restaurant_list");
let home = document.getElementById('home')
//build map with burlington in the center
let mymap = L.map("map").setView([44.478166, -73.2142442], 14);
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(mymap)

//event listener for home div
home.addEventListener('click', () => {
    window.location = '/index.html';
});

//function that builds a restuaurant data
function buildRestData(){
    fetch(`/api/${id}.json`).then((data) =>{ //fetch the json file with the id that was in the url
        return data.json()
    }).then((object) => {
        return object;
    }).then((singleRest) =>{
        let coords = JSON.parse(singleRest.coords) //get Coordenates off the restaurant

let marker = L.marker([coords[0], (coords[1] + .00185)]).addTo(mymap); //Build the marker with the pop up 
marker.bindPopup(`<p clas="popup" style="margin: .5px; text-align:center; background-color: white;">${singleRest.name}</br>${singleRest.address}</p>`);
    

//Variables with the description off the restaurant
let name = singleRest.name;
let address = singleRest.address;
let phone  = singleRest.phone;
let website = singleRest.website;
let hours =  singleRest.hours;
let infoHTML = `<ul>`; // This criates a ul tag

//Setting for the resturant description
restDetail.innerHTML += `<h3>${name}</h3>`;
restDetail.innerHTML += `<p class="rest-info">Phone: ${phone} <br><br> Adress: ${address} <br><br>Hours: ${hours}</p>`
restDetail.innerHTML += `<a href= "${website}" class="rest-info">Website</a>`;

singleRest.notes.forEach((note) =>{
    infoHTML +=`<li class="main-info">${note}</li>`
})
infoHTML =+` </ul>`
restDetail.innerHTML += `${infoHTML}`
})
}